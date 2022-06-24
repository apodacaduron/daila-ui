import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const updateLastUsedWorkspaceIdCF = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  if (!data.workspaceId) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Workspace ID must be provided',
    );
  }

  const usersRef = admin.firestore().collection('users');
  await usersRef.doc(context.auth.uid).update({
    hasWorkspace: data.workspaceId,
    lastUsedWorkspaceId: data.workspaceId,
  });
});
