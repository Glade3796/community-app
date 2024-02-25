/**
 * Default layout component for the application.
 * @param {{children}} - The children components to be rendered within the layout.
 * @returns {JSX.Element} - The layout component JSX.
 */
//force user to make profile layer

import CreateAccount from "@/components/CreateAccount";
import User, { preload } from "@/components/GetUserData";
import { preload_auth } from "@/util/get-clerk-auth";

import React from "react";

export default async function layout({ children }) {
	preload_auth();
	preload();
	const user = await User();

	if (!user) {
		return <CreateAccount />;
	}
	return (
		<main className='flex'>
			{" "}
			<section className='flex-1'>{children}</section>
		</main>
	);
}
