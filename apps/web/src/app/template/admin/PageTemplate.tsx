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
    <main className="flex flex-1 w-screen h-screen">
      <SideMenu />
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="h-full">
          {props.children}
        </div>
      </div>
    </main>
  )
}