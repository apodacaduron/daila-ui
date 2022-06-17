<script setup lang="ts">
import { useAuth } from './composables/useAuth'

const authInstance = useAuth()
authInstance.getCurrentUser()
</script>

<template>
  <router-view />
</template>
