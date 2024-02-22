import Link from "next/link";
import StarPost from "./StarPost";
import { fetchTownPosts, fetchUserdata } from "@/_lib/fetch";

export async function DashboardFeed() {
  const user = await fetchUserdata();
  const user_id = user.id;
  const user_town = user.address_city;

  const posts = await fetchTownPosts(user_town);
  // default option is to sort by most recent
  // default shows you posts from your town// town = posts.city

  // if show_address = true, show postcode
  // TODO consider separating posts with a sort function rather than in-query
  // TODO consider adding a limit to the number of posts returned per page

  return (
    <>
      <p>My Town: {user_town}</p>
      {/* make this a drop down */}
      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li key={post.post_id} className="py-4 border-b border-zinc-800">
            <Link href={`/post/${post.post_id}`}>
            <strong className="text-3xl">{post.post_title}</strong>
            </Link>
            <p className="text-xl" ><Link href={`/post/${post.post_id}`}>{post.post_content}</Link></p>
            <p className="text-zinc-400">posted by {post.posted_by}</p>
            <div className="flex items-center"><StarPost postId={post.post_id} userId={user_id}/><p className="ml-2">: {post.star_count} stars</p></div>
            {post.show_address && <p>{post.postcode}</p>}
            <Link href={`/tags/${post.tag_id}`}><p className="text-indigo-500">#{post.tag_content}</p></Link>
          </li>
        ))}
      </ul>
    </>
  );
}
