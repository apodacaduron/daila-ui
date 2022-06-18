import { httpsCallable } from 'firebase/functions'
import { computed } from 'vue'

import { functions } from '../firebase'
import { useUserStore } from '../stores/useUserStore'

export const useWorkspace = () => {
  const userStore = useUserStore()

  // Callable functions
  const createWorkspaceCF = httpsCallable(functions, 'createWorkspaceCF')

  // Computed properties
  const currentWorkspace = computed(() =>
    userStore.user?.workspaces.find(
      (workspace) => workspace.uid === userStore.user?.currentWorkspaceId,
    ),
  )

  // Handlers
  return {
    currentWorkspace,
  }
}
