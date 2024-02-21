import { db } from "@/_lib/db";
import AddPostForm from "@/app/(routes)/post/add/AddPostForm";
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
