import Image from "next/image";
import nicola from "@/../public/images/nicola.png";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import profile from "@/../public/images/profile.png";
import logo from "@/../public/images/Logo.png";

export default function Home() {
  return (
    <div>
      <header>
        <Image
          src={logo}
          alt="Helping hands logo"
          width="80"
          height="80"
          className="Logo"
        />
        <AnimateIn>
          <h1>Bringing Our Community Together</h1>
        </AnimateIn>
      </header>

      <div class="container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/towns">Towns</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>

          <li>
            <Link href="/profile" className="profile">
              <Image
                src={profile}
                alt="User Area"
                width="80"
                height="80"
                className="user"
              />
            </Link>
          </li>
        </ul>
      </div>
      <Link href="/post/add">
        <button>
          <span>Add New Post</span>
        </button>
      </Link>
      <div class="post_area">
        <Image
          src={nicola}
          alt="User Area"
          width="80"
          height="80"
          className="user"
        />
        <p>Hello. How are you today?</p>
        <span class="time-right">11:00</span>
      </div>
    </div>
  );
}
