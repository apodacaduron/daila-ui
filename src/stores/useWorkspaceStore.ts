import { defineStore } from 'pinia';

import type { Workspace } from '../firebase/converters'

type WorkspaceStoreState = {
  lastUsedWorkspaceId: Workspace['id'] | null
  workspaces: Workspace[] | null
}

export const useWorkspaceStore = defineStore('workspace', {
  state: (): WorkspaceStoreState => ({
    lastUsedWorkspaceId: null,
    workspaces: null,
  }),
  actions: {
    setCurrentWorkspaceId(workspaceId: Workspace['id'] | null) {
      this.lastUsedWorkspaceId = workspaceId
    },
    setWorkspaces(workspaces: Workspace[] | null) {
      this.workspaces = workspaces
    },
  },
})
