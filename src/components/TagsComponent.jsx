import useQueryString from "@/app/hooks/useQueryString";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import Link from "next/link";

function geURL_janky(newTag) {
	newTag = "hello";
	const headersList = headers();
	headersList;
	const referer = headersList.get("referer");
	if (referer) {
		const request = new NextRequest(referer);
		request.nextUrl.pathname;
		request.nextUrl.searchParams, "janky";
		const searchParams = new URLSearchParams(request.nextUrl.searchParams);
		searchParams.set("tag", newTag);
		const urlString = `${request.nextUrl.pathname}?${searchParams.toString()}`;
		console.log(urlString, "urlString");
		return;
	}
}
export default function TagsComponent({ tags }) {
	return (
		<div>
			{tags.length > 0 ? (
				tags.map((tag, index) => (
					<Link
						key={index}
						// onClick={setQueryString("tag", tag)}
						className='inline-block m-2 p-2 rounded-md bg-gray-200 text-gray-700 no-underline transition duration-300 hover:bg-gray-300'
					>
						#{tag}
					</Link>
				))
			) : (
				<p>No tags</p>
			)}
		</div>
	);
}
