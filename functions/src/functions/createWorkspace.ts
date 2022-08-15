import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { checkAuth } from '../utils/checkAuth';
import { getTimestamps } from '../utils/timestamps';
import { Member, Workspace } from '../utils/types';

export const createWorkspace = functions.https.onCall(async (data, context) => {
  checkAuth(context)

  if (!context.auth?.uid) return

  const user = await admin.firestore().collection('users').doc(context.auth.uid).get()

  const workspaceDoc: Workspace = {
    name: data.name,
    description: data.description ?? null,
    category: data.category,
    createdById: context.auth.uid,
    memberCount: 1,
    logoURL: null,
    ...getTimestamps()
  }
  const workspaceDocRef = await admin.firestore().collection('workspaces').add(workspaceDoc);

  const memberDoc: Member = {
    displayName: user.data()?.displayName || null,
    email: user.data()?.email || null,
    photoURL: user.data()?.photoURL || null,
    role: 'OWNER',
    status: 'ACTIVE',
    ...getTimestamps()
  }
  await admin.firestore().collection('workspaces').doc(workspaceDocRef.id).collection('members').doc(context.auth.uid).set(memberDoc);

  await admin.firestore().collection('users').doc(context.auth.uid).collection('workspaces').doc(workspaceDocRef.id).set(workspaceDoc)
  await admin.firestore().collection('users').doc(context.auth.uid).update({ lastWorkspaceId: workspaceDocRef.id })
});