<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  variant?: 'contained' | 'outlined' | 'text'
  disabled?: boolean
  hintText?: string
  error?: boolean
  modelValue?: string
}
withDefaults(defineProps<Props>(), {
  variant: 'contained',
  disabled: false,
  error: false,
  modelValue: '',
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  emit('update:modelValue', value)
}

const inputRef = ref<HTMLInputElement>()
</script>

<template>
  <div
    :class="['input', { 'input--disabled': disabled, 'input--error': error }]"
    @click="inputRef?.focus()"
  >
    <slot name="leading" />
    <input
      ref="inputRef"
      v-bind="$attrs"
      class="input__field"
      :value="modelValue"
      @input="updateValue"
    />
    <slot name="trailing" />
  </div>
  <span v-if="hintText" :class="['hint-text', { 'hint-text--error': error }]">
    {{ hintText }}
  </span>
</template>

<style lang="scss" scoped>
.input {
  @apply cursor-default rounded-lg text-left;
  @apply py-2 px-3 border border-slate-300 dark:border-slate-500 dark:bg-slate-800;
  @apply transition-all shadow-sm;
  @apply focus-within:border focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100;
  @apply dark:focus-within:ring-blue-400 dark:focus-within:ring-opacity-30;
  @apply flex items-center gap-2;
  &__field {
    @apply w-full border-none text-base text-slate-900 dark:text-slate-200;
    @apply outline-none bg-transparent;
    &::placeholder {
      @apply text-slate-500;
    }
  }

  &--error {
    @apply border-red-300 dark:border-red-400;
    @apply focus-within:border-red-400 focus-within:ring-red-100 dark:focus-within:ring-red-400 dark:focus-within:ring-opacity-30;
  }

  &--disabled {
    @apply bg-slate-50 text-slate-500;
  }
}

.hint-text {
  @apply text-xs text-slate-500;
  &--error {
    @apply text-red-500;
  }
}
</style>
