'use client'

import { UserProps } from "@repo/core";
import { ChangeEvent, createContext, useState } from "react";

interface GeneralContextType {
  usersList: UserProps[];
  selectedUser: UserProps | null;
  userName: string;
  setUserName: (name: string) => void;
  setUsersList: (list: UserProps[]) => void;
  formData: {
    name: string,
    email: string,
    confirmPassword: string
    phoneNumber?: string,
  },
  setFormData: (data: any) => void;
  getInputValues: (e: ChangeEvent<HTMLInputElement>) => void;
  token: string;
  setToken: (token: string) => void;
}

const initialUsersList: UserProps[] = [];
const initialSelectedUser: UserProps | null = null;
const initialUserName: string = "";

export const GeneralContext = createContext<GeneralContextType>({
  usersList: initialUsersList,
  selectedUser: initialSelectedUser,
  userName: initialUserName,
  setUserName: () => { },
  setUsersList: () => { },
  getInputValues: () => { },
  formData: {
    name: "",
    email: "",
    confirmPassword: "",
    phoneNumber: ""
  },
  setFormData: () => { },
  token: "",
  setToken: () => { }
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {

  const [usersList, setUsersList] = useState<UserProps[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [token, setToken] = useState("");

  console.log("USERS LIST", usersList);

  const [userName, setUserName] = useState("");

  const [selectedUser, setSelectedUser] = useState<UserProps | null>(initialSelectedUser);

  function getInputValues(e: ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  return (
    <GeneralContext.Provider value={{ usersList, selectedUser, userName, setUserName, setUsersList, getInputValues, formData, setFormData, token, setToken }}>
      {children}
    </GeneralContext.Provider>
  )
}

