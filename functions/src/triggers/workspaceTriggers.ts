import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const onCreateWorkspaceTrigger = functions.firestore
  .document('workspaces/{workspaceId}')
  .onCreate(async (snap, context) => {
    const workspaceDocument = snap.data()

    const userWorkspaceRef = admin
      .firestore()
      .collection(`users/${workspaceDocument.createdBy.uid}/workspaces`).doc(snap.id)
    userWorkspaceRef.create(workspaceDocument)

    const userRef = admin
      .firestore()
      .doc(`users/${workspaceDocument.createdBy.uid}`)
    userRef.update({ lastUsedWorkspaceId: snap.id, hasWorkspace: true })
  })
