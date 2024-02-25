export function processPosts(posts, searchParams, user_town) {
	const getCity = searchParams.get("town");
	const getTag = searchParams.get("tag");
	const getCategory = searchParams.get("category");
	const getSort = searchParams.get("sort");

	let filteredPosts = posts;
	// (getCity, `filter`, getCity !== "all", getCity === "all");
	// Filter by city
	if (getCity && getCity !== "all") {
		filteredPosts = filteredPosts.filter((post) => {
			return post.city?.toLowerCase() === getCity.toLowerCase();
		});
	} else if (getCity && getCity === "all") {
		filteredPosts = posts;
	} else if (!getCity) {
		filteredPosts = filteredPosts.filter((post) => {
			return post.city?.toLowerCase() === user_town.toLowerCase();
		});
	}

	// Filter by tag
	if (getTag) {
		filteredPosts = filteredPosts.filter((post) => {
			return post.tag_content.includes(getTag);
		});
	}

	// Filter by category
	if (getCategory) {
		filteredPosts = filteredPosts.filter((post) => {
			return post.post_type === getCategory;
		});
	}

	// Sort posts
	let sortText = "";
	if (getSort === "pop") {
		filteredPosts.sort((a, b) => b.star_count - a.star_count);
		sortText = "popularity";
	} else if (getSort === "new") {
		filteredPosts.sort(
			(a, b) => new Date(b.created_at) - new Date(a.created_at)
		);
		sortText = "newest";
	} else if (getSort === "old") {
		filteredPosts.sort(
			(a, b) => new Date(a.created_at) - new Date(b.created_at)
		);
		sortText = "oldest";
	} else if (getSort === "comments") {
		filteredPosts.sort((a, b) => b.comment_count - a.comment_count);
		sortText = "comments";
	} else if (getSort === "quiet") {
		filteredPosts.sort((a, b) => a.comment_count - b.comment_count);
		sortText = "quietest";
	}

	return { filteredPosts, sortText };
}

//check if users home town has any posts
export function userTownHasPosts(posts, user_town) {
	if (posts.some((post) => post.city === user_town)) {
		return true;
	} else {
		return false;
	}
}
//check if user is viewing their home town
export function showMyTown(searchParams, user_town) {
	const urlTown = searchParams.get("town");
	if (
		searchParams.has("town") &&
		urlTown?.toLowerCase() !== user_town.toLowerCase()
	) {
		return true;
	}
	return false;
}
