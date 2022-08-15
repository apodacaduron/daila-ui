import { collection, getDocs, query } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

import { firestore, functions } from '../../../firebase';
import { errorHandler } from '../../../utils/errorHandler';
import { teamMemberConverter } from '../converters';

import type { Option } from '../../../utils/types';
export const memberStatus = ['ACTIVE', 'INACTIVE', 'INVITED'] as const
export type MemberStatus = typeof memberStatus[number]

export const memberRoles = ['OWNER', 'USER'] as const
export type MemberRole = typeof memberRoles[number]

export type TeamMember = {
  id: string
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: MemberRole;
  status: MemberStatus;
  createdAt: Date,
  updatedAt: Date
}

export type TeamMembersMap = {
  [teamMemberId: string]: TeamMember
}

type TeamMemberServiceContext = {
  handlers?: {
    onGetTeamMembersByWorkspaceId?(teamMembersMap: TeamMembersMap): void
  }
}

export type InviteTeamMember = {
  workspaceId: string
  email: string
}


export const useTeamMemberService = (context?: TeamMemberServiceContext) => {
  const inviteTeamMemberCF = httpsCallable<InviteTeamMember>(functions, 'inviteTeamMember')

  // Handlers
  async function getTeamMembersByWorkspaceId(workspaceId: Option<string>) {
    try {
      if (!workspaceId) throw new Error('Workspace id not found')

      const teamMembers: TeamMembersMap = {}
      const q = query(collection(firestore, `workspaces/${workspaceId}/members`)).withConverter(teamMemberConverter)
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((snapshot) => {
        if (snapshot.exists()) {
          teamMembers[snapshot.data().id] = snapshot.data()
        }
      })
      context?.handlers?.onGetTeamMembersByWorkspaceId?.(teamMembers)
      return teamMembers
    } catch (err) {
      return errorHandler(err)
    }
  }

  function inviteTeamMember(payload: InviteTeamMember) {
    try {
      return inviteTeamMemberCF(payload)
    } catch (err) {
      return errorHandler(err)
    }
  }

  return {
    getTeamMembersByWorkspaceId,
    inviteTeamMember,
  }
}