import { Inter } from "next/font/google";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import Image from "next/image";
import logo from "@/../public/images/Logo.png";

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
            <Image
              src={logo}
              alt="Helping hands logo"
              width="150"
              height="150"
              className="Logo"
            />
            <UserButton />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
