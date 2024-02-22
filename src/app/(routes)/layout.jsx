//force user to make profile layer

import { fetchUserdata } from "@/_lib/fetch";

import CreateAccount from "@/components/CreateAccount";
import SideBar from "@/components/SideBar";

import React from "react";

export default async function layout({ children }) {
  const user = await fetchUserdata();
  if (!user) {
    return <CreateAccount />;
  }
  return (
    <main className="flex">
      {" "}
      <SideBar />
      <section className="flex-1">{children}</section>
    </main>
  );
}
