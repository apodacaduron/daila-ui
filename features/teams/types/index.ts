import { User } from "../../users"

export type Team = {
  id: string,
  name: string | null,
  memberCount: string | null,
  type: 'PSYCHOLOGIST' | 'ADMIN',
}
export type Member = User & {teamData: Team}