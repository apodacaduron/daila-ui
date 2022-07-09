<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '../components/crm-layout/Sidebar.vue'
import { useWorkspace } from '../composables'
import CRMNavbar from '../components/crm-layout/Navbar.vue'

const route = useRoute()
const router = useRouter()
const [workspaceOptions] = useWorkspace()
const routeCategory = computed(() => route.meta.category)
const routeWorkspaceId = computed(() => route.params.workspaceId)
watch([routeCategory, () => workspaceOptions.hasWorkspace], () => {
  if (
    workspaceOptions.hasWorkspace &&
    typeof routeCategory.value === 'string'
  ) {
    const routeMatchesUserWorkspaces = workspaceOptions.workspaces?.some(
      (workspace) =>
        workspace.category === routeCategory.value &&
        workspace.id === routeWorkspaceId.value,
    )
    if (!routeMatchesUserWorkspaces) {
      router.push(
        `/w/${workspaceOptions.workspace?.id}/${workspaceOptions.workspace?.category}`,
      )
    }
  }
})
</script>

<template>
  <div class="crm-layout">
    <aside>
      <Sidebar />
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
