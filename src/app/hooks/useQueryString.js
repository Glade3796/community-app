"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
//first custom hook

export default function useQueryString() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const removeQueryString = useCallback(
		(name) => {
			const params = new URLSearchParams(searchParams);
			params.delete(name);
			const route = pathname + "?" + params.toString();
			router.push(route);

			return route;
		},
		[searchParams, pathname, router]
	);

	const setQueryString = useCallback(
		(name, value) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);
			const route = pathname + "?" + params.toString();
			router.push(route);
			params.toString(), pathname, "params";
			return route;
		},
		[searchParams, pathname, router]
	);

	return { removeQueryString, setQueryString, router, pathname, searchParams };
}

export function CategoryLink({ type, icon }) {
	const { setQueryString } = useQueryString();

	return (
		<div
			className='opacity-50 hover:opacity-100 hover:text-blue-500 hover:outline hover:outline-blue-500'
			onClick={setQueryString("category", type)}
		>
			{icon} - {type}
		</div>
	);
}
