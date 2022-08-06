<script setup lang="ts">
import Popper from 'vue3-popper'

const emit = defineEmits(['close:popper'])
</script>

<template>
  <Popper class="popover" :style="{ margin: 0, border: 'none' }" @close:popper="emit('close:popper')">
    <slot />
    <template #content="{ close }">
      <slot name="content" :close="close" />
    </template>
  </Popper>
</template>

<style lang="scss" scoped>
.popover {
  @apply w-full;
}
</style>