import { useRouter } from 'vue-router';

import { useAuthStore, useUserService, useUserStore } from '../../authentication';
import { useWorkspaceService } from '../services';
import { useWorkspaceStore } from '../stores';

export const useInitializeWorkspace = () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const workspaceStore = useWorkspaceStore()
  const userService = useUserService()
  const workspaceService = useWorkspaceService()
  const router = useRouter()

  async function execute({ redirect = true }) {
    const user = await userService.getUserById(authStore.user?.uid)
    const workspaces = await workspaceService.getWorkspacesByUserId(
      authStore.user?.uid,
    )
    userStore.setUser(user)
    workspaceStore.setWorkspaces(workspaces)
    workspaceStore.setWorkspaceById(user?.lastWorkspaceId)

    if (!redirect) return

    router.push(
      `/w/${workspaceStore.workspace?.id}/${workspaceStore.workspace?.category}`,
    )
  }

  return { execute }
}