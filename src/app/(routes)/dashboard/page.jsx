import { DashboardFeed } from "@/components/DashboardFeed";
import SortByNav from "@/components/Sort";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <SortByNav />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href="/post/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 mt-4" style={{ alignSelf: 'flex-end' }}>Share a post</Link>
        <DashboardFeed />
      </div>
    </div>
  );
}
