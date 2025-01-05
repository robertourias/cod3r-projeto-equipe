import ContextProvider from "../../context/context";
import ContentContainer from "./ContentContainer";
import Header from "./Header";
import SideMenu from "./SideMenu";

interface PageTemplate {
  title: string;
  description?: string;
  children?: any;
  className?: any;
  menu?: any;
}
export default function PageTemplate(props: PageTemplate) {
  return (
    <ContextProvider>
      <main className="flex w-screen h-screen">
        <SideMenu />
        <div className="flex flex-col w-full ">
          <Header />
          {props.children}
        </div>
      </main>
    </ContextProvider>
  )
}