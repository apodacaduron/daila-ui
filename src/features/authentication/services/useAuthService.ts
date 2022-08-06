import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup,
    signOut as signOutFirebase
} from 'firebase/auth';

import { auth, googleAuthProvider } from '../../../firebase';
import { errorHandler } from '../../../utils/errorHandler';

export const useAuthService = () => {
  // Handlers
  function signUpWithCredentials(email: string, password: string) {
    try {
      return createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      return errorHandler(err)
    }
  }
  function signInWithCredentials(email: string, password: string) {
    try {
      return signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      return errorHandler(err)
    }
  }
  function signInWithGoogle() {
    try {
      return signInWithPopup(auth, googleAuthProvider)
    } catch (err) {
      return errorHandler(err)
    }
  }
  function signOut() {
    try {
      return signOutFirebase(auth)
    } catch (err) {
      return errorHandler(err)
    }
  }
  function currentUser() {
    return new Promise((resolve, reject) => {
      const unsubcribe = onAuthStateChanged(
        auth,
        (user) => {
          resolve(user);
        },
        (e) => reject(e)
      );
      unsubcribe();
    });
  }

  return {
    signUpWithCredentials,
    signInWithCredentials,
    signInWithGoogle,
    signOut,
    currentUser,
  }
}
