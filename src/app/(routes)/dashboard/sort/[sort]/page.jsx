import { DashboardFeed } from '@/components/DashboardFeed';

export default function SortPage({ searchParams, postArray }) {
  
  const sortMethod = searchParams.sort 

  if (!sortMethod) {
    return <DashboardFeed />;
  }

  switch (sortMethod) {
    case "popularity":
      postArray.sort((a, b) => b.star_count - a.star_count);
      break;
    case "newest":
      postArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    default:
      return <DashboardFeed />;
  }

  return (
    <>
      <h1>Sorted by {sortMethod}</h1>
      <DashboardFeed posts={postArray} />
    </>
  );
}
