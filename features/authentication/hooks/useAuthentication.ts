import { signOut } from 'firebase/auth';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../../lib/firebase';

export function useAuthentication() {
  const authState = useAuthState(auth)
  const signInWithGoogle = useSignInWithGoogle(auth)

  function logout() {
    signOut(auth)
  }

  return {
    signInWithGoogle: {
      execute: signInWithGoogle[0],
      userCredential: signInWithGoogle[1],
      loading: signInWithGoogle[2],
      error: signInWithGoogle[3],
    },
    authState: {
      user: authState[0],
      loading: authState[1],
    },
    logout,
  }
}
