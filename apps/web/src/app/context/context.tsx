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
  },
  setFormData: (data: any) => void;
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
  formData: {
    name: "",
    email: "",
    confirmPassword: ""
  },
  setFormData: () => { }
});

export default function ContextProvider({ children }: { children: React.ReactNode }) {

  const [usersList, setUsersList] = useState<Users[]>([]);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetch('http://localhost:3333/users', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImVtYWlsIjoiYWRtaW5Aem1haWwuY29tLmJyIiwiaWF0IjoxNzM3ODU2MDg5LCJleHAiOjE3Mzc4NTk2ODl9.QQ70ZdjyVTnLNRaovcnYuleCbyRUBdtxBeUcDduoHe4'
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsersList(data.data);
      });
  }, []);


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

