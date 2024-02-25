import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
	const clerk_auth_id = auth().userId;
	clerk, clerk_auth_id;
	try {
		const res = await db.query(`SELECT * FROM users WHERE clerk_auth_id = $1`, [
			clerk_auth_id,
		]);
		const userData = await res.json();
		JSON.stringify(userData);
		return NextResponse.json({ response: body });
	} catch (error) {
		console.error("Error fetching user data:", error);
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

export async function fetchUserdata() {
	const clerk_auth_id = auth().userId;

	try {
		const response = await db.query(
			`SELECT * FROM users WHERE clerk_auth_id = $1`,
			[clerk_auth_id]
		);
		//// (response.rows[0], "fetchUserdata");
		return response.rows[0];
	} catch (error) {
		console.error("Error fetching user data:", error);
	}
}
