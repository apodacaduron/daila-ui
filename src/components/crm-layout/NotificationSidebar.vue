<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useGetInvitationsByEmailQuery } from '../../services'
import { useUserStore } from '../../stores/useUserStore'

const userStore = useUserStore()
const w = useGetInvitationsByEmailQuery({
  options: reactive({
    email: computed(() => userStore.user?.email),
    enabled: true,
  }),
  handlers: {
    onSuccess(userInvitations) {
      console.log(userInvitations)
    },
  },
})
</script>

<template>
  <div class="notification-sidebar">
    Notification sidebar
  </div>
</template>

<style lang="scss" scoped>
.notification-sidebar {
}
</style>
