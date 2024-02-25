import { auth } from "@clerk/nextjs";
import { cache } from "react";
import "server-only";

export const preload_auth = () => {
	void getClerkAuth();
};

export const getClerkAuth = cache(async () => {
	const data = auth().userId;
	data, "clerk_auth_id";
	const response = data;

	return response;
});
