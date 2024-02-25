"use server";
import { db } from "@/_lib/db.js";
import { revalidatePath } from "next/cache";

export async function StarPostServerAction(formData) {
  const data = Object.fromEntries(formData.entries());
  const { postId, userId } = data;

  if (!postId || !userId) {
    throw new Error("Both postId and userId are required.");
  }
  try {
    await db.query(
      "INSERT INTO star (user_id, post_id, star_type) VALUES ($1, $2, 'post')",
      [userId, postId]
    );
    revalidatePath(`/dashboard`);

    return { success: true, message: "Post starred successfully." };
  } catch (error) {
    console.error("Error starring post:", error.message);
    throw new Error("Failed to star the post. Please try again later.");
  }
}
