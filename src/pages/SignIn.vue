<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DLabel, DInput, DButton } from '../components/ui'
import {
  useSignInForm,
  GoogleButton,
  useAuthStore,
} from '../features/authentication'

const router = useRouter()
const authStore = useAuthStore()
const signInForm = useSignInForm({
  handlers: {
    onSignInWithGoogle() {
      if (authStore.isAuthenticated) {
        router.push({ name: 'Home' })
      }
    },
    onSubmitSignInForm() {
      if (authStore.isAuthenticated) {
        router.push({ name: 'Home' })
      }
    },
  },
})
</script>

<template>
  <div class="sign-in">
    <div class="sign-in__box">
      <div class="sign-in__box__title">
        <h1>Log in to your account</h1>
        <span>Welcome back! Please enter your details.</span>
      </div>
      <form @submit.prevent="signInForm.onSubmit" class="sign-in__box__form">
        <div class="sign-in__box__form__row">
          <DLabel htmlFor="email">Email</DLabel>
          <DInput
            id="email"
            placeholder="Enter your email"
            type="email"
            v-model="signInForm.email.value"
            :error="Boolean(signInForm.email.error)"
            :hintText="signInForm.email.error?.message"
          />
        </div>
        <div class="sign-in__box__form__row">
          <DLabel htmlFor="password">Password</DLabel>
          <DInput
            id="password"
            placeholder="••••••••••"
            type="password"
            v-model="signInForm.password.value"
            :error="Boolean(signInForm.password.error)"
            :hintText="signInForm.password.error?.message"
          />
        </div>
        <div class="forgot-password">
          <router-link to="/forgot-password">Forgot password</router-link>
        </div>
        <div class="sign-in__box__form__button">
          <DButton
            type="submit"
            fullWidth
            :disabled="signInForm.formInstance.loading.value"
          >
            Sign in
          </DButton>
        </div>
        <div class="sign-in__box__form__button">
          <GoogleButton
            @click="signInForm.signInWithGoogle"
            :disabled="signInForm.formInstance.loading.value"
          >
            Sign in with Google
          </GoogleButton>
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
    @apply max-w-[360px] w-[360px] mb-20;
    &__title {
      @apply flex flex-col gap-3 mb-8 text-center;
      h1 {
        @apply text-3xl font-semibold;
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
