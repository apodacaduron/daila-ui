import { User } from "../../users"

export type Team = {
  id: string,
  name: string | null,
  memberCount: string | null,
  type: 'PSYCHOLOGIST' | 'ADMIN',
}
export type Member = User & {teamData: Team}

export type NormalizedMemberTeamData = Team & { userData: User }
export type NormalizedMemberTeamDataMap = { [teamId: string]: NormalizedMemberTeamData }