<script setup lang="ts">
import { DLabel, DInput, DButton } from '../components/design-system'
import GoogleIcon from '../assets/png/google-48.png'
import { useForm } from '@evilkiwi/form'
import { useLogin } from '../composables'
import { computed, reactive, ref, watch } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { useUserByIdQuery } from '../services';
import { useAuthStore } from '../stores/useAuthStore';

const loginHook = useLogin()
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
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
  validator: (rule: unknown, value: unknown) => value === password.value,
  message: 'Password does not match',
})

const onSubmit = handle(async ({ email, password }) => {
  await loginHook.signUpWithCredentials(email, password)
  isUserByIdQueryEnabled.value = true
})

const isUserByIdQueryEnabled = ref(false)
useUserByIdQuery(
  reactive({
    userId: computed(() => authStore.user?.uid ?? null),
    enabled: isUserByIdQueryEnabled,
  }),
)

watch(() => userStore.user?.hasWorkspace, () => {
  if (userStore.user?.hasWorkspace) {
    router.push('/w/123')
  } else {
    router.push('/w/create')
  }
})
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
          <DButton :disabled="loading" type="submit" fullWidth>Get started</DButton>
        </div>
        <div class="sign-up__box__form__button">
          <DButton
            :disabled="loading"
            fullWidth
            variant="outlined"
            @click="loginHook.signInWithGoogle"
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
    @apply max-w-[360px];
    &__title {
      @apply flex flex-col gap-3 mb-8 text-center;
      h1 {
        @apply text-3xl text-slate-900 font-semibold;
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
