import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const workspaceCategories = ['admin', 'psychologist'] as const
export type WorkspaceCategory = typeof workspaceCategories[number]

export const workspaceRoles = ['admin', 'editor', 'user'] as const;
export type WorkspaceRole = typeof workspaceRoles[number]

export type WorkspaceUser = {
  id: string,
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
  createdBy: WorkspaceUser;
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
      id: context.auth.uid,
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
  
  const workspacesUsersRef = admin.firestore().collection(`workspaces/${workspace.id}/users`);
  await workspacesUsersRef.add(workspaceData.createdBy)
  return { id: workspace.id, }
});
