import StarPost from "@/components/StarPost";
import Link from "next/link";
import TagFilter from "./TagFilter";
import { useSearchParams } from "next/navigation";

export default function PostFeed({ posts, starred_posts, user_id }) {
  //disable star button if already in user's starred posts
  function isStarred(postId) {
    return starred_posts.some((post) => post.post_id === postId);
  }
  const searchParams = useSearchParams();
  const getTown = searchParams.get("town");
  const town = getTown?.charAt(0).toUpperCase() + getTown?.slice(1);
  function title() {
    if (searchParams.has("town")) {
      if (town === "all") {
        return "All Posts";
      }
      return `All posts from ${town}`;
    }

    return null;
  }

  return (
    <>
      <h1>{title()}</h1>

      {searchParams.has("tag") && (
        <p>posts tagged #{searchParams.get("tag")}</p>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.post_id} className="py-4 border-b border-lime-900">
            <Link href={`/post/${post.post_id}`}>
              <strong className="text-3xl">{post.post_title}</strong>
            </Link>
            <p className="text-xl">
              <Link href={`/post/${post.post_id}`}>{post.post_content}</Link>
            </p>
            <p className="text-zinc-400">posted by {post.posted_by}</p>
            <div className="flex items-center">
              {/* invert star color if already starred */}
              {isStarred(post.post_id) && <p className="filter invert">⭐</p>}
              {/* or else show the star button */}
              {!isStarred(post.post_id) && (
                <StarPost postId={post.post_id} userId={user_id} />
              )}
              <p className="ml-2">: {post.star_count} stars</p>
            </div>
            {post.show_address && <p>{post.postcode}</p>}
            <TagFilter tag={post.tag_content} />
          </li>
        ))}
      </ul>
    </>
  );
}
