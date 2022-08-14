<script setup lang="ts">
import { DPopover } from '../../ui'
</script>

<template>
  <DPopover>
    <slot name="button" />
    <template #content="{ close }">
      <div class="z-10 max-w-sm">
        <div
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div
            class="relative flex flex-col gap-4 bg-white p-2 overflow-auto max-h-80 rounded-t-lg"
          >
            <div class="flex flex-col items-center gap-1">
              <slot :close="close" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </DPopover>
</template>
