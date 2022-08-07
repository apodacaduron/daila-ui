<script setup lang="ts">
import CRMNavbar from './CRMNavbar.vue'
import CRMSidebar from './CRMSidebar.vue'
</script>

<template>
  <div class="crm-layout">
    <aside>
      <CRMSidebar />
    </aside>
    <div class="crm-layout__content">
      <CRMNavbar />
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
  &__content {
    @apply w-full;
  }
}
</style>
