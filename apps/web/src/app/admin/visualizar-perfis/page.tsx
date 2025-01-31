"use client"

import { GeneralContext } from "../../context/context";
import ContentContainer from "../../template/admin/ContentContainer";
import PageTemplate from "../../template/admin/PageTemplate";
import SearchBar from "./SearchBar";
import ProfileTableContainer from "./ProfileTableContainer";

export default function UserTablePage() {

  return (
    // <PageTemplate title="Visualizar usuários">
    <ContentContainer>
      <ProfileTableContainer />
    </ContentContainer>
    // </PageTemplate>
  );
}