<script setup lang="ts">
import Titlebar from '../../../components/crm-layout/Titlebar.vue';
import { DButton } from '../../../components/primitives';
import { PlusIcon } from '@heroicons/vue/outline';
</script>

<template>
  <div class="team">
    <Titlebar>
      <template #title>Team management</template>
      <template #subtitle>Manage your team members and their account permissions here.</template>
      <template #actions>
        <DButton variant="outlined"><PlusIcon class="w-3 h-3" /> &nbsp; Add team member</DButton>
      </template>
    </Titlebar>
  </div>
</template>