/**
 * The `DashboardPage` function fetches posts, tags, and starred posts, then displays a dashboard page
 * with sorting options, category filter, tag box, and a feed of posts.
 * @returns The `DashboardPage` function is returning JSX elements that make up the dashboard page
 * layout. It includes components like `SortByNav`, `CategoryFilter`, `TagBox`, a link to share a post,
 * and `DashboardFeed`. The function fetches data asynchronously for posts, tags, and starred posts,
 * and then renders the dashboard page with the fetched data. If there is an error during the
 */
//dashboard page
import { fetchAllPosts, fetchTags, fetchUsersStarredPosts } from "@/_lib/fetch";
import CategoryFilter from "@/components/CategoryFilter";
import DashboardFeed from "@/components/DashboardFeed";
import User, { preload } from "@/components/GetUserData";
import SortByNav from "@/components/Sort";
import TagBox from "@/components/TagBox";
import { preload_auth } from "@/util/get-clerk-auth";

import Link from "next/link";
import { Suspense } from "react";

async function getAllPosts() {
	try {
		const posts = await fetchAllPosts();
		return posts.rows;
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

async function getTags() {
	try {
		const tags = await fetchTags();
		return tags.rows;
	} catch (error) {
		console.error("Error fetching tags:", error);
		return [];
	}
}

async function getStarredPosts() {
	try {
		const starredPosts = await fetchUsersStarredPosts();
		return starredPosts;
	} catch (error) {
		console.error("Error fetching starred posts:", error);
		return [];
	}
}

export default async function DashboardPage({}) {
	try {
		preload_auth();
		preload();
		const user = await User();
		const [posts, tags, starredPosts] = await Promise.all([
			getAllPosts(),
			getTags(),
			getStarredPosts(),
		]);

		const user_id = user ? user.id : null;
		const user_town = user ? user.address_city : null;

		return (
			<div>
				<SortByNav />
				<Suspense fallback={<p>Loading categories...</p>}>
					<CategoryFilter />
				</Suspense>
				<Suspense fallback={<p>Loading tags...</p>}>
					<TagBox tags={tags} />
				</Suspense>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Link
						href='/post/add'
						className='bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-4 border border-green-500 m-5'
					>
						Share a post
					</Link>
					<Suspense fallback={<p>Loading feed....</p>}>
						<DashboardFeed
							user={user}
							user_id={user_id}
							posts={posts}
							user_town={user_town}
							starred_posts={starredPosts}
						/>
					</Suspense>
				</div>
			</div>
		);
	} catch (error) {
		console.error("Error in DashboardPage:", error);

		return null;
	}
}
