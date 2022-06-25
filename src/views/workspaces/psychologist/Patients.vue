<script setup lang="ts">
import Titlebar from '../../../components/crm-layout/Titlebar.vue';
import { DButton } from '../../../components/primitives';
import { PlusIcon } from '@heroicons/vue/outline';
</script>

<template>
  <div class="patients">
    <Titlebar>
      <template #title>Patients</template>
      <template #subtitle>Manage your patients.</template>
      <template #actions>
        <DButton variant="outlined"><PlusIcon class="w-3 h-3" /> &nbsp; Add patient</DButton>
      </template>
    </Titlebar>
  </div>
</template>