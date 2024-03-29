"use client";

import { RecoverBtn } from "@/components/Buttons";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const text = error.message;
  return (
    <div className="flex flex-col justify-center items-center gap-4 m-4 ">
      <p className="border border-white p-4">{text}</p>
      <p>
        Don&apos;t worry though, go back and try again, if the error persists
        let us know at help@community-app.com
      </p>
      <RecoverBtn reset={reset}/>
    </div>
  );
}
