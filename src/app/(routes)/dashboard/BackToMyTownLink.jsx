"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function BackToMyTownLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const removeQueryString = useCallback((name) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);

    return params.toString();
  });
  return (
    <Link className=" text-green-900"href={pathname + "?" + removeQueryString("town")}>
      back to my town
    </Link>
  );
}
