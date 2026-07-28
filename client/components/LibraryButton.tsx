"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function NewDocumentButton() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
<Link
  href="/library"
  className="rounded-full bg-[#f08a3e] px-4 py-2 text-sm font-medium text-black shadow-[0_0_24px_rgba(240,138,62,0.35)] transition duration-300 hover:scale-[1.03] hover:bg-[#ffa55f]"
>
  Library
</Link>
    );
  }

  return (
<SignInButton forceRedirectUrl="/library">
  <button
    className="rounded-full bg-[#f08a3e] px-4 py-2 text-sm font-medium text-black shadow-[0_0_24px_rgba(240,138,62,0.35)] transition duration-300 hover:scale-[1.03] hover:bg-[#ffa55f]"
  >
    Library
  </button>
</SignInButton>
  );
}