<script setup lang="ts">
import { DLabel, DInput, DButton } from '../components/primitives'
import GoogleIcon from '../assets/png/google-48.png'
import { useForm } from '@evilkiwi/form'
import { useLogin, useWorkspace } from '../composables'
import { computed, reactive, ref, watch } from 'vue'
import { useUserStore } from '../stores/useUserStore'
import { useRouter } from 'vue-router'
import { useGetUserByIdQuery, useGetUserWorkspaceByIdQuery } from '../services'
import { useGlobalStore } from '../stores/useGlobalStore'
import { useAuthStore } from '../stores/useAuthStore'

const isUserByIdQueryEnabled = ref(false)
const workspaceId = ref<string | null | undefined>(null)

const router = useRouter()
const loginHook = useLogin()
const userStore = useUserStore()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const [workspaceOptions, workspaceHandlers] = useWorkspace()
const { useField, handle, loading } = useForm<{
  email: string
  password: string
  confirmPassword: string
}>({
  defaults: {},
})
const email = useField('email', {
  type: 'email',
  required: true,
})
const password = useField('password', {
  required: true,
  min: 6,
})
const confirmPassword = useField('confirmPassword', {
  required: true,
  min: 6,
  validator: (_: unknown, value: unknown) => value === password.value,
  message: 'Password does not match',
})
useGetUserByIdQuery({
  options: reactive({
    userId: computed(() => authStore.user?.uid ?? null),
    enabled: isUserByIdQueryEnabled,
  }),
  handlers: {
    onSuccess(user) {
      if (user) {
        userStore.setUser(user)
      } else {
        userStore.setUser(null)
      }
      globalStore.setLoading(false)
    },
  },
})
useGetUserWorkspaceByIdQuery({
  options: reactive({
    workspaceId: computed(() => workspaceId.value ?? null),
    userId: computed(() => authStore.user?.uid ?? null),
    enabled: isUserByIdQueryEnabled,
  }),
  handlers: {
    onSuccess(workspace) {
      if (workspace) {
        workspaceHandlers.switchWorkspace(workspace, true)
      }
    },
  },
})

const onSubmit = handle(async ({ email, password }) => {
  globalStore.setLoading(true)
  await loginHook.signUpWithCredentials(email, password)
  isUserByIdQueryEnabled.value = true
})
const signInWithGoogle = async () => {
  globalStore.setLoading(true)
  await loginHook.signInWithGoogle()
  isUserByIdQueryEnabled.value = true
}

watch(
  () => workspaceOptions.workspace,
  (workspace) => {
    if (workspace) {
      const workspaceId = workspaceOptions.workspace?.id
      const workspaceCategory = workspaceOptions.workspace?.category
      router.push(`/w/${workspaceId}/${workspaceCategory}`)
    }
  },
)
watch(
  () => userStore.user?.hasWorkspace,
  (hasWorkspace) => {
    if (!hasWorkspace) {
      router.push('/w/create')
    } else {
      workspaceId.value = userStore.user?.lastUsedWorkspaceId
    }
  },
)
</script>

<template>
  <div class="sign-up">
    <div class="sign-up__box">
      <div class="sign-up__box__title">
        <h1>Create an account</h1>
        <span>Start your 30-day free trial.</span>
      </div>
      <form @submit.prevent="onSubmit" class="sign-up__box__form">
        <div class="sign-up__box__form__row">
          <DLabel htmlFor="email">Email*</DLabel>
          <DInput
            id="email"
            placeholder="Enter your email"
            type="email"
            v-model="email.value"
            :error="Boolean(email.error)"
            :hintText="email.error?.message"
          />
        </div>
        <div class="sign-up__box__form__row">
          <DLabel htmlFor="password">Password*</DLabel>
          <DInput
            id="password"
            placeholder="••••••••••"
            type="password"
            v-model="password.value"
            :error="Boolean(password.error)"
            :hintText="password.error?.message"
          />
        </div>
        <div class="sign-up__box__form__row">
          <DLabel htmlFor="confirmPassword">Confirm password*</DLabel>
          <DInput
            id="confirmPassword"
            placeholder="••••••••••"
            type="password"
            v-model="confirmPassword.value"
            :error="Boolean(confirmPassword.error)"
            :hintText="
              confirmPassword.error?.message ?? 'Must be at least 6 characters'
            "
          />
        </div>
        <div class="sign-up__box__form__button">
          <DButton :disabled="loading" type="submit" fullWidth>
            Get started
          </DButton>
        </div>
        <div class="sign-up__box__form__button">
          <DButton
            :disabled="loading"
            fullWidth
            variant="outlined"
            @click="signInWithGoogle"
          >
            <img :src="GoogleIcon" alt="google" width="24" height="24" />
            &nbsp; Sign up with Google
          </DButton>
        </div>
        <div class="dont-have-an-account">
          Already have an account? &nbsp;
          <router-link to="/sign-in">
            Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-up {
  @apply flex justify-center items-center min-h-screen;
  &__box {
    @apply max-w-[360px] w-[360px] mb-20;
    &__title {
      @apply flex flex-col gap-3 mb-8 text-center;
      h1 {
        @apply text-3xl;
      }
      span {
        @apply text-base text-slate-500 font-normal;
      }
    }

    &__form {
      @apply flex flex-col gap-5;
      &__row {
        @apply flex flex-col gap-1;
      }
      a {
        @apply text-blue-600 font-medium;
      }
      .dont-have-an-account {
        @apply flex justify-center text-sm text-slate-500;
      }
    }
  }
}
</style>
