"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { redirect } from "next/navigation";

export async function fetchCommentForPost(parent_comment_id) {
	const post_id = 4;
	if (!isNaN(post_id)) {
		return;
	} else {
		try {
			const commentQuery = `SELECT comments.id, comments.content, comments.user_id, comments.post_id, comments.parent_comment_id, users.username AS username 
    FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = $1 AND comments.parent_comment_id ${
			!!parent_comment_id ? `= $2` : `IS NULL`
		}`;
			const commentArgs = [`${post_id}`];
			!!parent_comment_id;

			if (!!parent_comment_id) {
				commentArgs.push(`${parent_comment_id}`);
			}
			commentArgs, "commentArgs";
			const res = await db.query(commentQuery, commentArgs);
			"res", res.rows;
			return res.rows;
		} catch (error) {
			console.error("Error fetching comments:", error);
		}
	}
}

export async function addComment(formData) {
	const { user_id, post_id, parent_comment_id, content } = Object.fromEntries(
		formData.entries()
	);

	// const pci = isNaN(parent_comment_id) ? null : parent_comment_id * 1;
	await db.query(
		`INSERT INTO comments (user_id, post_id, parent_comment_id, content) VALUES ($1, $2, $3, $4)`,
		[+user_id, +post_id, parent_comment_id || null, content]
	);
	revalidatePath(`/post/${post_id}`);
	redirect(`/post/${post_id}`);
}

// export async function fetchCommentForPost(post_id, parent_comment_id) {
//    ("fetchCommentForPost", post_id, parent_comment_id);
//   try {
//     const commentQuery = `SELECT *, users.username AS username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = $1 AND parent_comment_id ${
//       parent_comment_id ? `= $2` : `IS NULL`
//     }`;
//     const commentArgs = [post_id];

//     if (parent_comment_id) {
//       commentArgs.push(parent_comment_id);
//     }
//     const res = await db.query(commentQuery, commentArgs);
//      ("res", res.rowCount);
//     return res.rows;
//   } catch (error) {
//     console.error("Error fetching comments|", error);
//   }
// }
