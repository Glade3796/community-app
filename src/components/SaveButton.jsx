"use client";

import { useFormStatus } from "react-dom";

export function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
    >
      {pending ? `Saving...` : `Save`}
    </button>
  );
  }