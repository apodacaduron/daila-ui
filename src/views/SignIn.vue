<script setup lang="ts">
import { DLabel, DInput, DButton } from '../components/primitives'
import GoogleIcon from '../assets/png/google-48.png'
import { useForm } from '@evilkiwi/form'
import { useLogin } from '../composables'
import { useUserStore } from '../stores/useUserStore';
import { computed, ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserByIdQuery } from '../services';
import { useGlobalStore } from '../stores/useGlobalStore';

const loginHook = useLogin()
const globalStore = useGlobalStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
const { useField, handle, loading } = useForm<{
  email: string
  password: string
}>({
  defaults: {},
})
const email = useField('email', {
  type: 'email',
  required: true,
})
const password = useField('password', {
  required: true,
})

const onSubmit = handle(async ({ email, password }) => {
  await loginHook.signInWithCredentials(email, password)
  isUserByIdQueryEnabled.value = true
  globalStore.setLoading(true)
})
const signInWithGoogle = async () => {
  await loginHook.signInWithGoogle()
  isUserByIdQueryEnabled.value = true
  globalStore.setLoading(true)
}

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
  <div class="sign-in">
    <div class="sign-in__box">
      <div class="sign-in__box__title">
        <h1>Log in to your account</h1>
        <span>Welcome back! Please enter your details.</span>
      </div>
      <form @submit.prevent="onSubmit" class="sign-in__box__form">
        <div class="sign-in__box__form__row">
          <DLabel htmlFor="email">Email</DLabel>
          <DInput
            id="email"
            placeholder="Enter your email"
            type="email"
            v-model="email.value"
            :error="Boolean(email.error)"
            :hintText="email.error?.message"
          />
        </div>
        <div class="sign-in__box__form__row">
          <DLabel htmlFor="password">Password</DLabel>
          <DInput
            id="password"
            placeholder="••••••••••"
            type="password"
            v-model="password.value"
            :error="Boolean(password.error)"
            :hintText="password.error?.message"
          />
        </div>
        <div class="forgot-password">
          <router-link to="/forgot-password">Forgot password</router-link>
        </div>
        <div class="sign-in__box__form__button">
          <DButton type="submit" fullWidth :disabled="loading">Sign in</DButton>
        </div>
        <div class="sign-in__box__form__button">
          <DButton
            type="button"
            fullWidth
            variant="outlined"
            @click="signInWithGoogle"
            :disabled="loading"
          >
            <img :src="GoogleIcon" alt="google" width="24" height="24" />
            &nbsp; Sign in with Google
          </DButton>
        </div>
        <div class="dont-have-an-account">
          Don't have an account? &nbsp;
          <router-link to="/sign-up">
            Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-in {
  @apply flex justify-center items-center min-h-screen;
  &__box {
    @apply max-w-[360px] w-[360px];
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
      .forgot-password {
        @apply flex justify-end text-sm;
      }
      .dont-have-an-account {
        @apply flex justify-center text-sm text-slate-500;
      }
    }
  }
}
</style>
