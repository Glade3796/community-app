/**
 * Component to display when the feed is empty.
 * Shows different messages based on whether there are posts,
 * but none match the filters, or there are no posts at all.
 * Allows clearing filter query params to broaden results.
 */
import useQueryString from "@/app/hooks/useQueryString";
import { categoryTypesArr } from "@/util/misc";
import Link from "next/link";

export default function EmptyFeed({ hasPosts, tag, town }) {
	const { removeQueryString, searchParams, setQueryString } = useQueryString();

	const type = categoryTypesArr();
	function catIcon() {
		const urlCat = searchParams.get("category");
		const selCat = type.find((type) => type.name === urlCat);
		return selCat ? selCat.icon : null;
	}

	return (
		<div>
			{!hasPosts && (
				<>
					<h1>No posts near you</h1>
					<Link href='/dashboard/post/add' className='hover:text-blue-500'>
						Be the first to addd a post
					</Link>
				</>
			)}
			{hasPosts && (
				<>
					<h1>No posts</h1>
					<p>try removing some filters</p>
				</>
			)}
			<ul>
				{tag && (
					<li>
						<Link href={removeQueryString("tag")} className='group'>
							Clear
							<span className='group-hover:text-red-500 font-bold'>
								#{searchParams.get("tag")}
							</span>
							filter
						</Link>
					</li>
				)}
				{tag && (
					<li>
						<Link href={removeQueryString("category")}>
							Clear
							<span className='group-hover:text-red-500 font-bold'>
								{catIcon()} - {searchParams.get("category")}
							</span>
							filter
						</Link>
					</li>
				)}
				{town && (
					<li>
						<Link href={removeQueryString("town")}>
							Back to
							<span className='group-hover:text-red-500 font-bold'>
								my town
							</span>
						</Link>
					</li>
				)}

				<li>
					<Link href={setQueryString("town", "all")}>
						View
						<span className='group-hover:text-blue-500 font-bold'>ALL</span>
						posts
					</Link>
				</li>
			</ul>
		</div>
	);
}
