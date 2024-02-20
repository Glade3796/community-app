//create account form, consider moving to component and forcing user to create an account if no profile exists for them

import AccountForm from "@/components/AccountForm";

import { auth } from "@clerk/nextjs";

export default async function CreateAccount() {
  // get the clerk user id
  const clerk_auth_id = auth().userId;
  return (
    <div>
      <h1>Create Account</h1>
      <AccountForm clerk_auth_id={clerk_auth_id} edit={false} />
    </div>
  );
}
