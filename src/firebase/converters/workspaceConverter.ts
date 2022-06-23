import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export const workspaceCategories = ['psychologist'] as const
export type WorkspaceCategory = typeof workspaceCategories[number]
// export type Workspace = {
//   title: string;
//   category: WorkspaceCategory;
//   logoURL: string | null;
//   createdBy: {
//     uid: string;
//     displayName: string | null;
//     email: string | null;
//     photoURL: string | null;
//   };
// }

class Workspace {
  constructor(
    readonly title: string,
    readonly category: WorkspaceCategory,
    readonly logoURL: string | null,
    readonly createdBy: {
      uid: string;
      displayName: string | null;
      email: string | null;
      photoURL: string | null;
    },
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Title: ${this.title}, Category: ${this.category}`
  }
}

export const userConverter = {
  toFirestore(user: Workspace): DocumentData {
    return { ...user }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Workspace {
    const data = snapshot.data(options)!
    return new Workspace(
      data.title,
      data.category,
      data.logoURL,
      data.createdBy,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}
