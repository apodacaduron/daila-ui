<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuth } from './composables'
import { useGetUserByIdQuery } from './services'
import { useUserStore } from './stores/useUserStore'
import { DPageSpinner } from './components/primitives/Spinner';
import { useGlobalStore } from './stores/useGlobalStore';
import Navbar from './components/Navbar.vue';

const authHook = useAuth()
const userStore = useUserStore()
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
</script>

<template>
  <DPageSpinner v-if="globalStore.loading" />
  <Navbar />
  <router-view />
</template>
