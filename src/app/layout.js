import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import SiteNav from "./components/SiteNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Community App",
  description: "Created by Anne, Aisling, Fatima and Adriana",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <SiteNav />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
