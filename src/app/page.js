import { SignIn, UserButton} from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <p className="mb-4">Share with your community</p>
      <SignIn />
      <Link href="/post/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-4">Share a post</Link>
    </div>
      
  );
}
