'use client'

import { UserProps } from "@repo/core";
import { ChangeEvent, createContext, useEffect, useState } from "react";
// import Users from "../../../../api/dist/model/users"

interface GeneralContextType {
  usersList: UserProps[];
  selectedUser: UserProps | null;
  userName: string;
  setUserName: (name: string) => void;
  formData: {
    name: string,
    email: string,
    confirmPassword: string
    phone: string,
  },
  setFormData: (data: any) => void;
  getInputValues: (e: ChangeEvent<HTMLInputElement>) => void;
  // token: string;
  // setToken: () => void;
}

const initialUsersList: UserProps[] = [];
const initialSelectedUser: UserProps | null = null;
const initialUserName: string = "";

export const GeneralContext = createContext<GeneralContextType>({
  usersList: initialUsersList,
  selectedUser: initialSelectedUser,
  userName: initialUserName,
  setUserName: (name: string) => { },
  getInputValues: (e: ChangeEvent<HTMLInputElement>) => { },
  formData: {
    name: "",
    email: "",
    confirmPassword: "",
    phone: ""
  },
  setFormData: () => { },
  // token: "",
  // setToken: () => { }
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {

  const [usersList, setUsersList] = useState<UserProps[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch('http://localhost:3333/users', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImVtYWlsIjoiYWRtaW5Aem1haWwuY29tLmJyIiwiaWF0IjoxNzM4Mjg2NDkzLCJleHAiOjE3MzgyOTAwOTN9.v9zfD3-tJCCbjvJBqYxE5nLLWKWnl-XM3e18HbrKeCg'
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsersList(data.data);
      });
  }, []);

  console.log("USERS LIST", usersList);

  const [userName, setUserName] = useState("");

  const [selectedUser, setSelectedUser] = useState<UserProps | null>(initialSelectedUser);

  function getInputValues(e: ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  return (
    <GeneralContext.Provider value={{ usersList, selectedUser, userName, setUserName, getInputValues, formData, setFormData }}>
      {children}
    </GeneralContext.Provider>
  )
}

