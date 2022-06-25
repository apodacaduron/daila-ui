<template>
  <table class="table">
    <slot />
  </table>
</template>

<style lang="scss" scoped>
.table {
  @apply w-full;
  :deep() {
    thead {
      @apply bg-slate-50 border-y border-slate-200;
      th {
        @apply font-medium text-xs text-slate-500;
        @apply py-3 text-left;
        &:first-child {
          @apply pl-6;
        }
        &:last-child {
          @apply pr-6;
        }
      }
    }
    tbody {
      tr {
        @apply border-y border-slate-200;
        td {
          @apply text-sm text-slate-500;
          @apply py-4 text-left;
          &:first-child {
            @apply pl-6;
          }
          &:last-child {
            @apply pr-6;
          }
        }
      }
    }
  }
}
</style>
