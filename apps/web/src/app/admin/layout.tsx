"use client"

import { useContext } from "react"
import { GeneralContext } from "../context/context"
import PageTemplate from "../template/admin/PageTemplate"
import { redirect } from "next/navigation"

export default function RootLayout({ children, }: { children: React.ReactNode; }): JSX.Element {

  //faz verificação se usuário está logado ou não
  const { selectedUser } = useContext(GeneralContext)

  if (!selectedUser) {
    console.log("Not logged in")
    redirect("/")
  }

  return (
    <PageTemplate title="Admin">
      {children}
    </PageTemplate>
  )



}
