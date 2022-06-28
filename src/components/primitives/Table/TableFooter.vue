<template>
  <div class="table-footer">
    <div class="table-footer__left">
      <slot name="left" />
    </div>
    <div class="table-footer__center">
      <slot name="center" />
    </div>
    <div class="table-footer__right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-footer {
  @apply flex items-center justify-between;
  @apply my-4 mx-6;
}
</style>
