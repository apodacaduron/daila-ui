<script setup lang="ts">
import Titlebar from '../../../components/crm-layout/Titlebar.vue'
import {
  DButton,
  DTableFooter,
  DTable,
  DCard,
  DBadge,
} from '../../../components/primitives'
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/outline'
import { useWorkspace } from '../../../composables'
import { sentenceCase } from 'change-case'
import { useGetWorkspaceUsersQuery } from '../../../services'

const [workspaceOptions] = useWorkspace()
const getWorkspaceUsersQuery = useGetWorkspaceUsersQuery({
  options: {
    workspaceId: workspaceOptions.workspace?.id,
    enabled: true,
  },
  handlers: {
    onSuccess(workspaceUsers) {
      console.log(workspaceUsers)
    },
    onError(err) {
      console.log(err)
    }
  }
})
</script>

<template>
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
        <DButton variant="outlined">
          <PlusIcon class="w-3 h-3" />
          &nbsp; Add team member
        </DButton>
      </template>
    </Titlebar>
    <DCard class="team__card">
      <DTable class="team__card__table">
        <thead>
          <th>Name</th>
          <th>Status</th>
          <th>Role</th>
          <th>Email address</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr>
            <td>Daniel</td>
            <td>
              <DBadge color="green">Active</DBadge>
            </td>
            <td>Admin</td>
            <td>apodacaduron@gmail.com</td>
            <td class="team__card__table__actions">
              <TrashIcon class="w-4 h-4 text-red-500" />
              <PencilIcon class="w-4 h-4" />
            </td>
          </tr>
        </tbody>
      </DTable>
      <DTableFooter>
        <template #left>
          <DButton variant="outlined">
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Previous
          </DButton>
        </template>
        <template #right>
          <DButton variant="outlined">
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
