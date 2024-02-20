import { LikeBtn } from "./Buttons";

export default async function LikePost({ postId, userId }) {
 
  async function like() {
    "use server"
    if (!postId || !userId) {
      throw new Error("Both postId and userId are required.");} 
      try {    await db.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = $1",
    [postId]);
   return { success: true, message: "Post liked successfully." };
  } catch (error) {
      console.error("Error liking post:", error.message);
      throw new Error("Failed to like the post. Please try again later.");
  }
}

return (<div><form action={like}><LikeBtn label="👍"></LikeBtn></form></div>)
}
