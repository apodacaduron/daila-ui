<script setup lang="ts">
import { DLabel, DInput, DButton } from '../components/ui'
import { useSignUpForm, GoogleButton } from '../features/authentication'

const signUpForm = useSignUpForm()
</script>

<template>
  <div class="sign-up">
    <div class="sign-up__box">
      <div class="sign-up__box__title">
        <h1>Create an account</h1>
        <span>Start your 30-day free trial.</span>
      </div>
      <form @submit.prevent="signUpForm.onSubmit" class="sign-up__box__form">
        <div class="sign-up__box__form__row">
          <DLabel htmlFor="email">Email*</DLabel>
          <DInput
            id="email"
            placeholder="Enter your email"
            type="email"
            v-model="signUpForm.email.value"
            :error="Boolean(signUpForm.email.error)"
            :hintText="signUpForm.email.error?.message"
          />
        </div>
        <div class="sign-up__box__form__row">
          <DLabel htmlFor="password">Password*</DLabel>
          <DInput
            id="password"
            placeholder="••••••••••"
            type="password"
            v-model="signUpForm.password.value"
            :error="Boolean(signUpForm.password.error)"
            :hintText="signUpForm.password.error?.message"
          />
        </div>
        <div class="sign-up__box__form__row">
          <DLabel htmlFor="confirmPasignUpFormssword">Confirm password*</DLabel>
          <DInput
            id="confirmPassword"
            placeholder="••••••••••"
            type="password"
            v-model="signUpForm.confirmPassword.value"
            :error="Boolean(signUpForm.confirmPassword.error)"
            :hintText="
              signUpForm.confirmPassword.error?.message ??
              'Must be at least 6 characters'
            "
          />
        </div>
        <div class="sign-up__box__form__button">
          <DButton
            :disabled="signUpForm.formInstance.loading.value"
            type="submit"
            fullWidth
          >
            Get started
          </DButton>
        </div>
        <div class="sign-up__box__form__button">
          <GoogleButton
            @click="signUpForm.signInWithGoogle"
            :disabled="signUpForm.formInstance.loading.value"
          >
            Sign up with Google
          </GoogleButton>
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
