import { Inter } from "next/font/google";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import Image from "next/image";
import logo from "@/../public/images/Logo.png";
import PageFooter from "@/components/Footer";
import PageHeader from "@/components/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Community App",
  description: "Created by Adriana, Aisling, Anne and Fatima",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
             <SiteNav />
              <PageHeader />
              <Image
                src={logo}
                alt="Helping hands logo"
                width="150"
                height="150"
                className="Logo"
              />
              <UserButton />
            <main>{children}</main>
            <PageFooter />
          </body>
        </html>
    </ClerkProvider>
  );
}
