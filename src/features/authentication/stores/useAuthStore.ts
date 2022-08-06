import type { User } from 'firebase/auth';
import { defineStore } from 'pinia';

type AuthStoreState = {
  user: User | null;
}

export const useAuthStore = defineStore('global', {
  state: (): AuthStoreState => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => Boolean(state.user)
  },
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
  },
})