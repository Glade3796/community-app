import { db } from "@/_lib/db";
import { fetchUserdata, fetchUsersPostData } from "@/_lib/fetch";

import Link from "next/link";

export default async function ProfilePage() {
  const user = await fetchUserdata();
  const user_id = user.id;
  const posts = await fetchUsersPostData(user_id);

  return (
    <>
      <div className="w-fit flex gap-8 pt-8">
        <div>
          <div>
            <strong>
              <h1 className="text-xl pb-2">{user.username}&apos;s Profile</h1>
            </strong>
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
          </div>
          <div className="mt-6 mb-6">
          <Link
            href="/account/edit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-4"
          >
            Edit profile
          </Link>
        </div>
        </div>
      </div>

      <div>
        <strong>
          <h1 className="text-xl">{user.username}&apos;s Posts</h1>
        </strong>
        <ul className="max-w-screen-lg mx-auto mb-4">
          {posts.map((post) => (
            <li key={post.id} className="py-4 border-b border-zinc-800">
              <div>
                <div className="flex row gap-4">
                  <h3 className="text-3xl">{post.title}</h3>
                  <p>[{post.post_type}]</p>
                </div>

                <p className="text-blue-500">{post.content}</p>
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
        <div className="mt-6 mb-6">
          <Link
            href="/account/starred"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-4"
          >
            Starred Posts
          </Link>
        </div>
      </div>
    </>
  );
}
