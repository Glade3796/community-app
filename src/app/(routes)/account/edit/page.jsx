import { fetchUserdata } from "@/_lib/fetch";
import AccountForm from "@/components/AccountForm";
import { auth } from "@clerk/nextjs";


export default async function EditAccountPage() {
  const clerk_auth_id = auth().userId;
  const userData = await fetchUserdata();
  return (
    <main className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <h1>Edit Account</h1>
      <AccountForm edit={true} userData={userData} />
    </main>
  );
}
