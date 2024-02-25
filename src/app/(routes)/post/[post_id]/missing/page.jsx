import { fetchDeletions, fetchUserdata } from "@/_lib/fetch";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MissingPost({ params }) {
  const { post_id } = params;
  const user = await fetchUserdata();
  const deleted = await fetchDeletions(post_id);
  const isOwner = user.id === deleted.post.user_id;
  if (!deleted) {
    return notFound();
  }
  return (
    <>
      {!deleted ? (
        <div>
          <h1>Missing Post</h1>
          <p>Sorry, we couldn&apos;t find that post.</p>
        </div>
      ) : (
        <div>
          <h1>Deleted Post</h1>
          <p>This post has been deleted.</p>
          <p>reason: {deleted.reason}</p>
          <div className="flex flex-col gap 4">
            <Link
              href="/dashboard"
              className="  hover:underline hover:font-bold"
            >
              {" "}
              Return to Dashboard
            </Link>
            {isOwner && (
              <Link
                href={`/post/${post_id}/recover`}
                className="hover:underline hover:font-bold"
              >
                Recover the post
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
