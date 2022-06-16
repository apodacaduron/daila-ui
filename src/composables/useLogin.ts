import { signInWithPopup, signOut as signOutFirebase } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import { auth, functions, googleAuthProvider } from '../firebase';
import { errorHandler } from '../utils/errorHandler';

export const useLogin = () => {
  // Callable functions
  const onSignUp = httpsCallable(functions, 'onSignUp')

  // Handlers
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleAuthProvider)
      await onSignUp()
    } catch (err) {
      errorHandler(err)
    }
  }
  function signOut() {
    return signOutFirebase(auth)
  }

  return {
    signInWithGoogle,
    signOut,
  }
}