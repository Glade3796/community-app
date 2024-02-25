"use client";

import useQueryString from "@/app/hooks/useQueryString";
import Link from "next/link";

export default function SortByNav() {
	const { searchParams, removeQueryString, setQueryString } = useQueryString();

	function selectedClass(sort) {
		if (searchParams.get("sort") === sort?.toString()) {
			return "font-bold text-blue-500";
		}
	}
	const isSort = searchParams.has("sort");
	return (
		<div>
			<h2>Sort By</h2>
			<nav className='flex gap-4'>
				<Link
					href={removeQueryString("sort")}
					className={!isSort && "font-bold text-blue-500"}
				>
					Default
				</Link>
				<Link href={setQueryString("sort", "popularity")}>Popularity</Link>

				<Link
					href={setQueryString("sort", "comments")}
					className={selectedClass("comments")}
				>
					Comments
				</Link>
				<Link
					href={setQueryString("sort", "quiet")}
					className={selectedClass("quiet")}
				>
					Quietest
				</Link>
				<Link
					href={setQueryString("sort", "new")}
					className={selectedClass("new")}
				>
					Newest
				</Link>
				<Link
					href={setQueryString("sort", "old")}
					className={selectedClass("old")}
				>
					Oldest
				</Link>
			</nav>
		</div>
	);
}
