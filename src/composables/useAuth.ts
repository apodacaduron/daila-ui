import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import { auth } from '../firebase'
import { useAuthStore } from '../stores/useAuthStore';

export const useAuth = () => {
  const authStore = useAuthStore()

  const getCurrentUser = async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          authStore.setAuthUser(_user)
          resolve(_user)
        } else {
          authStore.setAuthUser(null)
        }
        authStore.setLoading(false)
      })
    })
  }

  return {
    ...storeToRefs(authStore),
    getCurrentUser,
  }
}
