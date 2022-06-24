<script setup lang="ts">
import Popper from 'vue3-popper'
</script>

<template>
  <Popper class="popover" :style="{ margin: 0, border: 'none' }">
    <slot />
    <template #content>
      <slot name="content" />
    </template>
  </Popper>
</template>

<style lang="scss" scoped>
.popover {
  @apply w-full;
}
</style>