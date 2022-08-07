<script setup lang="ts">
import { BellIcon, HomeIcon } from '@heroicons/vue/outline'
import { DSidebar, useSidebar } from '../components/ui'

const [sidebarOptions, sidebarHandlers] = useSidebar()
</script>

<template>
  <nav class="navbar">
    <div class="navbar__left">
      <div class="breadcrumbs">
        <HomeIcon class="w-4 h-4" />
        <span>/</span>
        <span>Dashboard</span>
      </div>
    </div>
    <div class="navbar__center"></div>
    <div class="navbar__right">
      <button @click="sidebarHandlers.open">
        <BellIcon class="w-6 h-6" />
      </button>
    </div>
  </nav>
  <DSidebar :show="sidebarOptions.isOpen" @close="sidebarHandlers.close">
    <!-- <NotificationSidebar /> -->
  </DSidebar>
</template>

<style lang="scss" scoped>
.navbar {
  @apply w-full h-[48px] border-b border-slate-200 dark:border-slate-800;
  @apply px-6 flex justify-between items-center;
  &__left {
    .breadcrumbs {
      @apply flex items-center gap-3;
    }
  }
  &__right {
    @apply flex items-center gap-3;
  }
}
</style>
