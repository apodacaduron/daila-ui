import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const env = functions.config();

export const createUserAccountCF = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  const usersRef = admin.firestore().collection('users');
  const userEmail = context.auth.token.email;
  const userRole = userEmail === env.role.admin ? 'ADMIN' : 'USER';
  const userExists = (await usersRef.doc(context.auth.uid).get()).exists;
  let adminWorkspaceId = null

  if (userExists) {
    if (data.action === 'sign-up') {
      throw new functions.https.HttpsError(
        'already-exists',
        'This user already exists',
      );
    } else {
      return
    }
  }

  await admin.auth().setCustomUserClaims(context.auth.token.uid, {
    role: userRole,
  });
  const currentAuthUser = await admin.auth().getUser(context.auth.uid);
  if (userRole === 'ADMIN') {
    const workspacesRef = admin.firestore().collection('workspaces');
    const workspace = await workspacesRef.add({
      title: 'Admin',
      category: 'admin',
      logoURL: null,
      createdBy: {
        uid: context.auth.uid,
        displayName: currentAuthUser.displayName ?? null,
        email: currentAuthUser.email ?? null,
        photoURL: currentAuthUser.photoURL ?? null,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    adminWorkspaceId = workspace.id
  }
  await usersRef.doc(context.auth.uid).set({
    displayName: currentAuthUser.displayName ?? null,
    email: currentAuthUser.email ?? null,
    photoURL: currentAuthUser.photoURL ?? null,
    phoneNumber: currentAuthUser.phoneNumber ?? null,
    hasWorkspace: adminWorkspaceId ? true : false,
    currentWorkspaceId: adminWorkspaceId ? adminWorkspaceId : null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
