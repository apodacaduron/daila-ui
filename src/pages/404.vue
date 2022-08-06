<script setup lang="ts">
import { DButton, DButtonLink } from '../components/ui'
import { InformationCircleIcon } from '@heroicons/vue/outline'
</script>

<template>
  <div class="page-not-found">
    <div class="page-not-found__box">
      <InformationCircleIcon class="page-not-found__box__icon" />
      <h1>
        Page not found
      </h1>
      <p>
        The page you are looking for doesn't exist.
        <br />
        Here are some helpful links:
      </p>
      <div class="page-not-found__box__actions">
        <DButton @click="$router.go(-1)" variant="outlined">Go back</DButton>
        <router-link to="/">
          <DButtonLink>Take me home</DButtonLink>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-not-found {
  @apply w-full h-screen;
  @apply flex justify-center items-center text-center;
  &__box {
    @apply mb-20;
    &__icon {
      @apply w-12 h-12 mx-auto text-blue-600;
    }
    h1 {
      @apply text-6xl font-semibold;
      @apply my-6;
    }
    p {
      @apply text-xl text-slate-500 font-normal mb-12;
    }
    &__actions {
      @apply flex justify-center gap-3;
    }
  }
}
</style>
