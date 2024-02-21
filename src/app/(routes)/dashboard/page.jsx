import { DashboardFeed } from "@/components/DashboardFeed";
import SortByNav from "@/components/Sort";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <SortByNav />
      <DashboardFeed />
    </div>
  );
}
