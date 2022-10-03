import React from "react";
import { Member } from "../types";

interface ITeamsContext {
  teams: Member[] | null;
  setTeams?: React.Dispatch<React.SetStateAction<Member[] | null>>
}

const defaultState = {
  teams: null,
}

export const TeamsContext = React.createContext<ITeamsContext>(defaultState);