<script setup lang="ts">
import { useUserStore } from '../features/authentication'
import {
  useInitializeWorkspace,
  useWorkspaceStore,
} from '../features/workspaces'
import { DPageSpinner } from '../components/ui'

const userStore = useUserStore()
const workspaceStore = useWorkspaceStore()
const initializeWorkspace = useInitializeWorkspace()
initializeWorkspace.execute({ redirect: true })
</script>

<template>
  <DPageSpinner v-if="!userStore.hasUser && !workspaceStore.hasWorkspace" />
  <router-view />
</template>
