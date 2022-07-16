<script setup lang="ts">
import { DSwitch, DButtonLink } from '../components/primitives'
import { useDark } from '@vueuse/core'
import { SunIcon } from '@heroicons/vue/outline'
import { computed } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'
import { useWorkspace } from '../features/workspaces'

const isDark = useDark()
const authStore = useAuthStore()
const [workspaceOptions] = useWorkspace()

const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<template>
  <nav class="navbar">
    <div class="navbar__box">
      <div class="navbar__box__left">
        <router-link class="logo" to="/">Daila</router-link>
      </div>
      <div class="navbar__box__center"></div>
      <div class="navbar__box__right">
        <DSwitch v-model="isDark">
          <template #icon>
            <SunIcon class="text-slate-700 w-3 h-3" />
          </template>
        </DSwitch>
        <router-link
          v-if="isAuthenticated && workspaceOptions.hasWorkspace"
          :to="workspaceOptions.workspaceURL"
        >
          <DButtonLink>Dashboard</DButtonLink>
        </router-link>
        <router-link
          v-else-if="isAuthenticated && !workspaceOptions.hasWorkspace"
          to="/w/create"
        >
          <DButtonLink>Create workspace</DButtonLink>
        </router-link>
        <template v-else>
          <router-link to="/sign-in">
            <DButtonLink variant="outlined">Sign in</DButtonLink>
          </router-link>
          <router-link to="/sign-up">
            <DButtonLink>Sign up</DButtonLink>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  @apply h-[74px] border-b border-slate-200 dark:border-slate-800;
  &__box {
    @apply max-w-7xl mx-auto h-full px-6;
    @apply flex justify-between items-center;
    &__left {
      .logo {
        @apply font-medium text-3xl;
        &:after {
          @apply content-['.'] text-blue-600;
        }
      }
    }
    &__right {
      @apply flex items-center gap-3;
    }
  }
}
</style>
