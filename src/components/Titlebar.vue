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
  @apply w-full mb-4;
  @apply flex items-center justify-between;
  &__text {
    h1 {
      @apply text-3xl flex items-center gap-3;
    }
    p {
      @apply text-slate-500;
    }
  }
}
</style>
