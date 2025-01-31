import GeneralContext from "../../context/context";
import Form from "./CriarUsuarioForm";

interface PageTemplate {
  title: string;
  description?: string;
  children?: any;
  className?: any;
  menu?: any;
}
export default function PageTemplate(props: PageTemplate) {
  return (
    <main className="flex w-full h-full">
      <Form />
      {props.children}
    </main>
  );
}
