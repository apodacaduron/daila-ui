<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

interface Props {
  show: boolean
}
defineProps<Props>()
defineEmits<{
  close: (close: boolean) => void
}>()
</script>

<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="$emit('close', $event)" class="dialog">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="dialog__background" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="dialog__panel">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                <slot name="header" />
              </DialogTitle>
              <div class="mt-2">
                <slot />
              </div>

              <div class="dialog__panel__footer">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped>
.dialog {
  @apply relative z-10;
  &__background {
    @apply fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm dark:bg-opacity-60;
  }
  &__panel {
    @apply w-full max-w-md transform overflow-hidden rounded-xl p-6 text-left align-middle shadow-xl transition-all;
    @apply bg-white dark:bg-slate-800;
    &__footer {
      @apply mt-4 flex gap-3 justify-end;
      @apply flex-col-reverse;
      @apply md:flex-row;
      @apply lg:flex-row;
      :deep() {
        button {
          @apply md:flex-1 lg:flex-none;
        }
      }
    }
  }
}
</style>
