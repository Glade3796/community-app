//Button components: "save", "submit", "add post", "upvote" and "recover" buttons
"use client";

import { useFormStatus } from "react-dom";

//save button
export function SaveButton() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>{pending ? `Saving...` : `Save`}</button>;
}

//create profile button
export function CreateProfBtn() {
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

//update button
export function UpdateProfBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {pending ? `Updating...` : `Update Profile`}
    </button>
  );
}

//add post button
export function AddPostBtn({ disableBtn }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disableBtn}
      className="col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? `Posting...` : `Post it!`}
    </button>
  );
}

//upvote button
export function StarBtn() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>{pending ? `liking...` : `⭐`}</button>;
}

//recover button
export function RecoverBtn({ reset }) {
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
