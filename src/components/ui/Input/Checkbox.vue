<template>
  <input type="checkbox" class="checkbox" />
</template>

<style lang="scss" scoped>
.checkbox {
  @apply m-0 appearance-none cursor-pointer outline-none relative;
  @apply border-slate-300 border;
  @apply bg-white;
  @apply flex justify-center;
  @apply w-6 h-6 rounded-[6px];
  @apply transition-all;
  &:checked {
    @apply bg-blue-100 border-blue-600;
    &:after {
      @apply block absolute transition-opacity transform rotate-[40deg];
      @apply border-blue-600 border-t-0 border-l-0;
      @apply content-[''];
    }
  }
  &:focus {
    @apply ring-4 ring-blue-100;
  }
  &:disabled {
    @apply cursor-not-allowed opacity-25;
  }
  &:after {
    @apply top-[2px] w-[7px] h-[14px] border-[2px];
  }
}
</style>
