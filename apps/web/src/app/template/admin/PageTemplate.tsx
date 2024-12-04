import Header from "./Header";

interface PageTemplate {
  title: string;
  description?: string;
  children?: any;
  className?: any;
  menu?: any;
}
export default function PageTemplate(props: PageTemplate) {
  return (
    <main className="flex w-screen h-scree">
      <Header />
      {props.children}
    </main>
  )
}