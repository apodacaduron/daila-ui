<script setup lang="ts">
import { computed, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '../layouts/crm/Sidebar.vue'
import { useWorkspace } from '../features/workspaces'
import CRMNavbar from '../layouts/crm/Navbar.vue'
import { useUserStore } from '../stores/useUserStore'
import { useGetNotificationsByEmailQuery } from '../features/notifications'

const route = useRoute()
const router = useRouter()
const [workspaceOptions] = useWorkspace()
const routeCategory = computed(() => route.meta.category)
const routeWorkspaceId = computed(() => route.params.workspaceId)

const userStore = useUserStore()
useGetNotificationsByEmailQuery({
  options: reactive({
    email: computed(() => userStore.user?.email),
    enabled: true,
  }),
  handlers: {
    onSuccess(userInvitations) {
      if (userInvitations) {
      }
    },
  },
})

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
