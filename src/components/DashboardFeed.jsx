import Link from "next/link";
import { db } from "@/_lib/db.js"
import StarPost from "./StarPost";
import {auth} from "@clerk/nextjs";


export async function DashboardFeed() {
   const clerk_auth_id = auth().userId;
   const response = await db.query(
    `SELECT id FROM users WHERE clerk_auth_id = $1`,
    [clerk_auth_id]
  );
  const user_id = response.rows[0].id;
  const user_town = userInfo.rows[0].address_city;
  
  const { rows: posts } = await db.query(`
    SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, users.username AS posted_by, users.address_city AS city, users.address_postcode AS postcode, posts.show_address AS show_address, tags.content AS tag_content, COUNT(star.id) AS star_count
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN post_tags ON posts.id = post_tags.post_id
    LEFT JOIN tags ON post_tags.tag_id = tags.id
    LEFT JOIN star ON posts.id = star.post_id
    GROUP BY posts.id, users.username, tags.content
    ORDER BY posts.created_at DESC
    WHERE users.address_city = $1
    `,
    [user_town]
  );
// default option is to sort by most recent
// default shows you posts from your town// town = posts.city
  // if show_address = true, show postcode
  // TODO consider separating posts with a sort function rather than in-query
  // TODO consider adding a limit to the number of posts returned per page
 

  return (
    <>
      <p>location: {user_town}</p>
      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li key={post.post_id} className="py-4 border-b border-zinc-800">
            <Link href={`/post/${post.post_id}`}>
            <strong>{post.post_title}</strong>
            </Link>
            <p><Link href={`/post/${post.post_id}`}>{post.post_content}</Link></p>
            <p className="text-zinc-400">posted by {post.posted_by}</p><p className="text-indigo-500">{post.tag_content}</p>
            <StarPost postId={post.post_id} userId={user_id}/><p>Total Stars: {post.star_count}</p>
            {post.show_address && <p>{post.postcode}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
