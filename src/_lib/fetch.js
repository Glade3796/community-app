const { db } = require("./db");

export async function fetchUserdata(clerk_auth_id) {
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
