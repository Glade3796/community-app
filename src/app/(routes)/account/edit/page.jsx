import { fetchUserdata } from "@/_lib/fetch";
import AccountForm from "@/components/AccountForm";
import { auth } from "@clerk/nextjs";

export default async function EditAccountPage() {
  // get the clerk user id
  const clerk_auth_id = auth().userId;
  const userData = await fetchUserdata(clerk_auth_id);
  return (
    <div>
      <h1>Edit Account</h1>
      <AccountForm edit={true} userData={userData} />
    </div>
  );
}
