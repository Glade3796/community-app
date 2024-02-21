"use client"
import { useState } from "react";

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
