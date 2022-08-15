<script setup lang="ts">
import { DButton, useDialog } from '../../../components/ui'
import {
  TeamMembersTable,
  InviteTeamMemberDialog,
} from '../../../features/team-members'
import Titlebar from '../../../components/Titlebar.vue'

const [dialogOptions, dialogHandlers] = useDialog()
</script>

<template>
  <div class="team-members">
    <InviteTeamMemberDialog
      :show="dialogOptions.isOpen"
      @close="dialogHandlers.close"
    />
    <Titlebar>
      <template #title>Team members</template>
      <template #subtitle>Manage your team members</template>
      <template #actions>
        <DButton @click="dialogHandlers.open">+ Invite team member</DButton>
      </template>
    </Titlebar>
    <TeamMembersTable />
  </div>
</template>

<style lang="scss" scoped>
.team-members {
  @apply p-8;
}
</style>
