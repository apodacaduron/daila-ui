import type { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"
import type { WorkspaceCategory } from "../services"

class WorkspaceConverter {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string | null,
    readonly logoURL: string | null,
    readonly category: WorkspaceCategory,
    readonly createdById: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) { }

  toString(): string {
    return `Name: ${this.name}`
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
      data.name,
      data.description,
      data.logoURL,
      data.category,
      data.createdById,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    )
  },
}