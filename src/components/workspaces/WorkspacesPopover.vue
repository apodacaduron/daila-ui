<script setup lang="ts">
import { useWorkspace, workspaceCategoryHelpers } from '../../composables'
import { useUpdateLastUsedWorkspaceIdMutation } from '../../services/useUserService'
import { errorHandler } from '../../utils/errorHandler'
import { DPopover, DButton } from '../primitives'
import { PencilIcon, ChevronDownIcon } from '@heroicons/vue/outline'

const updateLastUsedWorkspaceId = useUpdateLastUsedWorkspaceIdMutation()
const [workspaceOptions, workspaceHandlers] = useWorkspace({
  handlers: {
    async onSwitchWorkspace(workspace) {
      try {
        await updateLastUsedWorkspaceId.mutateAsync({
          workspaceId: workspace.id,
        })
      } catch (err) {
        errorHandler(err)
      }
    },
  },
})
</script>

<template>
  <DPopover>
    <DButton fullWidth>
      <div class="flex flex-col items-start w-full py-2">
        {{workspaceOptions.workspace?.title}}
        <span class="text-sm font-normal">
          {{ `${workspaceOptions.workspace?.category} workspace` }}
        </span>
      </div>
      <ChevronDownIcon class="w-4 h-4" />
    </DButton>
    <template #content="{ close }">
      <div class="z-10 m-2 w-screen max-w-sm">
        <div
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="relative flex flex-col gap-4 bg-white p-7">
            <div
              v-for="workspace in workspaceOptions.workspaces"
              :key="workspace.id"
              class="flex items-center gap-4"
            >
              <router-link
                @click="close(); workspaceHandlers.switchWorkspace(workspace, false)"
                :to="`/w/${workspace.id}/${workspace.category}`"
                class="-m-3 w-full flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
              >
                <div
                  class="bg-blue-100 rounded-lg flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
                >
                  <component
                    :is="workspaceCategoryHelpers[workspace.category].icon"
                    class="w-6 h-6 text-blue-600"
                  />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900">
                    {{ workspace.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ `${workspace.category} workspace` }}
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
