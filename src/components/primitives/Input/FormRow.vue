<script setup lang="ts">
import { CSSProperties } from 'vue'

interface Props {
  gap?: CSSProperties['gap']
  flexDirection?: CSSProperties['flexDirection']
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div
    class="form-row"
    :style="{
      gap: gap,
      flexDirection: flexDirection,
      alignItems: alignItems,
      justifyContent: justifyContent,
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.form-row {
  @apply flex;
}
</style>
