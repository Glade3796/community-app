/**
 * DashboardFeed component displays the feed of posts based on the user's town and search parameters.
 * @param {{string}} user_town - The town of the user.
 * @param {{array}} posts - The array of posts to display.
 * @param {{string}} user_id - The ID of the user.
 * @param {{object}} user - The user object.
 * @param {{array}} starred_posts - The array of starred posts.
 * @returns JSX element displaying the dashboard feed.
 */
"use client";

import { useSearchParams } from "next/navigation";
import { TownDropDown } from "./TownDropDown";
import BackToMyTownLink from "@/components/BackToMyTownLink";
import EmptyFeed from "./EmptyFeed";
import PostFeed from "@/components/PostFeed";
import {
	processPosts,
	showMyTown,
	userTownHasPosts,
} from "@/util/dashboard_util";

export default function DashboardFeed({
	user_town,
	posts,
	user_id,
	user,
	starred_posts,
}) {
	const searchParams = useSearchParams();

	const getTown = searchParams.get("town");
	const getTagFilter = searchParams.get("tag");
	const selTown = getTown?.toLowerCase() || user_town;
	const uniqueCities = [...new Set(posts.map((post) => post.city))];

	const { filteredPosts, sortText } = processPosts(
		posts,
		searchParams,
		user_town
	);

	return (
		<>
     <div className="text-center w-630">
			{!searchParams.has("town") && <p>My Town: {user_town}</p>}
			{searchParams.has("town") && <p>viewing posts from {getTown}</p>}
			{getTown?.toLowerCase == user_town?.toLowerCase}
			{showMyTown(searchParams, user_town) && <BackToMyTownLink />}
      </div>
			<TownDropDown cities={uniqueCities} selected={selTown} />
			{searchParams.has("sort") && <p>sorted by {sortText}</p>}
			{/* make this a drop down */}
			<div className='max-w-screen-lg mx-auto p-4 mb-4'>
				{filteredPosts.length === 0 ? (
					<EmptyFeed
						hasPosts={userTownHasPosts(posts, user_town)}
						tag={getTagFilter}
						town={getTown}
					/>
				) : (
					<PostFeed
						getTown={getTown}
						posts={filteredPosts}
						starred_posts={starred_posts}
						user_id={user_id}
					/>
				)}
			</div>
		</>
	);
}
