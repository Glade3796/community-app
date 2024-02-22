import Link from "next/link";
import Image from "next/image";
import profile from "@/../public/images/profile.png";
import logo from "@/../public/images/Logo.png";

export default function PageHeader() {
    return (
        <header className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-4"> <Image
                src={logo}
                alt="Helping hands logo"
                width="80"
                height="80"
                className="Logo"
              /><Link href="/">
                <h2 className="text-3xl font-bold">Neighbourly</h2>
            </Link></div>
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Dashboard
                </Link>
                <Link href="/account/profile"><div className="relative h-10 w-10">
                    <Image  
                        src={profile}
                        alt="go to profile"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div></Link>
            </div>
        </header>
    );
}