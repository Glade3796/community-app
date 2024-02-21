import { db } from "@/_lib/db";
import AddServiceForm from "@/app/(routes)/service/add/AddServiceForm";
import { auth } from "@clerk/nextjs";

export default async function AddPostPage() {
  //get user id from clerk and use that to get user id from db
  const clerk_auth_id = auth().userId;
  const response = await db.query(
    `SELECT id FROM users WHERE clerk_auth_id = $1`,
    [clerk_auth_id]
  );
  const user_id = response.rows[0].id;

  return (
    <>
      <AddPostForm user_id={user_id} />
    </>
  );
}
