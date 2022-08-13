import { collection, getDocs, query } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import { errorHandler } from '../../../utils/errorHandler';
import { teamMemberConverter } from '../converters';

import type { Option } from '../../../utils/types';
export type TeamMember = {
  id: string
  name: string,
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

export const useTeamMemberService = (context?: TeamMemberServiceContext) => {
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

  return {
    getTeamMembersByWorkspaceId,
  }
}