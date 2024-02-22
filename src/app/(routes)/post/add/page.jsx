import { fetchUserdata } from "@/_lib/fetch";
import AddPostForm from "@/app/(routes)/post/add/AddPostForm";

export default async function AddPostPage() {
  //get user id from clerk and use that to get user id from db
  const user = await fetchUserdata();
  return (
    <>
      <AddPostForm user_id={user.id} />
    </>
  );
}
