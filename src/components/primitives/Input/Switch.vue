<script setup lang="ts">
import { Switch } from '@headlessui/vue'

interface Props {
  modelValue?: boolean
}
withDefaults(defineProps<Props>(), {
  modelValue: false,
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (switchValue: Boolean) => {
  emit('update:modelValue', switchValue)
}
</script>

<template>
  <Switch
    :modelValue="modelValue"
    @update:modelValue="updateValue"
    :class="modelValue ? 'bg-blue-700' : 'bg-slate-200'"
    class="relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <span
      :class="['switch__dot', { 'switch__dot--active': modelValue }]"
      aria-hidden="true"
    >
      <slot name="icon" />
    </span>
  </Switch>
</template>

<style lang="scss" scoped>
  .switch {
    &__dot {
      @apply flex justify-center items-center;
      @apply pointer-events-none h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out;
      @apply translate-x-0;
      &--active {
        @apply translate-x-4;
      }
    }
  }
</style>  