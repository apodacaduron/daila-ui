<script setup lang="ts">
import { useAuthStore, useUserService } from '../features/authentication'
import { useUserStore } from '../features/authentication/stores/useUserStore'
import { useWorkspaceService, useWorkspaceStore } from '../features/workspaces'
import { DPageSpinner } from '../components/ui'
import router from '../router'

console.log('WORKSPACE LAYOUT (LOAD USER WORKSPACES)')
const authStore = useAuthStore()
const userStore = useUserStore()
const workspaceStore = useWorkspaceStore()
const userService = useUserService()
const workspaceService = useWorkspaceService()

async function initializeWorkspace() {
  const user = await userService.getUserById(authStore.user?.uid)
  const workspaces = await workspaceService.getWorkspacesByUserId(
    authStore.user?.uid,
  )
  userStore.setUser(user)
  workspaceStore.setWorkspaces(workspaces)
  workspaceStore.setWorkspaceById(user?.lastWorkspaceId)

  router.push(
    `/w/${workspaceStore.workspace?.id}/${workspaceStore.workspace?.category}`,
  )
}

initializeWorkspace()
</script>

<template>
  <DPageSpinner v-if="!userStore.hasUser && !workspaceStore.hasWorkspace" />
  <router-view />
</template>
