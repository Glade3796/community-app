"use client";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { TownDropDown } from "./TownDropDown";
import BackToMyTownLink from "@/app/(routes)/dashboard/BackToMyTownLink";
import StarPost from "./StarPost";
import TagFilter from "@/app/(routes)/dashboard/TagFilter";
import EmptyFeed from "./EmptyFeed";
import PostFeed from "@/app/(routes)/dashboard/PostFeed";

Link;
export function DashboardFeed({
  user_town,
  posts,
  user_id,
  user,
  starred_posts,
}) {
  const searchParams = useSearchParams();
  const getSort = searchParams.get("sort");
  const getTown = searchParams.get("town");
  const getTagFilter = searchParams.get("tag");
  const selTown = getTown?.toLowerCase() || user_town;
  const uniqueCities = [...new Set(posts.map((post) => post.city))];

  //check if user's town has posts
  function userTownHasPosts() {
    if (posts.some((post) => post.city === user_town)) {
      return true;
    } else {
      return false;
    }
  }

  //filter logic:
  //filter the town to the selected town
  const townFilterPosts = posts.filter((post) => {
    return post.city?.toLowerCase() === selTown?.toLowerCase();
  });

  //if there is a tag filter, filter the posts to only show posts with that tag
  let filteredPosts = [];
  if (searchParams.has("tag")) {
    filteredPosts = townFilterPosts.filter((post) => {
      return post.tag_content.includes(getTagFilter);
    });
  } else {
    filteredPosts = townFilterPosts;
  }
  //if noPosts are found, show the empty feed component
  function noPosts(filteredPosts) {
    if (filteredPosts.length === 0) {
      return true;
    }
    return false;
  }

  if (getTown === "all") {
    filteredPosts = posts;
  }
  //sort logic
  let sortText = "";
  if (getSort === "pop") {
    filteredPosts.sort((a, b) => b.star_count - a.star_count);
    sortText = "popularity";
  }
  if (getSort === "new") {
    filteredPosts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    sortText = "newest";
  }
  if (getSort === "old") {
    filteredPosts.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    sortText = "oldest";
  }

  // default option is to sort by most recent
  // default shows you posts from your town// town = posts.city

  // if show_address = true, show postcode
  // TODO consider separating posts with a sort function rather than in-query
  // TODO consider adding a limit to the number of posts returned per page
  //show back to my town link if the user is viewing a different town
  function showMyTown() {
    if (searchParams.has("town") && getTown !== user_town.toLowerCase()) {
      return true;
    }
    return false;
  }

  return (
    <>
      {!searchParams.has("town") && <p>My Town: {user_town}</p>}
      {searchParams.has("town") && <p>viewing posts from {getTown}</p>}
      {getTown?.toLowerCase == user_town?.toLowerCase}
      {showMyTown() && <BackToMyTownLink />}
      <TownDropDown cities={uniqueCities} selected={selTown} />
      {searchParams.has("sort") && <p>sorted by {sortText}</p>}
      {/* make this a drop down */}
      <div className="max-w-screen-lg mx-auto p-4 mb-4">
        {noPosts(filteredPosts) ? (
          <EmptyFeed
            hasPosts={userTownHasPosts()}
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
