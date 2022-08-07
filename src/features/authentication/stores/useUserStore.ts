import { defineStore } from 'pinia';

import type { User } from '../services/useUserService';

type UserStoreState = {
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    user: null,
  }),
  getters: {
    hasUser: (state) => Boolean(state.user)
  },
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
  },
})