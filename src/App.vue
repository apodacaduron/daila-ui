<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useAuthStore } from './features/authentication'
import { auth } from './firebase'

const authStore = useAuthStore()

const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
  if (userAuth) {
    authStore.setUser(userAuth)
  } else {
    authStore.setUser(null)
  }
})

onUnmounted(() => unsubscribe())
</script>

<template>
  <router-view />
</template>
