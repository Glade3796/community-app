import Link from "next/link";

export default function SiteNav() {
  return (
    <>
      {" "}
      <nav className="flex gap-4 bg-slate-500 opacity-70">
        <p>dev nav:</p>
        <Link href="/">Home</Link>

        <Link href="/post/1">Single Post</Link>
        <Link href="/post/1/edit">Edit Post</Link>
        <Link href="/post/add">Add Post</Link>

        <Link href="/account/create">Create Profile</Link>
        <Link href="/account/profile">View Profile</Link>
        <Link href="/account/starred">Starred</Link>

        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/sort/slug">Sort dashboard</Link>
        <Link href="/dashboard/town/slug">View town</Link>
      </nav>
    </>
  );
}
