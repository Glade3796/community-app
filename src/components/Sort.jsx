"use client"
import Link from "next/link";

export default function SortByNav() {
  return (
    <div>
      <h2>Sort By</h2>
      <nav>
        <Link href="/dashboard/sort?popularity">Most Popular</Link>
        <Link href="/dashboard">Most Recent</Link>
      </nav>
    </div>
  );
}

