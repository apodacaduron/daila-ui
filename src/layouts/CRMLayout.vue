<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="crm-layout">
    <aside>
      <Sidebar />
    </aside>
    <div class="crm-layout__content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.crm-layout {
  @apply flex h-screen;
  aside {
    @apply max-w-[280px] flex-none;
  }
  aside {
    @apply w-full;
  }
}
</style>