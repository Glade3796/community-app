"use server";

import { db } from "@/_lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//* create post action
export async function createPost(formData) {
  const data = Object.fromEntries(formData.entries());
  // destructure the form data
  const {
    user_id,
    post_type,
    title,
    content,
    quantity,
    frequency,
    date,
    available,
    closed,
    show_address,
  } = data;
  try {
    console.log(data, "added to the database");
    const response = await db.query(
      `INSERT INTO posts (user_id, post_type, title, content, quantity, frequency, date, available, closed, show_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [
        user_id,
        post_type,
        title,
        content,
        quantity,
        frequency,
        date,
        available,
        closed,
        show_address,
      ]
    );
    post_id = response.rows[0].id;
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    redirect(`/post/${post_id}`);
  }
}


//* edit post action
export async function editPost(formData) {
  const {
    user_id,
    post_type,
    title,
    content,
    quantity,
    frequency,
    date,
    available,
    closed,
    show_address,
    id,
  } = Object.fromEntries(formData.entries());

  // console log data (server side)
  try {
    console.log("Edited pos -->", title);
    const response = await db.query(
      `UPDATE posts SET user_id=$1, post_type=$2, title=$3, content=$4, quantity=$5, frequency=$6, date=$7, available=$8, closed=$9, show_address=$10 WHERE id=$11`,
      [
        user_id,
        post_type,
        title,
        content,
        quantity,
        frequency,
        date,
        available,
        closed,
        show_address,
        id,
      ]
    );
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    redirect(`/post/${id}`);
  }
}
