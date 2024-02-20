/*import Image from "next/image";
import { UserButton } from "@clerk/nextjs";*/
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

export default function Home() {
  return (
    <div>
      <div class="container">
        <nav>
          <Link href="/home">
            <button>
              <span>What we do</span>
            </button>
          </Link>
          <AnimateIn>
            <p>Bringing our Community together</p>
          </AnimateIn>
          <Link href="/about">
            <button>
              <span>How it works</span>
            </button>
          </Link>
          <AnimateIn>
            <p>When neighbours start talking, great things happen</p>
          </AnimateIn>
          <Link href="/categories">
            <button>
              <span>Categories</span>
            </button>
          </Link>
          <AnimateIn>
            <p>Look out for the Community Engagement</p>
          </AnimateIn>

          <Link href="/contact">
            <button>
              <span>Contact</span>
            </button>
          </Link>
          <AnimateIn>
            <p>How can we help? ... We are here for You</p>
          </AnimateIn>
        </nav>
      </div>

      <AnimateIn>
        <p>
          Bringing the community together with all the informations about the
          local area, crime updates, recommendations and much more
        </p>
      </AnimateIn>
    </div>
  );
}
