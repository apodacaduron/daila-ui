<script setup lang="ts">
import { reactive, watchEffect, computed } from 'vue'
import { useAuth } from './composables'
import { useUserByIdQuery } from './services'
import { useUserStore } from './stores/useUserStore'
import {DPageSpinner} from './components/design-system/Spinner';
import { useGlobalStore } from './stores/useGlobalStore';

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
  <router-view />
</template>
