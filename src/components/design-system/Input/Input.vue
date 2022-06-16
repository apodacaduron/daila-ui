<script setup lang="ts">
interface Props {
  variant?: 'contained' | 'outlined' | 'text'
  disabled?: boolean
  hintText?: string
  error?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'contained',
  disabled: false,
  error: false,
})
</script>

<template>
  <div
    :class="['input', { 'input--disabled': disabled, 'input--error': error }]"
  >
    <slot name="leading" />
    <input v-bind="$attrs" class="input__field" />
    <slot name="trailing" />
  </div>
  <span v-if="hintText" :class="['hint-text', { 'hint-text--error': error }]">
    {{ hintText }}
  </span>
</template>

<style lang="scss" scoped>
.input {
  @apply cursor-default rounded-lg text-left;
  @apply py-2 px-3 border border-slate-300;
  @apply transition-all shadow-sm;
  @apply focus-within:border focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100;
  &__field {
    @apply w-full border-none text-base text-slate-900;
    @apply outline-none bg-transparent;
    &::placeholder {
      @apply text-slate-500;
    }
  }

  &--error {
    @apply border-red-300;
    @apply focus-within:border-red-400 focus-within:ring-red-100;
  }

  &--disabled {
    @apply bg-slate-50 text-slate-500;
  }
}

.hint-text {
  @apply text-xs;
  &--error {
    @apply text-red-500;
  }
}
</style>
