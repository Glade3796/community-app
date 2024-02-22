import { fetchPostData, fetchUserdata } from "@/_lib/fetch";

import EditPostForm from "./EditPostForm";

export default async function EditPost({ params }) {
  const { post_id } = params;

  const post = await fetchPostData(post_id);
  const user = await fetchUserdata();

  return (
    <div>
      <h1>Edit Post</h1>
      {user.id !== post.user_id ? (
        <p> You are not the author of this post</p>
      ) : (
        <EditPostForm post={post} user_id={user.id} />
      )}
    </div>
  );
}
