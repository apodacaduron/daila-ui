<script setup lang="ts">
interface Props {
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray'
}
withDefaults(defineProps<Props>(), {
  color: 'blue'
})
</script>

<template>
  <div :class="['badge', `badge--${color}`]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.badge {
  @apply py-1 px-3 w-fit text-xs font-medium rounded-2xl;
  @apply inline-block;
  &--blue {
    @apply bg-blue-50 text-blue-700;
  }
  &--green {
    @apply bg-green-50 text-green-700;
  }
  &--yellow {
    @apply bg-yellow-50 text-yellow-700;
  }
  &--red {
    @apply bg-red-50 text-red-700;
  }
  &--purple {
    @apply bg-purple-50 text-purple-700;
  }
  &--gray {
    @apply bg-slate-50 text-slate-700;
  }
}
</style>
