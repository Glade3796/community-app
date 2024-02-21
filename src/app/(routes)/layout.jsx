//force user to make profile layer

import { db } from "@/_lib/db";

import CreateAccount from "@/components/CreateAccount";
import { auth } from "@clerk/nextjs";
import React from "react";

export async function validateUser() {
  const clerk_auth_id = auth().userId;
  
  const userData = await db.query(
    `SELECT * FROM users WHERE clerk_auth_id = $1`,
    [clerk_auth_id]
  );
  
  if (userData.rowCount === 0) {
    return { exists: false, id: null };
  }
  return {
    exists: true,
    id: userData.rows[0].id,
    username: userData.rows[0].username,
  };
}

export default async function layout({ children }) {
  const user = await validateUser();
  console.log("validate user?", user);
  return <>{user.exists ? <>{children}</> : <CreateAccount />} </>;
}
