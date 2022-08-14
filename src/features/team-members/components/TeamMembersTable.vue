<script setup lang="ts">
import {
  TableBuilder,
  Dropdown,
  DropdownItem,
  TableBuilderColumns,
  TableBuilderSettings,
} from '../../../components/patterns'
import { DButton } from '../../../components/ui'
import { useWorkspaceStore } from '../../workspaces'
import { TeamMember, useTeamMemberService } from '../services'
import { useTeamMemberStore } from '../stores'
import { DotsVerticalIcon } from '@heroicons/vue/outline'

type DropdownActionKey = keyof typeof dropdownSettings.actions

const locale = {
  VIEW: 'View',
  EDIT: 'Edit',
  DELETE: 'Delete',
  DISPLAY_NAME: 'Name',
  EMAIL: 'Email',
  ROLE: 'Role',
  CREATED_AT: 'Created at',
}

const columns: TableBuilderColumns = {
  displayName: {
    text: locale.DISPLAY_NAME,
  },
  email: { text: locale.EMAIL },
  role: { text: locale.ROLE },
  createdAt: { text: locale.CREATED_AT },
}

const teamMemberStore = useTeamMemberStore()
const workspaceStore = useWorkspaceStore()
const teamMemberService = useTeamMemberService({
  handlers: {
    onGetTeamMembersByWorkspaceId(teamMembersMap) {
      teamMemberStore.setTeamMembers(teamMembersMap)
    },
  },
})
teamMemberService.getTeamMembersByWorkspaceId(workspaceStore.workspace?.id)

const tableSettings: TableBuilderSettings = {
  ui: {
    avatar: {
      name: 'displayName',
      image: 'photoURL',
    },
    badges: {
      role: {
        color(columnValue: string) {
          switch (columnValue) {
            case 'OWNER':
              return 'blue'
            default:
              return 'gray'
          }
        },
      },
    },
  },
}
const dropdownSettings = {
  actions: {
    view: {
      text: locale.VIEW,
      fn(teamMember: TeamMember) {
        console.log('Team member to view')
      },
    },
    edit: {
      text: locale.EDIT,
      fn(teamMember: TeamMember) {
        console.log('Team member to edit')
      },
    },
    delete: {
      text: locale.DELETE,
      fn(teamMember: TeamMember) {
        console.log('Team member to delete')
      },
    },
  },
}

function dropdownClick(
  teamMember: TeamMember,
  action: DropdownActionKey,
  close: any,
) {
  dropdownSettings.actions[action].fn(teamMember)
  close()
}
</script>

<template>
  <TableBuilder
    :columns="columns"
    :data="teamMemberStore.teamMembersList"
    :settings="tableSettings"
  >
    <template #actionsText>-</template>
    <template #actions="{ data: teamMember }">
      <Dropdown placement="bottom-start">
        <template #button>
          <DButton variant="text">
            <DotsVerticalIcon class="w-4 h-4 text-slate-500" />
          </DButton>
        </template>
        <template #default="{ close }">
          <DropdownItem
            v-for="(action, index) in Object.keys(dropdownSettings.actions)"
            :key="index"
            @click="dropdownClick(teamMember as TeamMember, action as DropdownActionKey, close)"
          >
            {{ action }}
          </DropdownItem>
        </template>
      </Dropdown>
    </template>
  </TableBuilder>
</template>
