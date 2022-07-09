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
    <Dialog as="div" @close="$emit('close', $event)" class="sidebar">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="sidebar__background" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex h-full items-center justify-end">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-x-24"
            enter-to="opacity-100 translate-x-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-x-0"
            leave-to="opacity-0 translate-x-24"
          >
            <DialogPanel class="sidebar__panel">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                <slot name="header" />
              </DialogTitle>
              <div class="mt-2">
                <slot />
              </div>

              <div class="sidebar__panel__footer">
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
.sidebar {
  @apply relative z-10;
  &__background {
    @apply fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm;
  }
  &__panel {
    @apply w-full max-w-md h-full transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all;
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
