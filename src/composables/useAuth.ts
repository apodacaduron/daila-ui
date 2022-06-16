import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { reactive, toRefs } from 'vue'
import { auth } from '../firebase'

type UseAuthState = {
  user: FirebaseUser | null
  loading: boolean
  error: unknown
};

export const useAuth = () => {
  const state = reactive<UseAuthState>({
    user: null,
    loading: true,
    error: null,
  })

  onAuthStateChanged(auth, (_user) => {
    if (_user) {
      state.user = _user
    } else {
      state.user = null
    }
    state.loading = false
  })

  return {
    ...toRefs(state),
  }
}
