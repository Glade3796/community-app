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
    <div>
      <h2>Sort By</h2>
      <nav>
        <Link
          href={
            // sort by popularity
            pathname + "?" + createQueryString("sort", "pop")
          }
        >
          Popularity
        </Link>
        <Link
          href={
            // sort by date created (newest first)
            pathname + "?" + createQueryString("sort", "new")
          }
        >
          Newest
        </Link>
        <Link
          href={
            // sort by date created (oldest first)
            pathname + "?" + createQueryString("sort", "old")
          }
        >
          Oldest
        </Link>
      </nav>
    </div>
  );
}


