import { fetchUserdata } from "@/_lib/fetch";
import AddPostForm from "@/app/(routes)/post/add/AddPostForm";
import Image from "next/image";
import hero from "@/../public/images/hero.jpg";


export default async function AddPostPage() {
  //get user id from clerk and use that to get user id from db
  const user = await fetchUserdata();
  return (
 <main className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <AddPostForm user_id={user.id} />
  </main>
  );
}
