<script setup lang="ts">
import { DButton } from '../../../components/ui'
import { TeamMembersTable } from '../../../features/team-members'
import Titlebar from '../../../components/Titlebar.vue'
</script>

<template>
  <div class="team-members">
    <Titlebar>
      <template #title>Team members</template>
      <template #subtitle>Manage your team members</template>
      <template #actions><DButton>+ Add new team member</DButton></template>
    </Titlebar>
    <TeamMembersTable />
  </div>
</template>

<style lang="scss" scoped>
.team-members {
  @apply p-8;
}
</style>
