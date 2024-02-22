import { db } from "@/_lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function SinglePostPage({ params }) {
  let owner = false;
  //fetch params.id (the post id from the url), and the clerk_auth_id from the user to compare against db, if the user is the owner of the post, and fetch the post data.
  const { post_id } = params;

  const clerk_auth_id = auth().userId;
  const { rows } = await db.query(
    `SELECT * FROM users WHERE  clerk_auth_id = $1`,
    [clerk_auth_id]
  );
  const postData = await db.query(
    `SELECT *, users.username AS username, users.address_number AS address_number, users.address_street AS address_street, users.address_city AS address_city, users.address_postcode AS address_postcode FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = $1`,
    [post_id]
  );
  const post = postData.rows[0];

  //if the user is the owner of the post or the user is a site admin set owner to true

  if (rows[0].id === post.user_id || rows[0].site_admin) {
    owner = true;
  } else {
    owner = false;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 m-5 border border-lime-800 rounded-lg bg-blue-100">
      <p className="text-gray-500">{post.created_at.toDateString()}</p>
      {post.updated_at === post.created_at && (
        <p className="text-gray-500">edited | {post.updated_at.toDateString()}</p>
      )}
      <p className="text-gray-500">{post.post_type}</p>
      <h1 className="text-3xl font-bold my-4">{post.title}</h1>
     
      <p className="my-4">{post.content}</p>
      <p className="my-4">Owner: {post.username}</p>
      {owner && <Link href={`/post/${post_id}/edit`} className="text-blue-500">edit</Link>}
      {post.quantity && <p className="my-2">Quantity: {post.quantity}</p>}
      {post.frequency && <p className="my-2">Frequency: {post.frequency}</p>}
      {post.date && <p className="my-2">Date: {post.date}</p>}
      {post.available && <p className="my-2 text-green-500">Available</p>}
      {!post.closed && <p className="my-2 text-red-500">Closed</p>}
  
      {post.show_address && (
        <div className="my-4">
          <p className="text-gray-500">
            Address: {post.address_number} {post.address_street},{" "}
            {post.address_city}, {post.address_postcode}
          </p>
        </div>
      )}
      {owner && <Link href={`/post/${post_id}/delete`} className="text-red-500">Delete</Link>}
    </div>
  );
      } 