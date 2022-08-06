<script setup lang="ts">
import { useAuthService } from '../features/authentication'

const authService = useAuthService()
</script>

<template>
  HOME
  <button @click="authService.signOut">sign out</button>
</template>
