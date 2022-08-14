<script setup lang="ts">
import type { BadgeColor } from './types'

interface Props {
  color: BadgeColor
}
withDefaults(defineProps<Props>(), {
  color: 'blue',
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
    @apply bg-blue-50 text-blue-700 dark:bg-blue-500 dark:bg-opacity-30 dark:text-blue-300;
  }
  &--green {
    @apply bg-green-50 text-green-700 dark:bg-green-500 dark:bg-opacity-30 dark:text-green-300;
  }
  &--yellow {
    @apply bg-yellow-50 text-yellow-700 dark:bg-yellow-500 dark:bg-opacity-30 dark:text-yellow-300;
  }
  &--red {
    @apply bg-red-50 text-red-700 dark:bg-red-500 dark:bg-opacity-30 dark:text-red-300;
  }
  &--purple {
    @apply bg-purple-50 text-purple-700 dark:bg-purple-500 dark:bg-opacity-30 dark:text-purple-300;
  }
  &--gray {
    @apply bg-slate-50 text-slate-700 dark:bg-slate-500 dark:bg-opacity-30 dark:text-slate-300;
  }
}
</style>
