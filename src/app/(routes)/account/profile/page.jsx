import { db } from "@/_lib/db";
import { fetchUserdata, fetchUsersPostData } from "@/_lib/fetch";

import Link from "next/link";

export default async function ProfilePage() {
  const user = await fetchUserdata();
  const user_id = user.id;
  const posts = await fetchUsersPostData(user_id);
  console.log("posts", posts);
  return (
    <>
      <div>
        <h1>{user.username}&apos;s profile page</h1>
        <p>Username: {user.username}</p>
        <p>Full name: {user.full_name}</p>
        <p>Organisation: {user.organisation_name}</p>
        <p>Biography: {user.biography}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone_number}</p>
        <p>
          Address: {user.address_number} {user.address_street},{" "}
          {user.address_city}, {user.address_postcode}
        </p>
        {user.verified && <p>Verified</p>}
        {user.site_admin && <p>Site admin</p>}
        <Link href="/account/edit">Edit profile</Link>
      </div>

      <div>
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <p>[{post.post_type}]</p>
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.content}</p>
                {post.quantity && <p>Quantity: {post.quantity}</p>}
                {post.frequency && <p>Frequency: {post.frequency}</p>}

                {/* <p>{post.created_at}</p>
              <p>{post.updated_at}</p> */}
                <p>{post.available ? "Available" : "Not available"}</p>
                <p>{post.closed ? "Closed" : "Open"}</p>
                <p>{post.created_at.toDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
