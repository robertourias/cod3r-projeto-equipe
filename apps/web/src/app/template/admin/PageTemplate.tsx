import ContextProvider from "../../context/context";
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
    <main className="flex w-screen h-screen">
      <SideMenu />
      <div className="flex flex-col w-full ">
        <Header />
        {props.children}
      </div>
    </main>
  )
}