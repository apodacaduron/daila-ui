<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuth } from './composables'
import { useGetUserByIdQuery, useGetWorkspacesByUserIdQuery } from './services'
import { useUserStore } from './stores/useUserStore'
import { DPageSpinner } from './components/primitives/Spinner';
import { useGlobalStore } from './stores/useGlobalStore';
import { useDark } from '@vueuse/core';
import { useWorkspaceStore } from './stores/useWorkspaceStore';

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
    }
  }
})
useGetWorkspacesByUserIdQuery({
  options: reactive({
    userId: computed(() => authHook.user.value?.uid ?? null),
    enabled: computed(() => Boolean(userStore.user)),
  }),
  handlers: {
    onSuccess(workspaces) {
      if (authHook.isAuthenticated && workspaces) {
        workspaceStore.setCurrentWorkspaceId(userStore.user?.lastUsedWorkspaceId ?? null);
        workspaceStore.setWorkspaces(workspaces);
      } else {
        workspaceStore.setCurrentWorkspaceId(null);
        workspaceStore.setWorkspaces(null);
      }
    }
  }
})
</script>

<template>
  <DPageSpinner v-if="globalStore.loading" />
  <router-view />
</template>
