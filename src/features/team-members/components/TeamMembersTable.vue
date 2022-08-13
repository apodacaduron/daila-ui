<script setup lang="ts">
import { TableBuilder } from '../../../components/patterns'
import { useWorkspaceStore } from '../../workspaces'
import { useTeamMemberService } from '../services'
import { useTeamMemberStore } from '../stores'

const columns = ['displayName', 'email', 'role', 'createdAt', 'actions']

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
</script>

<template>
  <TableBuilder :columns="columns" :data="teamMemberStore.teamMembersList" />
</template>
