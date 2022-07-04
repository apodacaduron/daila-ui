import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const env = functions.config();

export const createUserAccountCF = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
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

  // Check if user exists in collection
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

  // Set user account role
  await admin.auth().setCustomUserClaims(context.auth.token.uid, {
    role: userRole,
  });
  const currentAuthUser = await admin.auth().getUser(context.auth.uid);

  // If user is admin create default ADMIN Workspace
  if (userRole === 'ADMIN') {
    const workspacesRef = admin.firestore().collection('workspaces');
    const userData = {
      id: context.auth.uid,
      displayName: currentAuthUser.displayName ?? null,
      email: currentAuthUser.email ?? null,
      photoURL: currentAuthUser.photoURL ?? null,
      role: 'admin',
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    const workspace = await workspacesRef.add({
      title: 'Admin',
      category: 'admin',
      logoURL: null,
      createdBy: userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    const workspaceUserRef = admin.firestore().doc(`workspaces/${workspace.id}/users/${context.auth.uid}`);
    await workspaceUserRef.set(userData)
    adminWorkspaceId = workspace.id
  }

  // Create user in collection
  await usersRef.doc(context.auth.uid).set({
    displayName: currentAuthUser.displayName ?? null,
    email: currentAuthUser.email ?? null,
    photoURL: currentAuthUser.photoURL ?? null,
    phoneNumber: currentAuthUser.phoneNumber ?? null,
    hasWorkspace: adminWorkspaceId ? true : false,
    lastUsedWorkspaceId: adminWorkspaceId ? adminWorkspaceId : null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
