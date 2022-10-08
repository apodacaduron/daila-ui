import { collectionGroup, getDocs, query, where } from 'firebase/firestore'
import { useHttpsCallable } from 'react-firebase-hooks/functions'

import { firestore, functions } from '../../../lib/firebase'
import { memberConverter } from '../converters'
import {
  Member,
  NormalizedMemberTeamDataMap,
} from '../types'

export function useTeams() {
  const createTeam = useHttpsCallable(functions, 'createTeamCF')
  const switchCurrentTeam = useHttpsCallable(functions, 'switchCurrentTeamCF')

  async function getUserTeams(id: string) {
    const teamsMap: NormalizedMemberTeamDataMap = {}

    const membersQuery = query(
      collectionGroup(firestore, 'members'),
      where('userId', '==', id),
    ).withConverter(memberConverter)

    const membersSnapshot = await getDocs(membersQuery)
    membersSnapshot.forEach((doc) => {
      if (doc.exists()) {
        const { teamData, ...userData } = doc.data()
        teamsMap[teamData.id] = { ...teamData, userData }
      }
    })

    return teamsMap
  }

  return {
    createTeam: {
      execute: createTeam[0],
      loading: createTeam[1],
      error: createTeam[2],
    },
    switchCurrentTeam: {
      execute: switchCurrentTeam[0],
      loading: switchCurrentTeam[1],
      error: switchCurrentTeam[2],
    },
    getUserTeams,
  }
}
