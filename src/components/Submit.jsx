"use client";

import { useFormStatus } from "react-dom";

export function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="col-span-2 w-1/3 bg-green-950 hover:bg-green-400 justify-self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {pending ? `Creating...` : `Create account`}
    </button>
  );
}
