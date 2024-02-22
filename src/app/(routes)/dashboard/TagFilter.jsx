"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function TagFilter({ tag }) {
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
  
  const uniqueTags = [...new Set(tag)];
  
  if (uniqueTags.length === 0) {
    return null;
  }
  return uniqueTags.map((tag, i) => (
    <Link key={i + tag} href={pathname + "?" + createQueryString("tag", tag)}>
      <p className="text-indigo-500">#{tag}</p>
    </Link>
  ));
}
