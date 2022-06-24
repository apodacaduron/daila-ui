import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export type User = {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  hasWorkspace: boolean;
  lastUsedWorkspaceId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

class UserConverter {
  constructor(
    readonly id: string,
    readonly displayName: string | null,
    readonly email: string | null,
    readonly photoURL: string | null,
    readonly phoneNumber: string | null,
    readonly hasWorkspace: boolean,
    readonly lastUsedWorkspaceId: string | null,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Email: ${this.email}`
  }
}

export const userConverter = {
  toFirestore(user: UserConverter): DocumentData {
    return { ...user }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): UserConverter {
    const data = snapshot.data(options)
    return new UserConverter(
      snapshot.id,
      data.displayName,
      data.email,
      data.photoURL,
      data.phoneNumber,
      data.hasWorkspace,
      data.lastUsedWorkspaceId,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}
