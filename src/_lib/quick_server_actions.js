"use server";
"use strict";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { redirect } from "next/navigation";

export async function openClosePost(formData) {
	const { post_id, isClosed } = Object.fromEntries(formData);
	("database start");
	"db rec", isClosed, typeof isClosed;
	function reverseClose(isClosed) {
		"reverseClose", isClosed;
		if (isClosed === "true") {
			"rc returns", isClosed;
			return true;
		} else if (isClosed === "false") {
			return false;
		} else if (isClosed === "null" || "undefined") {
			return false;
		}
	}
	let closed = reverseClose(isClosed);
	// verboase due to  errors
	"db submitting", closed, typeof closed, post_id;
	try {
		const res = await db.query(
			`
        UPDATE posts
        SET closed = $1
        WHERE id = $2 RETURNING *
        `,
			[closed, post_id]
		);
		"!!!", res.rows[0].closed, "db res";
	} catch (error) {
		console.error("Error opening/closing post|", error);
	} finally {
		revalidatePath(`/post/${post_id}`);
	}
}

export async function quickAvaialableAction(formData) {
	const { post_id, available } = Object.fromEntries(formData);
	post_id, available, "quickAvaialableAction";
	const res = await db.query(
		`
    UPDATE posts
    SET available = $1
    WHERE id = $2 RETURNING *
    `,
		[available, post_id]
	);
	revalidatePath(`/post/${post_id}`);
}
export async function deletePost(post_id) {
	try {
		await db.query(`DELETE FROM posts WHERE id = $1`, [post_id]);
		"||", post_id, ":  deleted";
	} catch (error) {
		console.error("Error deleting post|", error);
	}
}
export async function quickDeleteAction(formData) {
	const { post_id, user_id, post, reason } = Object.fromEntries(formData);
	post;
	const postJSON = JSON.parse(post);
	"deleting", post_id;
	try {
		const res = await db.query(
			`INSERT INTO deletions (user_id, post, reason) VALUES ($1, $2, $3)`,
			[user_id, postJSON, reason]
		);
	} catch (error) {
		console.error("Error storing deletion|", error);
	} finally {
		deletePost(post_id);
		redirect("/dashboard");
	}
}

export async function quickQuantityAction(formData) {
	const { post_id, isInc } = Object.fromEntries(formData);
	formData;
	const inc = isInc === "true";
	post_id, isInc, "quickQuantityAction";

	inc, "quickQuantityAction";
	inc, "neg";
	if (inc) {
		typeof post_id;
		("inc");
		const res = await db.query(
			`
      UPDATE posts
      SET quantity = quantity + 1
      WHERE id = $1 RETURNING *
      `,
			[+post_id]
		);
		//  ("res", res.rows[0]);
	} else {
		"dec", post_id;
		await db.query(
			`
      UPDATE posts
      SET quantity = quantity - 1
      WHERE id = $1
      `,
			[+post_id]
		);
	}
	revalidatePath(`/post/${post_id}`);
}
export async function QuickHideAddressAction(formData) {
	const { post_id, show_address } = Object.fromEntries(formData);
	const res = await db.query(
		`
    UPDATE posts
    SET show_address = $1
    WHERE id = $2 RETURNING *
    `,
		[show_address, post_id]
	);
	revalidatePath(`/post/${post_id}`);
}
