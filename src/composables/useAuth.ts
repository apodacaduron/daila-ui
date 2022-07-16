import { onAuthStateChanged } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import { auth } from '../firebase'
import { useAuthStore } from '../stores/useAuthStore';
import { useGlobalStore } from '../stores/useGlobalStore';
import { useUserStore } from '../stores/useUserStore';
import { useWorkspaceStore } from '../stores/useWorkspaceStore';

export const useAuth = () => {
  const isUserByIdQueryEnabled = ref(false)
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const workspaceStore = useWorkspaceStore()
  const globalStore = useGlobalStore()

  const getCurrentUser = async () => {
    return new Promise((resolve) => {
      globalStore.setLoading(true)
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          authStore.setAuthUser(_user)
          isUserByIdQueryEnabled.value = true
          resolve(_user)
        } else {
          resetStores()
          resolve(null)
        }
        authStore.setLoading(false)
        globalStore.setLoading(false)
      })
    })
  }

  function resetStores() {
    authStore.setAuthUser(null)
    userStore.setUser(null)
    workspaceStore.setWorkspaces(null)
    workspaceStore.setCurrentWorkspaceId(null)
    isUserByIdQueryEnabled.value = false
  }

  return {
    ...storeToRefs(authStore),
    getCurrentUser,
    isUserByIdQueryEnabled,
  }
}
