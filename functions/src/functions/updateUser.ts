import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { checkAuth } from '../utils/checkAuth';
import { getTimestamps } from '../utils/timestamps';

export const updateUser = functions.https.onCall(async (data, context) => {
  checkAuth(context)

  if (!context.auth?.uid) return

  const userDoc = {
    ...data,
    updatedAt: getTimestamps().updatedAt
  }
  await admin.firestore().collection('users').doc(context.auth.uid).update(userDoc);
});