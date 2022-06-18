import { defineStore } from "pinia"

type GlobalStoreState = {
  loading: boolean;
}

export const useGlobalStore = defineStore('global', {
  state: (): GlobalStoreState => ({
    loading: false,
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },
  },
})