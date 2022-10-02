import React from "react";
import { User } from "../types";

interface IUserContext {
  user: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>
}

const defaultState = {
  user: null,
}

export const UserContext = React.createContext<IUserContext>(defaultState);