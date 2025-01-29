import "./globals.css";
import "../../../../packages/ui/src/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GeneralContext from "./context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GeneralContext>
          {children}
        </GeneralContext>
      </body>
    </html>
  );
}
