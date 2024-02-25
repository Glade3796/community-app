import "server-only";
import { getClerkAuth } from "./get-clerk-auth";
import { cache } from "react";
import { db } from "@/_lib/db";
export const preload_user = async (clerk_auth_id) => {
	await getUserData(clerk_auth_id);
};

export const getUserData = cache(async () => {
	const clerk_auth_id = await getClerkAuth();
	const data = await fetchData(clerk_auth_id);

	return data;
});

async function fetchData(clerk_auth_id) {
	const response = await db.query(
		`SELECT * FROM users WHERE clerk_auth_id = $1`,
		[clerk_auth_id]
	);

	return response;
}
