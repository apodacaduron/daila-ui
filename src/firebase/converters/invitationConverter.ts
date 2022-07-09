import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import { Workspace, WorkspaceUser, WorkspaceUserRole, WorkspaceUserStatus } from './workspaceConverter'

export type Invitation = {
  id: string;
  workspace: Workspace & { id: string };
} & WorkspaceUser

class InvitationConverter {
  constructor(
    readonly id: string,
    readonly workspace: Workspace,
    readonly displayName: string | null,
    readonly email: string | null,
    readonly photoURL: string | null,
    readonly role: WorkspaceUserRole,
    readonly status: WorkspaceUserStatus,
    readonly addedAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Email: ${this.email}`
  }
}

export const invtiationConverter = {
  toFirestore(invitation: InvitationConverter): DocumentData {
    return { ...invitation }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): InvitationConverter {
    const data = snapshot.data(options)
    return new InvitationConverter(
      snapshot.id,
      data.workspace,
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