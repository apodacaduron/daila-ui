<script setup lang="ts">
import { DAvatar, DSwitch } from './primitives'
import { useUserStore } from '../stores/useUserStore'
import { LogoutIcon, SunIcon, SupportIcon, CogIcon } from '@heroicons/vue/outline'
import { useDark } from '@vueuse/core'
import { useCRMLayout, useLogin } from '../composables'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDark = useDark()
const loginHook = useLogin()
const userStore = useUserStore()
const crmLayoutHook = useCRMLayout()

function signOutAndRedirect() {
  loginHook.signOut()
  router.push('/')
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__top">
      <div class="sidebar__top__logo">
        Daila.
        <DSwitch v-model="isDark">
          <template #icon>
            <SunIcon class="text-slate-700 w-3 h-3" />
          </template>
        </DSwitch>
      </div>
      <div class="sidebar__top__workspaces">
        Workspace selector
      </div>
      <ul class="sidebar__top__primary-menu">
        <li
          v-for="menuItem in crmLayoutHook.getPrimaryMenuItems('psychologist')"
          :key="menuItem.id"
        >
          <router-link :to="menuItem.path">
            <component :is="menuItem.icon" class="menu-icon" />
            {{ menuItem.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar__bottom">
      <ul class="sidebar__bottom__secondary-menu">
        <li>
          <button>
            <SupportIcon class="menu-icon" />
            Support</button>
        </li>
        <li><button>
          <CogIcon class="menu-icon" />
          Settings</button></li>
      </ul>
      <div class="sidebar__bottom__upgrade">
        Want to upgrade?
      </div>
      <div class="sidebar__bottom__account">
        <div class="sidebar__bottom__account__avatar">
          <DAvatar
            :src="userStore.user?.photoURL"
            :text="userStore.user?.displayName ?? userStore.user?.email"
          />
        </div>
        <div class="sidebar__bottom__account__info">
          <div class="sidebar__bottom__account__info__name">
            {{ userStore.user?.displayName }}
          </div>
          <div class="sidebar__bottom__account__info__email">
            {{ userStore.user?.email }}
          </div>
        </div>
        <div class="sidebar__bottom__account__icon">
          <button @click="signOutAndRedirect">
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply h-full px-6 py-8;
  @apply bg-blue-700;
  @apply flex flex-col justify-between;
  @apply text-white;
  .router-link-active {
    @apply bg-blue-600 text-white;
    svg {
      @apply text-white;
    }
  }
  .menu-icon {
    @apply w-[18px] h-[18px];
  }
  ul {
    @apply flex flex-col gap-1;
    li {
      button,
      a {
        @apply flex items-center gap-4;
        @apply rounded-md py-2 px-4 text-blue-100;
        svg {
          @apply text-blue-300;
        }
      }
    }
  }
  &__top {
    @apply flex flex-col gap-6;
    &__logo {
      @apply font-medium text-3xl;
      @apply flex justify-between items-center;
    }
  }
  &__bottom {
    @apply flex flex-col gap-6;
    &__account {
      @apply flex items-center;
      @apply gap-3 pt-6 border-t border-blue-600;
      &__avatar {
      }
      &__info {
        @apply w-[160px];
        &__name,
        &__email {
          @apply overflow-hidden whitespace-nowrap text-ellipsis;
          @apply text-sm;
        }
        &__name {
          @apply font-medium;
        }
        &__email {
          @apply text-blue-300;
        }
      }
      &__icon {
        svg {
          @apply w-4 h-4;
        }
      }
    }
  }
}
</style>
