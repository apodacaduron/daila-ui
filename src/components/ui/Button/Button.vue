<script setup lang="ts">
interface Props {
  variant?: 'contained' | 'outlined' | 'text' | 'translucent'
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
  <button
    @click="$emit('click', $event)"
    :disabled="disabled"
    :class="[
      'button',
      `button--${variant}`,
      { 'button--disabled': disabled, 'button--full-width': fullWidth },
    ]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  @apply inline-flex justify-center items-center rounded-md;
  @apply px-4 text-sm font-medium text-center min-h-[38px] text-blue-600;
  @apply border border-transparent;
  @apply focus:outline-none;
  &--full-width {
    @apply w-full;
  }

  &--contained {
    @apply bg-blue-600 text-white shadow-sm;
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
    @apply shadow-sm;
    @apply border-slate-300 text-slate-700 dark:text-slate-200 dark:border-slate-400;
    &:not(:disabled):active {
      @apply bg-slate-50 dark:bg-slate-800;
    }
    &:not(:disabled):focus {
      @apply ring-slate-100 ring-4 dark:ring-slate-400 dark:ring-opacity-30;
    }
    &:disabled {
      @apply border-slate-200 text-slate-300 dark:text-slate-500 dark:border-slate-700;
    }
  }
  &--translucent {
    @apply shadow-sm;
    @apply bg-blue-100 text-blue-600 dark:bg-blue-600 dark:bg-opacity-20 dark:text-blue-400;
    &:not(:disabled):active {
      @apply bg-blue-200 dark:bg-blue-500 dark:bg-opacity-30;
    }
    &:not(:disabled):focus {
      @apply ring-blue-50 ring-4 dark:ring-blue-50 dark:ring-opacity-30;
    }
    &:disabled {
      @apply bg-blue-200;
    }
  }
}
</style>
