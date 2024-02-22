"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SortByNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="p-3 text-center">
      <h2 className="text-xs">Sort By</h2>
      <nav className="flex gap-8 text-center">
        <p><Link
          href={
            // sort by popularity
            pathname + "?" + createQueryString("sort", "pop")
          } className="underline"
        >
          Popularity
        </Link></p>
        <p><Link
          href={
            // sort by date created (newest first)
            pathname + "?" + createQueryString("sort", "new")
          } className="underline"
        >
          Newest
        </Link></p>
        <p><Link
          href={
            // sort by date created (oldest first)
            pathname + "?" + createQueryString("sort", "old")
          } className="underline"
        >
          Oldest
        </Link></p>
      </nav>
    </div>
  );
}


