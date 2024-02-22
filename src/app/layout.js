import { Inter } from "next/font/google";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import "./globals.css";
import PageFooter from "@/components/Footer";
import PageHeader from "@/components/Header";
import DevSiteNav from "../components/DevSiteNav";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Neighbourly | community app",
  description: "Created by Adriana, Aisling, Anne and Fatima",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <DevSiteNav />
              <PageHeader />
            <main>{children}</main>
            <PageFooter />
          </body>
        </html>
    </ClerkProvider>
  );
}
