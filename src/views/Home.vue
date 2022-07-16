<script setup lang="ts">
import { useLogin } from '../features/authentication'

const loginHook = useLogin()
</script>

<template>
  <div class="home">
    Home
    <button @click="loginHook.signOut">Sign out</button>
    <router-link to="/sign-in">Sign in</router-link>
  </div>
</template>
