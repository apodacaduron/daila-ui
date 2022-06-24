import { defineStore } from 'pinia'
import { Workspace } from '../firebase/converters'

type WorkspaceStoreState = {
  currentWorkspaceId: Workspace['id'] | null
  workspaces: Workspace[] | null
}

export const useWorkspaceStore = defineStore('workspace', {
  state: (): WorkspaceStoreState => ({
    currentWorkspaceId: null,
    workspaces: null,
  }),
  getters: {
    workspace: (state) =>
      state.workspaces?.find(
        (workspace) => workspace.id === state.currentWorkspaceId,
      ),
    hasWorkspace: (state) => Boolean(state.workspaces?.length),
  },
  actions: {
    setCurrentWorkspaceId(workspaceId: Workspace['id'] | null) {
      this.currentWorkspaceId = workspaceId
    },
    setWorkspaces(workspaces: Workspace[] | null) {
      this.workspaces = workspaces
    },
  },
})
