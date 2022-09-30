import { useHttpsCallable } from 'react-firebase-hooks/functions'

import { functions } from '../../../lib/firebase'

export function useTeams() {
  const createTeam = useHttpsCallable(functions, 'createTeamCF')

  return {
    createTeam: {
      execute: createTeam[0],
      loading: createTeam[1],
      error: createTeam[2],
    },
  }
}
