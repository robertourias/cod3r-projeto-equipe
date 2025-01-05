'use client'

import { createContext } from "react";
import usersList from "../../../../api/mock/users.json";
import Users from "../../../../api/dist/model/users"

interface GeneralContextType {
  usersList: Users[];
}

export const GeneralContext = createContext<GeneralContextType>({ usersList });

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const users = usersList

  return (
    <GeneralContext.Provider value={{ usersList }}>
      {children}
    </GeneralContext.Provider>
  )
}

