import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/service/slug">Single Service</Link>
      <Link href="/service/slug/edit">Edit Service</Link>
      <Link href="/service/add">Add Service</Link>

      <Link href="/account/create">Create Profile</Link>
      <Link href="/account/profile">View Profile</Link>
      <Link href="/account/starred">Starred</Link>

      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/sort/slug">Sort dashboard</Link>
      <Link href="/dashboard/town/slug">View town</Link>
    </nav>
  );
}
