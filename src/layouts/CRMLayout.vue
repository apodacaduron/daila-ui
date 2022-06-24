<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'
import { useWorkspace } from '../composables';

const route = useRoute()
const router = useRouter()
const [workspaceOptions] = useWorkspace()
const routeCategory = computed(() => route.meta.category)
const routeWorkspaceId = computed(() => route.params.workspaceId)
watch([routeCategory, () => workspaceOptions.hasWorkspace], () => {
  if (workspaceOptions.hasWorkspace && typeof routeCategory.value === 'string') {
    const routeWorkspaceValid = workspaceOptions.workspaces?.some(workspace => workspace.category === routeCategory.value && workspace.id === routeWorkspaceId.value)
    if (!routeWorkspaceValid) {
      router.push(`/w/${workspaceOptions.workspace?.id}/${workspaceOptions.workspace?.category}`)
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