<script setup lang="ts">
import { DLabel, DInput, DButton } from '../components/design-system'
import GoogleIcon from '../assets/png/google-48.png'
</script>

<template>
  <div class="sign-in">
    <div class="sign-in__box">
      <div class="sign-in__box__title">
        <h1>Log in to your account</h1>
        <span>Welcome back! Please enter your details</span>
      </div>
      <form class="sign-in__box__form">
        <div class="sign-in__box__form__row">
          <DLabel htmlFor="email">Email</DLabel>
          <DInput id="email" placeholder="Enter your email" type="email" />
        </div>
        <div class="sign-in__box__form__row">
          <DLabel htmlFor="password">Password</DLabel>
          <DInput id="password" placeholder="••••••••••" type="password" />
        </div>
        <div class="forgot-password">
          <router-link to="/forgot-password">Forgot password</router-link>
        </div>
        <div class="sign-in__box__form__button">
          <DButton fullWidth>Sign in</DButton>
        </div>
        <div class="sign-in__box__form__button">
          <DButton fullWidth variant="outlined">
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
    @apply max-w-[360px];
    &__title {
      @apply flex flex-col gap-3 mb-8;
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
        @apply text-blue-600;
      }
      .forgot-password {
        @apply flex justify-end;
      }
      .dont-have-an-account {
        @apply flex justify-center;
      }
    }
  }
}
</style>
