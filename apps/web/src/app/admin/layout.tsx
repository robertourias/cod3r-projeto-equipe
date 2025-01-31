import PageTemplate from "../template/admin/PageTemplate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <PageTemplate title="Admin">
      {children}
    </PageTemplate>

  );
}
