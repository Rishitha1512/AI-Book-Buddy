"use client";

import { useRef, useState } from "react";

type UploadProps = {
	label?: string;
	uploadedLabel?: string;
	switchToUploadedLabel?: boolean;
	className?: string;
	showIcon?: boolean;
};

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

export default function Upload({
	label = "Upload PDF",
	uploadedLabel = "View Full Document",
	switchToUploadedLabel = false,
	className = "",
	showIcon = true,
}: UploadProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState("");
	const buttonLabel = switchToUploadedLabel && fileName ? uploadedLabel : label;

	return (
		<div className={className}>
			<input
				ref={inputRef}
				type="file"
				accept=".pdf"
				className="hidden"
				onChange={(event) => {
					const file = event.target.files?.[0];
					setFileName(file?.name ?? "");
				}}
			/>
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-[#f08a3e] px-6 py-4 text-sm font-medium text-black shadow-[0_0_24px_rgba(240,138,62,0.35)] transition duration-300 hover:scale-[1.02] hover:bg-[#ffa55f]"
			>
				{showIcon ? <UploadIcon /> : null}
				{buttonLabel}
			</button>
			{fileName ? <p className="mt-2 text-xs text-zinc-400">{fileName}</p> : null}
		</div>
	);
}
