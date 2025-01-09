'use client'

import { ChangeEvent, createContext, useState } from "react";
import usersList from "../../../../api/mock/users.json";
import Users from "../../../../api/dist/model/users"

interface GeneralContextType {
  usersList: Users[];
  selectedUser: Users | null;
  userName: string;
  setUserName: (name: string) => void;
  getInputValues: (e: ChangeEvent<HTMLInputElement>) => void;
}

const initialUsersList: Users[] = [];
const initialSelectedUser: Users | null = null;
const initialUserName: string = "";

export const GeneralContext = createContext<GeneralContextType>({
  usersList: initialUsersList,
  selectedUser: initialSelectedUser,
  userName: initialUserName,
  setUserName: (name: string) => { },
  getInputValues: (e: ChangeEvent<HTMLInputElement>) => { },
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {

  const [userName, setUserName] = useState("");

  const [selectedUser, setSelectedUser] = useState<Users | null>(initialSelectedUser);

  function getInputValues(e: ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  return (
    <GeneralContext.Provider value={{ usersList, selectedUser, userName, setUserName, getInputValues }}>
      {children}
    </GeneralContext.Provider>
  )
}

