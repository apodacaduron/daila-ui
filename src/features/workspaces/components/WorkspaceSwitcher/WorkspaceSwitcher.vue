<script setup lang="ts">
import { PencilIcon, ChevronDownIcon } from '@heroicons/vue/outline'
import { sentenceCase } from 'change-case'
import { workspaceIcons } from '../../data'
import type { Workspace } from '../../services'
import { useWorkspaceStore } from '../../stores'
import { DPopover, DButton } from '../../../../components/ui'
import { useUserService } from '../../../authentication'

const userService = useUserService()
const workspaceStore = useWorkspaceStore()

function switchWorkspace(workspace: Workspace, closeSidebar: () => void) {
  workspaceStore.setWorkspaceById(workspace.id)
  userService.updateUser({ lastWorkspaceId: workspace.id })
  closeSidebar()
}
</script>

<template>
  <DPopover>
    <DButton fullWidth>
      <div class="flex flex-col items-start w-full py-2">
        {{ workspaceStore.workspace?.name }}
        <span class="text-sm font-normal">
          {{ sentenceCase(`${workspaceStore.workspace?.category} workspace`) }}
        </span>
      </div>
      <ChevronDownIcon class="w-4 h-4" />
    </DButton>
    <template #content="{ close }">
      <div class="z-10 m-2 w-screen max-w-sm">
        <div
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div
            class="relative flex flex-col gap-4 bg-white p-7 overflow-auto max-h-80 rounded-t-lg"
          >
            <div
              v-for="workspace in workspaceStore.workspacesList"
              :key="workspace.id"
              class="flex items-center gap-4"
            >
              <router-link
                @click="switchWorkspace(workspace, close)"
                :to="`/w/${workspace.id}/${workspace.category}`"
                class="-m-3 w-full flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
              >
                <div
                  class="bg-blue-100 rounded-lg flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
                >
                  <component
                    :is="workspaceIcons[workspace.category].icon"
                    class="w-6 h-6 text-blue-600"
                  />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900">
                    {{ workspace.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ sentenceCase(`${workspace.category} workspace`) }}
                  </p>
                </div>
              </router-link>
              <button class="w-6 h-16">
                <PencilIcon class="w-5 h-5 text-slate-900" />
              </button>
            </div>
          </div>
          <div class="bg-gray-50 p-4">
            <router-link
              to="/w/create"
              class="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
            >
              <span class="flex items-center">
                <span class="text-sm font-medium text-gray-900">
                  Add workspace
                </span>
              </span>
              <span class="block text-sm text-gray-500">
                Start integrating products and tools
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </DPopover>
</template>
