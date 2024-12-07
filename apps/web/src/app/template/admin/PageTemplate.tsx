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
      <Header />
      {props.children}
    </main>
  )
}