import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { Workspace, workspaceCategories, WorkspaceCategory, WorkspaceUser } from './utils/types';

function isCreateWorkspacePayload(data: unknown) {
  return typeof data === 'object' && data !== null && 'title' in data && 'category' in data
}
function isWorkspaceCategory(category: unknown): category is WorkspaceCategory {
  return typeof category === 'string' && workspaceCategories.includes(category as WorkspaceCategory)
}

export const createWorkspaceCF = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }
  if (!isCreateWorkspacePayload(data)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Cannot create workspace, title or category is required',
    );
  }
  if (!isWorkspaceCategory(data.category)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The workspace category is not valid',
    );
  }

  const workspacesRef = admin.firestore().collection('workspaces');
  const currentAuthUser = await admin.auth().getUser(context.auth.uid);

  const workspaceData: Workspace = {
    title: data.title,
    category: data.category,
    logoURL: data.logoURL ?? null,
    createdBy: {
      id: context.auth.uid ?? null,
      displayName: currentAuthUser.displayName ?? null,
      email: currentAuthUser.email ?? null,
      photoURL: currentAuthUser.photoURL ?? null,
      role: 'admin',
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }
  const workspace = await workspacesRef.add(workspaceData);

  delete workspaceData.createdBy.id
  const workspacesUsersRef = admin.firestore().collection(`workspaces/${workspace.id}/users`).doc(context.auth.uid);
  await workspacesUsersRef.set(workspaceData.createdBy)

  const userWorkspaceRef = admin
    .firestore()
    .collection(`users/${context.auth.uid}/workspaces`).doc(workspace.id)
  userWorkspaceRef.create(workspaceData)

  const userRef = admin
    .firestore()
    .doc(`users/${context.auth.uid}`)
  userRef.update({ lastUsedWorkspaceId: workspace.id, hasWorkspace: true })

  return { id: workspace.id }
});

export const inviteUserToWorkspaceCF = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }
  if (!data.workspaceId || !data.emailList || !Array.isArray(data.emailList)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Workspace ID and email list must be provided.',
    );
  }

  const workspaceUserRef = admin.firestore().doc(`workspaces/${data.workspaceId}/users/${context.auth.uid}`);
  const workspaceUserDoc = await workspaceUserRef.get()
  if (!workspaceUserDoc.exists) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'You are not a member of this workspace',
    );
  }
  const workspaceUser = workspaceUserDoc.data() as WorkspaceUser;
  if (workspaceUser?.role === 'user') {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'You don\'t have permission to access this function',
    );
  }

  const batch = admin.firestore().batch()

  data.emailList.forEach((emailItem: { email: string }) => {
    const workspacesUsersRef = admin.firestore().collection(`workspaces/${data.workspaceId}/users`).doc();
    const user: WorkspaceUser = {
      displayName: null,
      email: emailItem.email ?? null,
      photoURL: null,
      role: 'user',
      status: 'invited',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    batch.set(workspacesUsersRef, user)
  })

  await batch.commit()
});
