<script setup lang="ts">
import { reactive, watchEffect, computed } from 'vue'
import { useAuth } from './composables'
import { useUserByIdQuery } from './services'
import { useUserStore } from './stores/useUserStore'
import { DPageSpinner } from './components/primitives/Spinner';
import { useGlobalStore } from './stores/useGlobalStore';
import Navbar from './components/Navbar.vue';

const authHook = useAuth()
const userStore = useUserStore()
const globalStore = useGlobalStore()
const userByIdQuery = useUserByIdQuery(
  reactive({
    userId: computed(() => authHook.user.value?.uid ?? null),
    enabled: authHook.isUserByIdQueryEnabled,
  }),
)

watchEffect(() => {
  if (userByIdQuery.isSuccess.value && userByIdQuery.data.value) {
    userStore.setUser({ ...userByIdQuery.data.value } ?? null)
    globalStore.setLoading(false)
  }
})
</script>

<template>
  <DPageSpinner v-if="globalStore.loading" />
  <Navbar />
  <router-view />
</template>
