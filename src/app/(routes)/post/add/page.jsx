import hero from "@/../public/images/hero.jpg";
import Image from "next/image";
import AddPostForm from "@/app/(routes)/post/add/AddPostForm";
import { fetchUserdata } from "@/_lib/fetch";

export default async function AddPostPage() {
  const user = await fetchUserdata();
  return (
    <div>
      <div>
        <Image
          src={hero}
          fill
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
      <div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
         <AddPostForm user_id={user.id} />
        </div>
      </div>
    </div>
  );
}
