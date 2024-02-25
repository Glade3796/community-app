import { getClerkAuth, preload_auth } from "@/util/get-clerk-auth";
import { getUserData, preload_user } from "@/util/get-user-data";
import { unstable_cache } from "next/cache";

export const preload = async () => {
	await User();
};

const getCachedUser = unstable_cache(
	async (clerk_auth_id) => getUserData(clerk_auth_id),
	["clerk-auth-id-user"]
);

export default async function User() {
	preload_auth();
	preload_user();

	const clerk_auth_id = await getClerkAuth();
	const user = await getCachedUser(clerk_auth_id);

	if (user) {
		user.clerk_auth_id = clerk_auth_id;
	}

	return user;
}
