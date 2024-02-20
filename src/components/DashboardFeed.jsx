import Link from "next/link";
import { db } from "@/_lib/db.js"
import Upvote from "./Upvote";

export async function DashboardFeed() {
  const { rows: posts } = await db.query(`
    SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, users.username AS posted_by
    FROM posts
    JOIN users ON posts.user_id = users.id
  `);

  return (
    <>
      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li key={post.post_id} className="py-4 border-b border-zinc-800">
            <Link href={`/post/${post.post_id}`}>
            <strong>{post.post_title}</strong>
            </Link>
            <p><Link href={`/post/${post.post_id}`}>{post.post_content}</Link></p>
            <p className="text-zinc-400">posted by {post.posted_by}</p>
          </li>
        ))}
      </ul>
    </>
  );
}