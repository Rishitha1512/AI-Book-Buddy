"use client";

import { SignInButton } from "@clerk/nextjs";

export default function AuthButton() {
  return (
    <SignInButton>
      <button
        className="inline-flex items-center justify-center rounded-2xl bg-[#f08a3e] px-6 py-4 text-sm font-medium text-black"
      >
        Sign In
      </button>
    </SignInButton>
  );
}