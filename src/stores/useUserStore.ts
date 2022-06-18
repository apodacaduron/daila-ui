import { defineStore } from "pinia"

export type UserWorkspace = {
  uid: string
  title: string
  category: string
  photoURL: string | null
}

export type UserStore = {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  phoneNumber: string | null,
  hasWorkspace: boolean,
  currentWorkspaceId: string | null,
  workspaces: UserWorkspace[],
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