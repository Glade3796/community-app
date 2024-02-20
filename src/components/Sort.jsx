"use client"
import { useState } from "react";

export function SortBy({ onSortByRecent, onSortByMostLiked }) {
  const [sortBy, setSortBy] = useState("recent");

  const handleSortByRecent = () => {
    setSortBy("recent");
    onSortByRecent();
  };

  const handleSortByMostLiked = () => {
    setSortBy("liked");
    onSortByMostLiked();
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
          onClick={handleSortByMostLiked}
        >
          Most Liked
        </button>
      </div>
    </div>
  );
}
