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
    getUserTeams,
  }
}
