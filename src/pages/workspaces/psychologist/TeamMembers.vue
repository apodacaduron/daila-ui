<script setup lang="ts">
import { TeamMembersTable } from '../../../features/team-members'
</script>

<template>
  <div class="team-members">
    <TeamMembersTable />
  </div>
</template>

<style lang="scss" scoped>
.team-members {
  @apply p-8;
}
</style>
