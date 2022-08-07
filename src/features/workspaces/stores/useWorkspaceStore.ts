import { defineStore } from 'pinia';

import type { Option } from '../../../utils/types';

import type { Workspace, WorkspacesMap } from '../services';

type WorkspaceStoreState = {
  workspace: Workspace | null;
  workspaces: WorkspacesMap | null;
}

export const useWorkspaceStore = defineStore('workspaces', {
  state: (): WorkspaceStoreState => ({
    workspace: null,
    workspaces: null,
  }),
  getters: {
    hasWorkspace: (state) => Boolean(state.workspace),
    workspacesList: (state) => Object.values(state.workspaces ?? {})
  },
  actions: {
    setWorkspaceById(workspaceId: Option<string>) {
      if (!workspaceId) throw new Error('Workspace ID was not provided')

      this.workspace = this.workspaces?.[workspaceId] ?? null
    },
    setWorkspaces(workspaces: WorkspacesMap | null) {
      this.workspaces = workspaces
    },
  },
})