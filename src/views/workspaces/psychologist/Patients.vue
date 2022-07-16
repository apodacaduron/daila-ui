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
import { AddPatientDialog } from '../../../features/patients'

const [dialogOptions, dialogHandlers] = useDialog()
</script>

<template>
  <AddPatientDialog
    :show="dialogOptions.isOpen"
    @close="dialogHandlers.close"
  />
  <div class="patients">
    <Titlebar>
      <template #title>Patients</template>
      <template #subtitle>Manage your patients.</template>
      <template #actions>
        <DButton variant="outlined" @click="dialogHandlers.open">
          <PlusIcon class="w-3 h-3" />
          &nbsp; Add patient
        </DButton>
      </template>
    </Titlebar>
    <DCard class="patients__card">
      <DTable class="patients__card__table">
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
            <td class="patients__card__table__actions">
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
.patients {
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
