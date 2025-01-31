import "./globals.css";
import "../../../../packages/ui/src/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GeneralContext from "./context/context";
import PageTemplate from "./template/admin/PageTemplate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto em Equipes",
  description: "Login e gerenciamento de usuários e perfis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <GeneralContext>
          {children}
        </GeneralContext>
      </body>
    </html>
  );
}
