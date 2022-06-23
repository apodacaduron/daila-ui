<script setup lang="ts">
import Spinner from './Spinner.vue';
</script>

<template>
  <div class="page-spinner">
    <Spinner />
  </div>
</template>

<style lang="scss" scoped>
.page-spinner {
  @apply fixed w-full h-screen;
  @apply bg-opacity-90 backdrop-blur-lg bg-white dark:bg-slate-900;
  @apply flex justify-center items-center;
}
</style>