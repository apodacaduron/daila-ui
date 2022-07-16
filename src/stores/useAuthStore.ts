import type { User as FirebaseUser } from "firebase/auth"
import { defineStore } from 'pinia';

type AuthStoreState = {
  user: FirebaseUser | null;
  loading: boolean;
  error: unknown
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    user: null,
    loading: true,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user)
  },
  actions: {
    setAuthUser(user: FirebaseUser | null) {
      this.user = user
    },
    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },
  },
})