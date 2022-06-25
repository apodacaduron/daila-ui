<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply border border-slate-200 dark:border-slate-500 dark:bg-slate-800;
  @apply shadow-sm rounded-lg overflow-hidden;
}
</style>
