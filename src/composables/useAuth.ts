import { onAuthStateChanged } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue';
import { auth } from '../firebase'
import { useAuthStore } from '../stores/useAuthStore';
import { useUserStore } from '../stores/useUserStore';

export const useAuth = () => {
  const isUserByIdQueryEnabled = ref(false)
  const authStore = useAuthStore()
  const userStore = useUserStore()

  const getCurrentUser = async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          authStore.setAuthUser(_user)
          resolve(_user)
        } else {
          authStore.setAuthUser(null)
          userStore.setUser(null)
          resolve(null)
        }
        authStore.setLoading(false)
      })
    })
  }

  watch(
    () => authStore.isAuthenticated,
    () => {
      if (authStore.isAuthenticated) {
        isUserByIdQueryEnabled.value = true
      } else {
        isUserByIdQueryEnabled.value = false
      }
    },
  )

  return {
    ...storeToRefs(authStore),
    getCurrentUser,
    isUserByIdQueryEnabled,
  }
}
