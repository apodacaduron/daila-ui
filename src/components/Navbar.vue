<script setup lang="ts">
import { DSwitch } from './primitives';
import { useDark } from '@vueuse/core'
import { SunIcon } from '@heroicons/vue/outline'

const isDark = useDark()
</script>

<template>
  <nav class="navbar">
    <div class="navbar__box">
      <div class="navbar__box__left">
        <router-link class="logo" to="/">Daila</router-link>
      </div>
      <div class="navbar__box__center"></div>
      <div class="navbar__box__right">
        <DSwitch v-model="isDark">
          <template #icon>
            <SunIcon class="text-slate-700 w-3 h-3" />
          </template>
        </DSwitch>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  @apply h-[74px] border-b border-slate-200 dark:border-slate-800;
  &__box {
    @apply max-w-7xl mx-auto h-full px-6;
    @apply flex justify-between items-center;
    &__left {
      .logo {
        @apply font-medium text-3xl;
        &:after {
          @apply content-['.'] text-blue-600;
        }
      }
    }
  }
}
</style>