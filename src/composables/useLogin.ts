import { createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut as signOutFirebase } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import { auth, functions, googleAuthProvider } from '../firebase';
import { errorHandler } from '../utils/errorHandler';

export const useLogin = () => {
  // Callable functions
  const createAccountUser = httpsCallable(functions, 'createAccountUser')

  // Handlers
  async function signUpWithCredentials(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await createAccountUser({ action: 'sign-up' });
    } catch (err) {
      errorHandler(err)
    }
  }
  async function signInWithCredentials(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      errorHandler(err)
    }
  }
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleAuthProvider)
      await createAccountUser({ action: 'sign-in' })
    } catch (err) {
      errorHandler(err)
    }
  }
  function signOut() {
    return signOutFirebase(auth)
  }

  return {
    signUpWithCredentials,
    signInWithCredentials,
    signInWithGoogle,
    signOut,
  }
}