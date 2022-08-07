import type { User as FirebaseUser } from 'firebase/auth';
import { defineStore } from 'pinia';

type AuthStoreState = {
  user: FirebaseUser | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => Boolean(state.user)
  },
  actions: {
    setUser(user: FirebaseUser | null) {
      this.user = user
    },
  },
})