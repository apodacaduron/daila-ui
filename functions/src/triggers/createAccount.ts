import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const createAccount = functions.auth.user().onCreate((user) => {
  const userDoc = {
    email: user.email,
    displayName: user.displayName,
  }
  admin.firestore().collection('users').doc(user.uid).set(userDoc)
})
