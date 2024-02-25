"use client";
import useQueryString from "@/app/hooks/useQueryString";
import { selectedCat } from "@/util/LinkActions";

import { categoryTypesArr } from "@/util/misc";
import Link from "next/link";

export default function CategoryFilter() {
	const { removeQueryString, setQueryString, searchParams } = useQueryString();

	const types = categoryTypesArr();

	const query = searchParams.get("category");

	return (
		<div className='flex gap-4'>
			<Link
				href={
					searchParams.has("category")
						? removeQueryString("category")
						: setQueryString
				}
				className={
					!searchParams.has("category")
						? "font-bold text-white hover:cursor-pointer bg-blue-500 px-2 py-1 rounded-md transform transition-transform duration-200 hover:scale-105 hover:bg-blue-600"
						: "text-gray-500 hover:cursor-pointer px-2 py-1 rounded-md transform transition-transform duration-200 hover:scale-105 hover:text-blue-600"
				}
			>
				♾️ All post types
			</Link>{" "}
			<nav>
				{types.map((type, i) => (
					<Link
						href={
							query == type.name
								? removeQueryString("category")
								: setQueryString("category", type.name)
						}
						key={i + type}
					>
						<span
							className={`hover:cursor-pointer ${
								selectedCat(type.name, query)
									? "font-bold text-white bg-blue-500 px-2 py-1 rounded-md transform transition-transform duration-200 hover:scale-105 hover:bg-blue-600"
									: "text-gray-500  px-2 py-1 rounded-md transform transition-transform duration-200 hover:scale-105 hover:text-blue-600"
							}`}
						>
							{type.icon} {type.name} {type.icon}
						</span>{" "}
					</Link>
				))}
			</nav>
		</div>
	);
}
