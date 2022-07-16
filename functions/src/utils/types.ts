import * as admin from 'firebase-admin';

/** Users */
export type User = {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  status: 'active' | 'inactive' | 'deleted',
  createdAt: admin.firestore.FieldValue,
  updatedAt: admin.firestore.FieldValue,
}

/** Notifications */
export type Notification = {
  destinationId: string | null
  visibilityType: 'workspace' | 'user' | 'global'
  activityType: 'invitation'
  photoURL: string | null
  createdBy: User & { id: string }
  createdAt: admin.firestore.FieldValue,
  updatedAt: admin.firestore.FieldValue,
}

/** Workspaces */
export const workspaceCategories = ['admin', 'psychologist'] as const
export type WorkspaceCategory = typeof workspaceCategories[number]

export const workspaceRoles = ['admin', 'editor', 'user'] as const;
export type WorkspaceRole = typeof workspaceRoles[number]

export type Workspace = {
  title: string;
  category: WorkspaceCategory;
  logoURL: string | null;
  createdBy: WorkspaceUser & { id?: string };
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
}
export type WorkspaceUser = {
  role: 'admin' | 'editor' | 'user',
  status: 'active' | 'inactive' | 'deleted' | 'invited',
} & Omit<User, 'status'>