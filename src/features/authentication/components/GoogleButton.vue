<script setup lang="ts">
import GoogleIcon from '../assets/png/google-48.png'
import { DButton } from '../../../components/ui'
</script>

<template>
  <DButton type="button" fullWidth variant="outlined">
    <img :src="GoogleIcon" alt="google" width="24" height="24" />
    &nbsp;
    <slot />
  </DButton>
</template>
