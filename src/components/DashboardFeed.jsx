import Link from "next/link";
import { db } from "@/_lib/db.js";
import Upvote from "./Upvote";
import { auth } from "@clerk/nextjs";

export async function DashboardFeed() {
  //get user id from clerk and use that to get user user town from db
  const clerk_auth_id = auth().userId;
  const userInfo = await db.query(
    `
    SELECT * FROM users WHERE clerk_auth_id = $1
  `,
    [clerk_auth_id]
  );
  const user_town = userInfo.rows[0].address_city;

  //return user town posts
  const { rows: posts } = await db.query(
    `
    SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, users.username AS posted_by, users.address_city AS city, users.address_postcode AS postcode, posts.show_address AS show_address
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE users.address_city = $1
  `,
    [user_town]
  );
  // town = posts.city
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
            <p>
              <Link href={`/post/${post.post_id}`}>{post.post_content}</Link>
            </p>
            <p className="text-zinc-400">posted by {post.posted_by}</p>
            {post.show_address && <p>{post.postcode}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
