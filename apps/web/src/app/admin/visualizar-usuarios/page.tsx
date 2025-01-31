"use client"

import ContentContainer from "../../template/admin/ContentContainer";
import PageTemplate from "../../template/admin/PageTemplate";
import SearchBar from "./SearchBar";
import UsersTableContainer from "./UsersTableContainer";
import { useEffect, useState } from "react";

export default function UserTablePage() {

  return (
    <PageTemplate title="Visualizar usuários">
      <ContentContainer>
        <SearchBar />
        <UsersTableContainer />
      </ContentContainer>
    </PageTemplate>
  );
}