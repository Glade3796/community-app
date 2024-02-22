import {
  fetchAllPosts,
  fetchUserdata,
  fetchUsersStarredPosts,
} from "@/_lib/fetch";
import { DashboardFeed } from "@/components/DashboardFeed";
import SortByNav from "@/components/Sort";
import Link from "next/link";

export default async function DashboardPage({}) {
  const user = await fetchUserdata();
  const user_id = user.id;
  const user_town = user.address_city;
  const posts = await fetchAllPosts();
  const starredPosts = await fetchUsersStarredPosts();


  return (
    <div>
      <SortByNav />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link
          href="/post/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-4"
          style={{ alignSelf: "flex-end" }}
        >
          Share a post
        </Link>
        <DashboardFeed
          user={user}
          user_id={user_id}
          posts={posts}
          user_town={user_town}
          starred_posts={starredPosts}
        />
      </div>
    </div>
  );
}
