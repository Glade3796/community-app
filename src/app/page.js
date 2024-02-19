import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1>Home</h1>
      <nav>
        <Link href="/service/slug">Single Service</Link>
        <Link href="/service/slug/edit">Edit Service</Link>
        <Link href="/service/add">Add Service</Link>
      </nav>
    </div>
  );
}
