<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuth } from './features/authentication'
import { useGetUserWorkspacesQuery } from './features/workspaces'
import { useGetUserByIdQuery } from './services'
import { useUserStore } from './stores/useUserStore'
import { DPageSpinner } from './components/primitives/Spinner'
import { useGlobalStore } from './stores/useGlobalStore'
import { useDark } from '@vueuse/core'
import { useWorkspaceStore } from './stores/useWorkspaceStore'

useDark()
const authHook = useAuth()
const userStore = useUserStore()
const workspaceStore = useWorkspaceStore()
const globalStore = useGlobalStore()
useGetUserByIdQuery({
  options: reactive({
    userId: computed(() => authHook.user.value?.uid ?? null),
    enabled: authHook.isUserByIdQueryEnabled && !userStore.user,
  }),
  handlers: {
    onSuccess(user) {
      if (authHook.isAuthenticated && user) {
        userStore.setUser(user)
      } else {
        userStore.setUser(null)
      }
      globalStore.setLoading(false)
    },
  },
})
useGetUserWorkspacesQuery({
  options: reactive({
    userId: computed(() => authHook.user.value?.uid ?? null),
    enabled: computed(() => Boolean(userStore.user?.hasWorkspace)),
  }),
  handlers: {
    onSuccess(workspaces) {
      if (authHook.isAuthenticated && workspaces) {
        workspaceStore.setCurrentWorkspaceId(
          userStore.user?.lastUsedWorkspaceId ?? null,
        )
        workspaceStore.setWorkspaces(workspaces)
      } else {
        workspaceStore.setCurrentWorkspaceId(null)
        workspaceStore.setWorkspaces(null)
      }
      globalStore.setLoading(false)
    },
  },
})
</script>

<template>
  <DPageSpinner v-if="globalStore.loading" />
  <router-view />
</template>
