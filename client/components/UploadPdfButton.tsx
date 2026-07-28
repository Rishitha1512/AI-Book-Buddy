"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M12 16V4m0 0-4 4m4-4 4 4M5 16.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UploadPdfButton() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <Link
        href="/chat"
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#8f5f42] bg-transparent px-6 py-4 text-sm font-medium text-[#f4b17d] transition duration-300 hover:border-[#f4b17d] hover:bg-white/5 hover:shadow-[0_0_30px_rgba(244,177,125,0.12)]"
      >
        <UploadIcon />
        Upload PDF
      </Link>
    );
  }

  return (
    <SignInButton forceRedirectUrl="/chat">
      <button
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#8f5f42] bg-transparent px-6 py-4 text-sm font-medium text-[#f4b17d] transition duration-300 hover:border-[#f4b17d] hover:bg-white/5 hover:shadow-[0_0_30px_rgba(244,177,125,0.12)]"
      >
        <UploadIcon />
        Upload PDF
      </button>
    </SignInButton>
  );
}