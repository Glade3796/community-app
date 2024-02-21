import { db } from "@/_lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function SinglePostPage({ params }) {
  let owner = false;
  //fetch params.id (the post id from the url), and the clerk_auth_id from the user to compare against db, if the user is the owner of the post, and fetch the post data.
  const { id } = params;
  const clerk_auth_id = auth().userId;
  const { rows } = await db.query(
    `SELECT * FROM users WHERE  clerk_auth_id = $1`,
    [clerk_auth_id]
  );
  const postData = await db.query(
    `SELECT *, users.username AS username, users.address_number AS address_number, users.address_street AS address_street, users.address_city AS address_city, users.address_postcode AS address_postcode FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = $1`,
    [id]
  );
  const post = postData.rows[0];

  //if the user is the owner of the post or the user is a site admin set owner to true
  if (rows[0].id === post.user_id || rows[0].site_admin) {
    owner = true;
  } else {
    owner = false;
  }
  // console.log(owner);
  return (
    <div>
      <p>{post.created_at.toDateString()}</p>
      {post.updated_at === post.created_at && (
        <p>edited |{post.updated_at.toDateString()}|</p>
      )}
      {/* supposed to show edit and edit time/date if edited??? */}
      <p>{post.post_type}</p>
      <h1>{post.title}</h1>
      {owner && <Link href={`/post/${id}}/edit`}>edit</Link>}
      {/* TODO implement post edit */}
      <p>{post.content}</p>
      {post.quantity && <p>Quantity: {post.quantity}</p>}
      {post.frequency && <p>Frequency: {post.frequency}</p>}
      {post.date && <p>Date: {post.date}</p>}
      {post.available && <p>Available</p>}
      {!post.closed && <p>Closed</p>}
      <p>Owner: {post.username}</p>
      {/* include address, if set to visisble */}
      {post.show_address && (
        <div>
          <p>
            Address: {post.address_number} {post.address_street},{" "}
            {post.address_city}, {post.address_postcode}
          </p>
        </div>
      )}
      {owner && <Link href={`/post/${id}/delete`}>delete</Link>}

      {/* TODO implement simple post delete */}
    </div>
  );
}
