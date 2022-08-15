import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/v1/auth';

import { getTimestamps } from '../utils/timestamps';
import { Member, Workspace } from '../utils/types';

const env = functions.config();

export const createAccount = functions.auth.user().onCreate((user) => {
  // Set account role
  const userRole = user.email === env.role.admin ? 'ADMIN' : 'USER';
  admin.auth().setCustomUserClaims(user.uid, {
    role: userRole,
  });

  // Create user document
  const userDoc = {
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    phoneNumber: user.phoneNumber || null,
    lastWorkspaceId: null,
    ...getTimestamps()
  }
  admin.firestore().collection('users').doc(user.uid).set(userDoc)

  createPersonalWorkspace(user)
})

async function createPersonalWorkspace(user: UserRecord) {
  // Create workspace document
  const basicWorkspaceDoc: Workspace = {
    name: 'Personal workspace',
    description: 'A place to save notes, documents and appointments',
    category: 'personal-space',
    createdById: user.uid,
    memberCount: 1,
    logoURL: null,
    ...getTimestamps()
  }
  const workspaceDocRef = await admin.firestore().collection('workspaces').add(basicWorkspaceDoc)

  // Assign member to workspace
  const memberDoc: Member = {
    displayName: user.displayName || null,
    email: user.email || null,
    photoURL: user.photoURL || null,
    role: 'OWNER',
    status: 'ACTIVE',
    ...getTimestamps()
  }
  admin.firestore().collection('workspaces').doc(workspaceDocRef.id).collection('members').doc(user.uid).set(memberDoc)

  // Assign workspace to user
  admin.firestore().collection('users').doc(user.uid).collection('workspaces').doc(workspaceDocRef.id).set(basicWorkspaceDoc)

  // Save workspace id
  admin.firestore().collection('users').doc(user.uid).update({ lastWorkspaceId: workspaceDocRef.id })
}
