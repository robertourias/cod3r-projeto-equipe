import GeneralContext from "../../context/context";
import Form from "./Form";

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
      <Form />
      {props.children}
    </main>
  );
}
