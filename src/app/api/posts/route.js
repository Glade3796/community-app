import { NextResponse } from "next/server";

export async function GET() {
	try {
		const res = await db.query(
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
		const postData = await res.json();
		return NextResponse.json(postData);
	} catch (error) {
		console.error("Error fetching town posts:", error);
	}
}

export async function POST() {
	// do the post thing, like insert an item into the database
}

export async function DELETE() {
	// do the delete thing, like delete an item into the database
}

export async function PUT() {
	// do the put thing, like update an item into the database
}
