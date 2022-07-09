import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const workspaceCategories = ['admin', 'psychologist'] as const
export type WorkspaceCategory = typeof workspaceCategories[number]

export const workspaceRoles = ['admin', 'editor', 'user'] as const;
export type WorkspaceRole = typeof workspaceRoles[number]

export type WorkspaceUser = {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  role: 'admin' | 'editor' | 'user',
  status: 'active' | 'inactive' | 'deleted' | 'invited',
  addedAt: admin.firestore.FieldValue,
  updatedAt: admin.firestore.FieldValue,
}

export type Workspace = {
  title: string;
  category: WorkspaceCategory;
  logoURL: string | null;
  createdBy: WorkspaceUser & { id: string };
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
}

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
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  const workspace = await workspacesRef.add(workspaceData);
  
  const workspacesUsersRef = admin.firestore().collection(`workspaces/${workspace.id}/users`).doc(context.auth.uid);
  await workspacesUsersRef.set(workspaceData.createdBy)
  return { id: workspace.id, }
});

export const addUserToWorkspaceCF = functions.https.onCall(async (data, context) => {
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
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    batch.set(workspacesUsersRef, user)
  })

  await batch.commit()
});
