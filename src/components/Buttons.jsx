//Button components: "save", "submit" and "upvote" buttons
"use client";

import { useFormStatus } from "react-dom";

//save button
export function SaveButton() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>{pending ? `Saving...` : `Save`}</button>;
}

//submit button
export function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {pending ? `Creating...` : `Create account`}
    </button>
  );
}

//delete button
export function UpvoteBtn() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>{pending ? `Voting...` : `Upvote`}</button>;
}

//recover button
export function RecoverBtn() {
  return (
    <button
      onClick={
        // Attempt to recover by trying to re-render the segment
        () => reset()
      }
      className="border rounded border-zinc-600 px-3 py-2 hover:bg-pink-400 hover:text-black"
    >
      Go back
    </button>
  );
}
