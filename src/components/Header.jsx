import Link from "next/link";
import Image from "next/image";
import profile from "@/../public/images/profile.png";
import ht from "@/../public/images/ht.png";

export default function PageHeader() {
  return (
    <header className="flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        {" "}
        <Image
          src={ht}
          alt="Helping hands logo"
          width="70"
          height="70"
          className="Logo"
        />
        <Link href="/">
          <h2 className="text-3xl font-bold">Neighbourly</h2>
        </Link>
        <span class="wave">👋</span>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-lime-900 hover:underline">
          Dashboard
        </Link>
        <Link href="/account/profile">
          <div className="relative h-10 w-10">
            <Image
              src={profile}
              alt="go to profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
