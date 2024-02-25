import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { notFound, redirect } from "next/navigation";

//returns all userdata from db based on clerk_auth_id
// export async function fetchUserdata() {
//   const clerk_auth_id = auth().userId;
//    (clerk_auth_id, "clerk_auth_id fetch");
//   try {
//     const response = await db.query(
//       `SELECT * FROM users WHERE clerk_auth_id = $1`,
//       [clerk_auth_id]
//     );
//     //// (response.rows[0], "fetchUserdata");
//     return response.rows[0];
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// }

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
export async function fetchAllPosts() {
	try {
		const response = await db.query(
			`SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, users.username AS posted_by, users.address_city AS city, users.address_postcode AS postcode, posts.show_address AS show_address, posts.post_type, ARRAY_AGG(tags.content) AS tag_content, COUNT(star.id) AS star_count, COUNT(comments.id) AS comment_count
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN post_tags ON posts.id = post_tags.post_id
      LEFT JOIN tags ON post_tags.tag_id = tags.id
      LEFT JOIN star ON posts.id = star.post_id
      LEFT JOIN comments ON posts.id = comments.post_id
      GROUP BY posts.id, users.username, users.address_city, users.address_postcode
      ORDER BY posts.created_at DESC`
		);
		return response.rows;
	} catch (error) {
		console.error("Error fetching town posts:", error);
	}
}

export async function fetchSinglePost(post_id) {
	post_id = 4; //!

	let response = null;
	try {
		response = await db.query(
			`SELECT
      posts.*, COALESCE(SUM(star.val),0) AS star_count, ARRAY_AGG(DISTINCT tags.content) AS tags, users.username AS posted_by, users.address_city AS city, users.address_postcode AS postcode, users.id AS user_id
    FROM
      posts
      LEFT JOIN star ON posts.id = star.post_id
      JOIN post_tags ON posts.id = post_tags.post_id
      JOIN tags ON tags.id = post_tags.tag_id
      JOIN users ON posts.user_id = users.id
    WHERE
      posts.id = $1
    GROUP BY
      posts.id, users.username, users.address_city, users.address_postcode, users.id
    
      `,
			[post_id]
		);
		response;
		return response?.rows[0];
	} catch (error) {
		console.error("Error fetching single posts:", error);
	} finally {
		// // (response, "final es");
		if (response?.rowCount === 0) {
			redirect(`/post/dashboard`);
		}
		return response.rows[0];
	}
}

export async function fetchUsersStarredPosts() {
	const clerk_auth_id = auth().userId;
	try {
		const response = await db.query(
			`SELECT * FROM star WHERE user_id = (SELECT id FROM users WHERE clerk_auth_id = $1)`,
			//   `
			// SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, users.username AS posted_by, users.address_city AS city, users.address_postcode AS postcode, posts.show_address AS show_address, tags.content AS tag_content, COUNT(star.id) AS star_count
			// FROM posts
			// JOIN users ON posts.user_id = users.id
			// LEFT JOIN post_tags ON posts.id = post_tags.post_id
			// LEFT JOIN tags ON post_tags.tag_id = tags.id
			// LEFT JOIN star ON posts.id = star.post_id
			// WHERE star.user_id = (SELECT id FROM users WHERE clerk_auth_id = $1)
			// GROUP BY posts.id, users.username, tags.content, users.address_city, users.address_postcode
			// ORDER BY posts.created_at DESC
			// `,
			[clerk_auth_id]
		);
		return response.rows;
	} catch (error) {
		console.error("Error fetching starred posts:", error);
	}
}

export async function fetchDeletions(post_id) {
	if (isNaN(post_id)) {
		redirect(`/dashboard`);
	}
	//check if post exist in db
	const res = await db.query(`SELECT id FROM posts WHERE id = $1`, [post_id]);
	if (res.rowCount > 0) {
		//if it does redirect there
		redirect(`/post/${post_id}`);
	} else {
		//if it doesn't check if it's been deleted
		const delRes = await db.query(
			`SELECT * FROM deletions WHERE post->>'id' = $1`,
			[post_id]
		);
		if (delRes.rowCount > 0) {
			//if it has return that data
			return delRes.rows[0];
			//if not throw 404
		} else redirect(`/dashboard`);
	}
}
export async function fetchTags() {
	try {
		const response = await db.query(`SELECT * FROM tags`);
		return response.rows;
	} catch (error) {
		console.error("Error fetching tags:", error);
	}
}
