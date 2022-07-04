import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { Workspace } from '../workspaces'

export const onCreateWorkspaceTrigger = functions.firestore
  .document('workspaces/{workspaceId}')
  .onCreate(async (snap, context) => {
    const workspaceDocument = snap.data() as Workspace

    const userWorkspaceRef = admin
      .firestore()
      .collection(`users/${workspaceDocument.createdBy.id}/workspaces`).doc(snap.id)
    userWorkspaceRef.create(workspaceDocument)

    const userRef = admin
      .firestore()
      .doc(`users/${workspaceDocument.createdBy.id}`)
    userRef.update({ lastUsedWorkspaceId: snap.id, hasWorkspace: true })
  })
