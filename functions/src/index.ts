import * as admin from 'firebase-admin';

// import * as functions from 'firebase-functions';

admin.initializeApp();

// Cloud functions
export * from './functions';

// Triggers
export * from './triggers';

// export const hello = functions.https.onCall(async (data, context) => {
//   // Check if user is authenticated
//   return 'Hello'
// });