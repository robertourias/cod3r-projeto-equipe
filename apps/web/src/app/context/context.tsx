'use client'

import { ChangeEvent, createContext, useEffect, useState } from "react";
import Users from "../../../../api/dist/model/users"

interface GeneralContextType {
  usersList: Users[];
  selectedUser: Users | null;
  userName: string;
  setUserName: (name: string) => void;
  formData: {
    name: string,
    email: string,
    confirmPassword: string
    phoneNumber: string,
  },
  setFormData: (data: any) => void;
  getInputValues: (e: ChangeEvent<HTMLInputElement>) => void;
  // token: string;
  // setToken: () => void;
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
  formData: {
    name: "",
    email: "",
    confirmPassword: "",
    phoneNumber: ""
  },
  setFormData: () => { },
  // token: "",
  // setToken: () => { }
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {

  const [usersList, setUsersList] = useState<Users[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch('http://localhost:3333/users', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRmVybmFuZGEiLCJlbWFpbCI6ImZlQGhvdG1haWwuY29tIiwiaWF0IjoxNzM4MjA2OTQ0LCJleHAiOjE3MzgyMTA1NDR9.ysLK1lMS4uBH6Bbmh-PWqiaiXap1qghGGEUTz_Xyy6c'
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsersList(data.data);
      });
  }, []);

  console.log("USERS LIST", usersList);

  const [userName, setUserName] = useState("");

  const [selectedUser, setSelectedUser] = useState<Users | null>(initialSelectedUser);

  function getInputValues(e: ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  return (
    <GeneralContext.Provider value={{ usersList, selectedUser, userName, setUserName, getInputValues, formData, setFormData }}>
      {children}
    </GeneralContext.Provider>
  )
}

