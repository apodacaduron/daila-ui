import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

// Cloud functions
// export * from './auth';

export const hello = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  return 'Hello'
});