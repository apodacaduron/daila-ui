import { reactive, ref } from "vue"

export const useSidebar = (initialValue?: boolean) => {
  const isOpen = ref(initialValue ?? false)

  function close() {
    isOpen.value = false
  }
  function open() {
    isOpen.value = true
  }

  return [
    reactive({
      isOpen
    }),
    {
      close,
      open
    }
  ] as const
}