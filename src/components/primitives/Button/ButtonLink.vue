<script setup lang="ts">
interface Props {
  variant?: 'contained' | 'outlined' | 'text'
  disabled?: boolean
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'contained',
  disabled: false,
  fullWidth: false,
})
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <a
    :disabled="disabled"
    :class="[
      'button',
      `button--${variant}`,
      { 'button--disabled': disabled, 'button--full-width': fullWidth },
    ]"
  >
    <slot />
  </a>
</template>

<style lang="scss" scoped>
.button {
  @apply inline-flex justify-center items-center rounded-md;
  @apply px-4 text-sm font-medium text-center min-h-[38px];
  @apply border border-transparent shadow-sm;
  @apply focus:outline-none;
  &--full-width {
    @apply w-full;
  }

  &--contained {
    @apply bg-blue-600 text-white;
    &:not(:disabled):active {
      @apply bg-blue-700;
    }
    &:not(:disabled):focus {
      @apply ring-blue-100 ring-4 dark:ring-blue-400 dark:ring-opacity-30;
    }
    &:disabled {
      @apply bg-blue-200;
    }
  }
  &--outlined {
    @apply border-slate-300 text-slate-700 dark:text-slate-200;
    &:not(:disabled):active {
      @apply bg-slate-50 dark:bg-slate-800;
    }
    &:not(:disabled):focus {
      @apply ring-slate-100 ring-4 dark:ring-slate-400 dark:ring-opacity-30;
    }
    &:disabled {
      @apply border-slate-200 text-slate-300;
    }
  }
}
</style>
