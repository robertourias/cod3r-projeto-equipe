interface ContentContainerProps {
  children?: any;
}
export default function ContentContainer(props: ContentContainerProps) {

  return (
    <section className="w-full h-4/5 bg-admin-inner-container">{props.children}</section>
  )
}