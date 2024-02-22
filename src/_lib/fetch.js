import { auth } from "@clerk/nextjs";
import { db } from "./db";

//returns all userdata from db based on clerk_auth_id
export async function fetchUserdata() {
  const clerk_auth_id = auth().userId;
  try {
    const response = await db.query(
      `SELECT * FROM users WHERE clerk_auth_id = $1`,
      [clerk_auth_id]
    );
    return response.rows[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

//returns all post data from db based on post_id
export async function fetchPostData(post_id) {
  try {
    const response = await db.query(`SELECT * FROM posts WHERE id = $1`, [
      post_id,
    ]);

    return response.rows[0];
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

//returns all the current users post data from db based on user_id
export async function fetchUsersPostData(user_id) {
  try {
    const response = await db.query(`SELECT * FROM posts WHERE user_id = $1`, [
      user_id,
    ]);

    return response.rows;
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

export async function fetchTownPosts(user_town) {
  try {
    const response = await db.query(
      `
    SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, users.username AS posted_by, users.address_city AS city, users.address_postcode AS postcode, posts.show_address AS show_address, tags.content AS tag_content, COUNT(star.id) AS star_count
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN post_tags ON posts.id = post_tags.post_id
    LEFT JOIN tags ON post_tags.tag_id = tags.id
    LEFT JOIN star ON posts.id = star.post_id
    WHERE users.address_city = $1
    GROUP BY posts.id, users.username, tags.content, users.address_city, users.address_postcode
    ORDER BY posts.created_at DESC
    `,
      [user_town]
    );
    return response.rows;
  } catch (error) {
    console.error("Error fetching town posts:", error);
  }
}
