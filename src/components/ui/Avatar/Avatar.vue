<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useColor } from '../../../composables'

interface Props {
  text?: string | null
  src?: string | null
  alt?: string
  size?: string
  borderRadius?: string
}

const props = defineProps<Props>()

const { stringToHexColor, getFontColor } = useColor()
const backgroundColor = stringToHexColor(props.text || '')
const avatarStyles: CSSProperties = {
  width: props.size ?? '2rem',
  height: props.size ?? '2rem',
  backgroundColor,
  borderRadius: props.borderRadius ?? '50%',
  color: getFontColor(backgroundColor),
}
</script>

<template>
  <div class="avatar" :style="avatarStyles">
    <img v-if="props.src" :src="props.src" :alt="props.alt" />
    <template v-else>{{ props.text?.charAt(0).toUpperCase() }}</template>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  @apply flex justify-center items-center;
  @apply overflow-hidden;

  & img {
    @apply object-cover w-full h-full;
  }
}
</style>
