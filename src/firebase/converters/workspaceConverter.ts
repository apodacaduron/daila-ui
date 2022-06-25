import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export const workspaceCategories = ['admin', 'psychologist'] as const
export type WorkspaceCategory = typeof workspaceCategories[number]
export type Workspace = {
  id: string;
  title: string;
  category: WorkspaceCategory;
  logoURL: string | null;
  createdBy: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    role: 'admin' | 'editor' | 'user'
  };
  createdAt: Date;
  updatedAt: Date;
}

class WorkspaceConverter {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly category: WorkspaceCategory,
    readonly logoURL: string | null,
    readonly createdBy: {
      uid: string;
      displayName: string | null;
      email: string | null;
      photoURL: string | null;
      role: 'admin' | 'editor' | 'user'
    },
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
