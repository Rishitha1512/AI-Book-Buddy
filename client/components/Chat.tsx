"use client";

import { useMemo, useState } from "react";
import Upload from "./Upload";

type Message = {
	role: "assistant" | "user";
	content: string;
	citation?: string;
};

const initialMessages: Message[] = [
	{
		role: "assistant",
		content:
			"According to Section 4: Survival Protocol, the guide recommends a 20% water surplus, redundant beacon gear, and avoiding movement during the hottest part of the day.",
		citation: "Citation: Page 112-114",
	},
	{
		role: "user",
		content: "Does it specify which satellite brands are recommended?",
	},
];

function SendIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
			<path
				d="M4 12h15m0 0-5-5m5 5-5 5"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ClipIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
			<path
				d="M8 12.5 15.5 5a3 3 0 0 1 4.2 4.2L9.4 19.5a5 5 0 1 1-7.1-7.1L13 1.7"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [prompt, setPrompt] = useState("");

	const suggestedQuestions = useMemo(
		() => ["Summarize the section", "Find safety warnings", "Pull exact citations"],
		[]
	);

	const sendMessage = () => {
		const text = prompt.trim();
		if (!text) return;

		setMessages((current) => [...current, { role: "user", content: text }]);
		setPrompt("");
	};

	return (
		<div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
			<header className="flex items-center justify-between rounded-[1.75rem] border border-white/8 bg-black/30 px-5 py-4 backdrop-blur-xl">
				<div>
					<p className="text-sm text-zinc-400">Active Session</p>
					<h1 className="text-xl font-semibold text-white">Sahara_Guide.pdf</h1>
				</div>
				<div className="hidden items-center gap-3 sm:flex">
					<div className="rounded-full border border-[#f4b17d]/25 bg-[#f4b17d]/10 px-3 py-1 text-xs text-[#f4b17d]">Analyzing document</div>
					<Upload label="New Document" className="hidden lg:block" />
				</div>
			</header>

			<div className="mt-4 grid flex-1 gap-4 lg:grid-cols-[300px_1fr]">
				<aside className="rounded-[2rem] border border-white/8 bg-white/4 p-5 backdrop-blur-xl">
					<div className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,159,77,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4">
						<div className="aspect-[3/4] rounded-[1.25rem] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4">
							<div className="flex h-full flex-col justify-between rounded-[1rem] bg-black/45 p-4">
								<div className="space-y-2">
									<div className="h-2 w-16 rounded-full bg-white/15" />
									<div className="h-2 w-28 rounded-full bg-white/10" />
								</div>
								<div>
									<p className="text-sm font-medium text-white">Sahara_Guide.pdf</p>
									<p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">PDF 2.0</p>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-5 space-y-4">
						<div>
							<p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Metadata</p>
							<div className="mt-3 space-y-3 text-sm text-zinc-300">
								<div className="flex items-center justify-between border-b border-white/6 pb-2">
									<span>Pages</span>
									<span className="text-white">342</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/6 pb-2">
									<span>Size</span>
									<span className="text-white">12.4 MB</span>
								</div>
								<div className="flex items-center justify-between border-b border-white/6 pb-2">
									<span>Format</span>
									<span className="text-white">PDF 2.0</span>
								</div>
							</div>
						</div>

						<Upload label="View Full Document" className="w-full" />
					</div>
				</aside>

				<section className="flex min-h-[72vh] flex-col rounded-[2rem] border border-white/8 bg-black/30 p-4 backdrop-blur-xl sm:p-6">
					<div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
						<span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[#f4b17d]">Citation ready</span>
						<span className="rounded-full border border-white/8 bg-white/5 px-3 py-1">Context: safety</span>
						<span className="rounded-full border border-white/8 bg-white/5 px-3 py-1">Dark mode</span>
					</div>

					<div className="flex-1 space-y-5 overflow-y-auto pr-1">
						{messages.map((message, index) => (
							<div
								key={`${message.role}-${index}`}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[min(42rem,100%)] rounded-[1.5rem] border px-5 py-4 text-sm leading-7 shadow-[0_0_30px_rgba(0,0,0,0.15)] transition duration-300 ${
										message.role === "user"
											? "border-[#8f5f42]/60 bg-[#2f231b] text-[#f8e9dd]"
											: "border-white/8 bg-[#14110f] text-zinc-200"
									}`}
								>
									<p>{message.content}</p>
									{message.citation ? (
										<p className="mt-4 inline-flex rounded-full border border-[#8f5f42]/50 bg-[#f4b17d]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f4b17d]">
											{message.citation}
										</p>
									) : null}
								</div>
							</div>
						))}

						<div className="flex items-center gap-3 text-sm text-zinc-400">
							<div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/6 text-[#f4b17d]">
								<span>⋯</span>
							</div>
							<span className="italic">Analyzing document..</span>
						</div>
					</div>

					<div className="mt-5 rounded-[1.75rem] border border-white/8 bg-[#0f0d0c] p-3 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
						<div className="mb-3 flex flex-wrap gap-2 px-1">
							{suggestedQuestions.map((item) => (
								<button
									key={item}
									type="button"
									onClick={() => setPrompt(item)}
									className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-[#f4b17d]/30 hover:text-white"
								>
									{item}
								</button>
							))}
						</div>

						<div className="flex items-end gap-3 rounded-[1.25rem] border border-white/8 bg-black/30 px-4 py-3">
							<button
								type="button"
								className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 text-zinc-400 transition hover:border-[#f4b17d]/30 hover:text-[#f4b17d]"
								aria-label="Attach file"
							>
								<ClipIcon />
							</button>
							<label className="flex-1">
								<span className="sr-only">Ask anything</span>
								<textarea
									value={prompt}
									onChange={(event) => setPrompt(event.target.value)}
									onKeyDown={(event) => {
										if (event.key === "Enter" && !event.shiftKey) {
											event.preventDefault();
											sendMessage();
										}
									}}
									rows={1}
									placeholder="Ask anything about Sahara_Guide.pdf..."
									className="min-h-12 w-full resize-none bg-transparent py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
								/>
							</label>
							<button
								type="button"
								onClick={sendMessage}
								className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f08a3e] text-black transition duration-300 hover:scale-[1.03] hover:bg-[#ffa55f]"
								aria-label="Send message"
							>
								<SendIcon />
							</button>
						</div>
						<p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-zinc-500">
							Powered by BookBuddy AI · Encrypted data session
						</p>
					</div>
				</section>
			</div>

			<footer className="mt-4 flex items-center justify-between px-1 pb-1 text-xs text-zinc-500">
				<span>© 2024 BookBuddy. All rights reserved.</span>
				<span>Terms · Privacy · Support · Contact</span>
			</footer>
		</div>
	);
}
