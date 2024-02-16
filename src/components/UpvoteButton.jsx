"use client";

import { useFormStatus } from "react-dom";

export function UpvoteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
    >
      {pending ? `Voting...` : `Upvote`}
    </button>
  );
  }