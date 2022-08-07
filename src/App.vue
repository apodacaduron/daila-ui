<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './features/authentication'
import { auth } from './firebase'

const authStore = useAuthStore()
const router = useRouter()

const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
  if (userAuth) {
    authStore.setUser(userAuth)
  } else {
    authStore.setUser(null)
    router.push('/')
  }
})

onUnmounted(() => unsubscribe())
</script>

<template>
  <router-view />
</template>
