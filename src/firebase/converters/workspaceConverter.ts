import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export const workspaceCategories = ['admin', 'psychologist'] as const
export type WorkspaceCategory = typeof workspaceCategories[number]

export const workspaceUserRoles = ['admin', 'editor', 'user'] as const;
export type WorkspaceUserRole = typeof workspaceUserRoles[number]

export const workspaceUserStatus = ['active', 'inactive', 'deleted', 'invited'] as const;
export type WorkspaceUserStatus = typeof workspaceUserStatus[number]

export type WorkspaceUser = {
  id: string,
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  role: WorkspaceUserRole,
  status: WorkspaceUserStatus,
  addedAt: Date,
  updatedAt: Date,
}

export type Workspace = {
  id: string;
  title: string;
  category: WorkspaceCategory;
  logoURL: string | null;
  createdBy: WorkspaceUser;
  createdAt: Date;
  updatedAt: Date;
}

class WorkspaceConverter {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly category: WorkspaceCategory,
    readonly logoURL: string | null,
    readonly createdBy: WorkspaceUser,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Title: ${this.title}, Category: ${this.category}`
  }
}

export const workspaceConverter = {
  toFirestore(workspace: WorkspaceConverter): DocumentData {
    return { ...workspace }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): WorkspaceConverter {
    const data = snapshot.data(options)
    return new WorkspaceConverter(
      snapshot.id,
      data.title,
      data.category,
      data.logoURL,
      data.createdBy,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}

class WorkspaceUserConverter {
  constructor(
    readonly id: string,
    readonly displayName: string | null,
    readonly email: string | null,
    readonly photoURL: string | null,
    readonly role: 'admin' | 'editor' | 'user',
    readonly status: 'active' | 'inactive' | 'deleted' | 'invited',
    readonly addedAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Email: ${this.email}`
  }
}

export const workspaceUserConverter = {
  toFirestore(workspace: WorkspaceUserConverter): DocumentData {
    return { ...workspace }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): WorkspaceUserConverter {
    const data = snapshot.data(options)
    return new WorkspaceUserConverter(
      snapshot.id,
      data.displayName,
      data.email,
      data.photoURL,
      data.role,
      data.status,
      data.addedAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}
