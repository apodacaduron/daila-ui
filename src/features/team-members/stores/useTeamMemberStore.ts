import { defineStore } from 'pinia';

import type { TeamMembersMap } from '../services';

type TeamMemberStoreState = {
  teamMembers: TeamMembersMap | null;
}

export const useTeamMemberStore = defineStore('teamMembers', {
  state: (): TeamMemberStoreState => ({
    teamMembers: null,
  }),
  getters: {
    hasTeamMembers: (state) => Boolean(state.teamMembers?.length),
    teamMembersList: (state) => Object.values(state.teamMembers ?? {})
  },
  actions: {
    setTeamMembers(teamMembers: TeamMembersMap | null) {
      this.teamMembers = teamMembers
    },
  },
})