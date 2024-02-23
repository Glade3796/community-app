import { SignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import hero from "@/../public/images/hero.jpg";
import Image from "next/image";

export default function Home() {
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
          <h1 class="text-4xl font-bold">Welcome to Neighbourly</h1>
          <AnimateIn>
            <p class="mt-2">
              Connecting Neighbours, Building Community Together
            </p>
          </AnimateIn>
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-4 inline-block mx-auto my-4 border border-green-500"
          >
            Get Started
          </Link>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
