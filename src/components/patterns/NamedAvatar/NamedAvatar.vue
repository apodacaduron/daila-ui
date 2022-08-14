<script setup lang="ts">
import { DAvatar } from '../../ui'

type NamedAvatarProps = {
  name?: string | null
  text?: string | null
  src?: string | null
}

defineProps<NamedAvatarProps>()
</script>

<template>
  <div class="named-avatar">
    <DAvatar v-bind="$props" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.named-avatar {
  @apply flex items-center gap-2;
}
</style>
