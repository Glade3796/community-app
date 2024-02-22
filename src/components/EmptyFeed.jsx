import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function EmptyFeed({ hasPosts, tag, town }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const removeQueryString = useCallback((name) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);

    return params.toString();
  });

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function isURLparam() {
    if (!hasPosts && !searchParams.has("town")) {
      return true;
    }
  }
  return (
    <div>
      {!hasPosts && (
        <>
          <h1>No posts near you</h1>
          <Link href="/dashboard/post/add">Be the first to addd a post</Link>
        </>
      )}
      {hasPosts && (
        <>
          <h1>No posts</h1>
          <p>try removing some filters</p>
        </>
      )}
      <ul>
        {tag && (
          <li>
            <Link href={pathname + "?" + removeQueryString("town")}>
              {" "}
              Clear <strong>#{searchParams.get("tag")}</strong> filter
            </Link>
          </li>
        )}
        {town && (
          <li>
            <Link href={pathname + "?" + removeQueryString("town")}>
              Clear{" "}
              <strong className="capitalize">{searchParams.get("town")}</strong>{" "}
              filter
            </Link>
          </li>
        )}

        <li>
          <Link href="/dashboard?town=all">
            View <strong>ALL</strong> posts
          </Link>
        </li>
      </ul>
    </div>
  );
}
