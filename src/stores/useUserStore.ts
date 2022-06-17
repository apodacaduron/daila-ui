import { defineStore } from "pinia"

export type User = {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  phoneNumber: string | null,
  hasWorkspace: boolean,
  createdAt: Date,
  updatedAt: Date,
}

type UserStoreState = {
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    user: null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
  },
})