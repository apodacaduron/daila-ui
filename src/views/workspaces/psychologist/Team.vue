<script setup lang="ts">
import Titlebar from '../../../components/crm/Titlebar.vue'
import {
  DButton,
  DTableFooter,
  DTable,
  DCard,
  DBadge,
  useDialog,
} from '../../../components/primitives'
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/outline'
import { useWorkspace } from '../../../features/workspaces'
import { sentenceCase } from 'change-case'
import { useGetWorkspaceUsersQuery } from '../../../features/workspaces'
import { computed, reactive, ref } from 'vue'
import { AddTeamMemberDialog } from '../../../features/team-members'

const [workspaceOptions, workspaceHandlers] = useWorkspace()
const [dialogOptions, dialogHandlers] = useDialog()
const limit = ref(20)
const pageNumber = ref(1)

const getWorkspaceUsersQuery = useGetWorkspaceUsersQuery({
  options: reactive({
    pageNumber: computed(() => pageNumber.value),
    workspaceId: computed(() => workspaceOptions.workspace?.id),
    enabled: true,
    limit,
  }),
})

const hasNextPage = computed(() => {
  const pageUserCount =
    getWorkspaceUsersQuery.data.value?.pages[pageNumber.value - 1]?.length
  return pageUserCount === limit.value
})

function previousPage() {
  if (pageNumber.value > 1) {
    pageNumber.value -= 1
  }
}
function nextPage() {
  if (!hasNextPage.value) return

  pageNumber.value += 1
  const hasPageLoaded =
    getWorkspaceUsersQuery.data.value?.pages[pageNumber.value - 1]

  if (!hasPageLoaded) {
    getWorkspaceUsersQuery.fetchNextPage.value()
  }
}
</script>

<template>
  <AddTeamMemberDialog
    :show="dialogOptions.isOpen"
    @close="dialogHandlers.close"
  />
  <div class="team">
    <Titlebar>
      <template #title>
        Team management
        <DBadge color="purple">
          {{ sentenceCase(`${workspaceOptions.workspace?.title} workspace`) }}
        </DBadge>
      </template>
      <template #subtitle>
        Manage your team members and their account permissions here.
      </template>
      <template #actions>
        <DButton variant="outlined" @click="dialogHandlers.open">
          <PlusIcon class="w-3 h-3" />
          &nbsp; Add team member
        </DButton>
      </template>
    </Titlebar>
    <DCard class="team__card">
      <DTable class="team__card__table">
        <thead>
          <th>Name</th>
          <th>Email address</th>
          <th>Status</th>
          <th>Role</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr
            v-for="workspaceUser in getWorkspaceUsersQuery.data.value?.pages[
              pageNumber - 1
            ]"
            :key="workspaceUser.id"
          >
            <td>{{ workspaceUser.displayName ?? '-' }}</td>
            <td>{{ workspaceUser.email }}</td>
            <td>
              <DBadge
                :color="
                  workspaceHandlers.getWorkspaceUserStatusColor(
                    workspaceUser.status,
                  )
                "
              >
                {{ sentenceCase(workspaceUser.status) }}
              </DBadge>
            </td>
            <td>{{ sentenceCase(workspaceUser.role) }}</td>
            <td class="team__card__table__actions">
              <TrashIcon class="w-4 h-4 text-red-500" />
              <PencilIcon class="w-4 h-4" />
            </td>
          </tr>
        </tbody>
      </DTable>
      <DTableFooter>
        <template #left>
          <DButton
            variant="outlined"
            :disabled="pageNumber <= 1"
            @click="previousPage"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Previous
          </DButton>
        </template>
        <template #right>
          <DButton
            variant="outlined"
            :disabled="!hasNextPage"
            @click="nextPage"
          >
            Next
            <ArrowRightIcon class="w-4 h-4 ml-2" />
          </DButton>
        </template>
      </DTableFooter>
    </DCard>
  </div>
</template>

<style lang="scss" scoped>
.team {
  &__card {
    @apply mx-6;
    &__table {
      &__actions {
        @apply flex gap-3;
      }
    }
  }
}
</style>
