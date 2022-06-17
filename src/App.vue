<script setup lang="ts">
import { reactive, watchEffect, computed } from 'vue'
import { useAuth } from './composables'
import { useUserByIdQuery } from './services'
import { useUserStore } from './stores/useUserStore'

const authHook = useAuth()
const userStore = useUserStore()
const userByIdQuery = useUserByIdQuery(
  reactive({
    userId: computed(() => authHook.user.value?.uid ?? null),
    enabled: authHook.isUserByIdQueryEnabled,
  }),
)

watchEffect(() => {
  if (userByIdQuery.isSuccess.value && userByIdQuery.data.value) {
    userStore.setUser({ ...userByIdQuery.data.value } ?? null)
  }
})
</script>

<template>
  <router-view />
</template>
