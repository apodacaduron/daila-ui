import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { Workspace, WorkspaceUser } from '../workspaces'

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

export const onUserInvitedToWorkspaceTrigger = functions.firestore
  .document('workspaces/{workspaceId}/users/{userId}')
  .onCreate(async (snap, context) => {
    const workspaceRef = admin
      .firestore()
      .collection(`workspaces`).doc(context.params.workspaceId)
    const workspace = await workspaceRef.get()

    const workspaceUserDocument = snap.data() as WorkspaceUser
    const userInvitationsRef = admin
      .firestore()
      .collection('invitations').doc()
    userInvitationsRef.create({ workspace: { id: workspace.id, ...workspace.data() }, ...workspaceUserDocument })
  })
