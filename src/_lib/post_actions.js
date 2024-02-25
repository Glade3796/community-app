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
		post_tags,
	} = data;
	"tags", post_tags;
	formData, "formData";
	let post_id = null;
	try {
		// Insert tags into the tags table
		const tagValues = post_tags
			.split(",")
			.map((tag) => ({ content: tag.trim() }));
		const tagInsertQuery = `INSERT INTO tags (content) VALUES ${tagValues
			.map((_, index) => `($${index + 1})`)
			.join(",")}
        ON CONFLICT DO NOTHING`;
		const tagInsertParams = tagValues.map((tag) => tag.content);
		await db.query(tagInsertQuery, tagInsertParams);
		"!!!!!!!!!!", tagValues, "tagValues";
		// Get the inserted tag IDs
		const tagSelectQuery = `SELECT id FROM tags WHERE content = ANY($1)`;
		const tagSelectParams = [tagValues.map((tag) => tag.content)];
		const tagResponse = await db.query(tagSelectQuery, tagSelectParams);
		const tagIds = tagResponse.rows.map((row) => row.id);
		// Insert post into the posts table
		"!!!!!!!!!!", tagIds, "tagids";
		"!!!!!!!!!!",
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
			"tinsetValues";

		const postInsertQuery = `INSERT INTO posts (user_id, post_type, title, content, quantity, frequency, date, available, closed, show_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
		const postInsertParams = [
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
		];
		const postResponse = await db.query(postInsertQuery, postInsertParams);
		post_id = postResponse.rows[0].id;
		post_id, "post_id";
		// Insert tag-post relationships into the tag_post table
		const tagPostInsertQuery = `INSERT INTO post_tags (tag_id, post_id) VALUES ($1, $2)`;
		const tagPostInsertParams = tagIds.map((tagId) => [tagId, post_id]);
		await Promise.all(
			tagPostInsertParams.map((params) => db.query(tagPostInsertQuery, params))
		);
		tagSelectParams;

		data, "added to the database";
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
		"Edited pos -->", title;
		const response = await db.query(
			`UPDATE posts SET user_id=$1, post_type=$2, title=$3, content=$4, quantity=$5, frequency=$6, date=$7, available=$8, closed=$9, show_address=$10 WHERE id=$11`,
			[
				+user_id,
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
