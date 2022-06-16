<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useColor } from '../../../composables'

const props = defineProps({
  text: {
    type: String
  },
  src: {
    type: String
  },
  alt: {
    type: String
  },
  size: {
    type: String
  },
  borderRadius: {
    type: String
  }
})

const { stringToHexColor, getFontColor } = useColor();
const backgroundColor = stringToHexColor(props.text || '');
const avatarStyles: CSSProperties = {
  width: props.size ?? '2rem',
  height: props.size ?? '2rem',
  backgroundColor,
  borderRadius: props.borderRadius ?? '50%',
  color: getFontColor(backgroundColor),
};
</script>

<template>
  <div class="avatar" :styles="avatarStyles">
    <img v-if="props.src" :src="props.src" :alt="props.alt">
    <template v-else>{{ props.text?.charAt(0) }}</template>
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
