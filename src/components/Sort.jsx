"use client"
import { useState } from "react";
import Link from "next/link";

export function SortBy({ onSortByRecent, onSortByMostStarred }) {
  const [sortBy, setSortBy] = useState("recent");

  const handleSortByRecent = () => {
    setSortBy("recent");
    onSortByRecent();
  };

  const handleSortByMostStarred = () => {
    setSortBy("starred");
    onSortByMostStarred();
  };

  return (
    <div>
      <h2>Sort By</h2>
      <div>
        <button
          onClick={handleSortByRecent}
        >
          Most Recent
        </button>
        <button
          onClick={handleSortByMostStarred}
        >
          Most Popular
        </button>
      </div>
    </div>
  );
}


// return (
//   <div>
//     <h2>Sort By</h2>
//     <div>
//       <Link href="/dashboard/sort?popularity">
//         Most Popular </Link>
//       <Link href="/dashboard">
//         Most Recent </Link>
//     </div>
//   </div>
// );
// }