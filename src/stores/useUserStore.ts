import { defineStore } from "pinia"

export type UserStore = {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  phoneNumber: string | null,
  hasWorkspace: boolean,
  createdAt: Date,
  updatedAt: Date,
}

type UserStoreState = {
  user: UserStore | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    user: null,
  }),
  actions: {
    setUser(user: UserStore | null) {
      this.user = user
    },
  },
})