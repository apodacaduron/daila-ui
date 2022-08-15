import * as admin from 'firebase-admin';

// Member
export const memberStatus = ['ACTIVE', 'INACTIVE', 'INVITED'] as const
export type MemberStatus = typeof memberStatus[number]

export const memberRoles = ['OWNER', 'USER'] as const
export type MemberRole = typeof memberRoles[number]

export type Member = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: MemberRole;
  status: MemberStatus;
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
}

// Notifications
export type Notification = {
  title: string;
  description: string;
  photoURL: string | null;
  data: Record<string, unknown>
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
}

// Workspace
export const workspaceCategories = ['personal-space', 'admin', 'psychologist',] as const
export type WorkspaceCategory = typeof workspaceCategories[number]

export type Workspace = {
  name: string,
  description: string | null,
  category: WorkspaceCategory,
  createdById: string,
  memberCount: number,
  logoURL: string | null,
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
}