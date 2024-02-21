import { fetchPostData, fetchUserdata } from "@/_lib/fetch";
import { auth } from "@clerk/nextjs";
import db from "@/_lib/db";
import EditPostForm from "./EditPostForm";

export async function getPosts(post_id) {
  const response = await fetchPostData(post_id);
  return response;
}

export async function getUserId() {
  const clerk_auth_id = auth().userId;
  const response = await fetchUserdata(clerk_auth_id);

  return response.id;
}

export default async function EditPostage({ params }) {
  const { post_id } = params;

  const postData = getPosts(post_id);
  const user_idData = getUserId();

  const [post, user_id] = await Promise.all([postData, user_idData]);

  return (
    <div>
      <h1>Edit Post</h1>
      {user_id !== post.user_id ? (
        <p> You are not the author of this post</p>
      ) : (
        <EditPostForm post={post} user_id={user_id} />
      )}
    </div>
  );
}
