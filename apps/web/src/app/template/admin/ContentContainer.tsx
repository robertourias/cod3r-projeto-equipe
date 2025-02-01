interface ContentContainerProps {
  children?: any;
}
export default function ContentContainer(props: ContentContainerProps) {

  return (
    <section className="w-full h-full bg-admin-inner-container">{props.children}</section>
  )
}