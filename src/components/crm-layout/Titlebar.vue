<template>
  <div class="titlebar">
    <div class="titlebar__text">
      <h1><slot name="title" /></h1>
      <p><slot name="subtitle" /></p>
    </div>
    <div class="titlebar__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.titlebar {
  @apply w-full px-6 py-4;
  @apply flex items-center justify-between;
  &__text {
    h1 {
      @apply text-3xl;
    }
    p {
      @apply text-slate-500;
    }
  }
}
</style>
