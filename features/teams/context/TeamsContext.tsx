import React from "react";
import { useTeamsContext } from "../hooks";
import { NormalizedMemberTeamData, NormalizedMemberTeamDataMap } from "../types";

interface ITeamsContext {
  teams: NormalizedMemberTeamDataMap | null;
  setTeams?: React.Dispatch<React.SetStateAction<NormalizedMemberTeamDataMap | null>>
  setCurrentTeam?: React.Dispatch<React.SetStateAction<NormalizedMemberTeamData | null>>
  currentTeam: NormalizedMemberTeamData | null
  teamsList: NormalizedMemberTeamData[]
}

const defaultState = {
  teams: null,
  currentTeam: null,
  teamsList: [],
}

export const TeamsContext = React.createContext<ITeamsContext>(defaultState);

interface Props {
  children: React.ReactNode
}

export function TeamsContextWrapper(props: Props) {
  const teamContext = useTeamsContext()
  return <TeamsContext.Provider value={teamContext}>
    {props.children}
  </TeamsContext.Provider>
}