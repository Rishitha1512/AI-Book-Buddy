import Link from "next/link";
import Image from "next/image";
import Upload from "@/components/Upload";
import { Brain, Zap, FileText } from "lucide-react";

const features = [
	{
		title: "Smart Analysis",
		description:
			"Advanced AI extracts semantic meaning, identifying key themes and connections across your library.",
		icon: "💡",
	},
	{
		title: "Instant Answers",
		description:
			"Get precise citations and detailed explanations in seconds, no matter the length of your document.",
		icon: "⚡",
	},
	{
		title: "PDF Support",
		description:
			"Seamlessly process textbooks, research papers, and complex reports with preserved context and formatting.",
		icon: "📄",
	},
];

function SparkIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
			<path
				d="M12 2l1.9 5.4L19 9.3l-5.1 1.8L12 16l-1.9-4.9L5 9.3l5.1-1.9L12 2Z"
				fill="currentColor"
			/>
			<path
				d="M5 15l1 2.7L8.8 19l-2.8 1-1 2.7-1-2.7-2.8-1 2.8-1.3L5 15Zm14-1 1.2 3.2 3.2 1.2-3.2 1.2L19 23l-1.2-3.4-3.2-1.2 3.2-1.2L19 14Z"
				fill="currentColor"
				opacity="0.75"
			/>
		</svg>
	);
}

function ArrowRightIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
			<path
				d="M5 12h13m0 0-5-5m5 5-5 5"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default function HomePage() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[#0b0a09] text-zinc-100">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div
					className="absolute left-1/2 top-[-12rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#ff9f4d]/20 blur-3xl"
					style={{ animation: "float-slow 16s ease-in-out infinite" }}
				/>
				<div
					className="absolute left-[-10rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-[#8f5f42]/20 blur-3xl"
					style={{ animation: "drift 22s ease-in-out infinite alternate" }}
				/>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,166,77,0.10),transparent_35%),radial-gradient(circle_at_bottom,rgba(114,72,45,0.18),transparent_40%)]" />
				<div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />
			</div>

			<header className="relative z-10 border-b border-white/8 bg-black/20 backdrop-blur-xl">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
					<Link href="/" className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-[#f4b17d]">
						<Image
							src="/screen.png"
							alt="BookBuddy logo"
							width={36}
							height={36}
							className="rounded-md border border-white/10"
						/>
						<span>BookBuddy</span>
					</Link>
					{/* center intentionally left empty for a clean header */}
					<Link
						href="/chat"
						className="rounded-full bg-[#f08a3e] px-4 py-2 text-sm font-medium text-black shadow-[0_0_24px_rgba(240,138,62,0.35)] transition duration-300 hover:scale-[1.03] hover:bg-[#ffa55f]"
					>
						New Document
					</Link>
				</div>
			</header>

			<section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-5 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto flex max-w-3xl flex-col items-center text-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-[#8f5f42]/60 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#f4b17d] shadow-[0_0_24px_rgba(255,159,77,0.12)]">
						<SparkIcon />
						Intellectual evolution
					</div>

					<h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
						Your Books, Just a Conversation Away.
					</h1>

					<p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
						Upload a PDF, ask questions, and get instant answers from your reading list. Built for a dark, focused reading flow with soft glow and subtle motion.
					</p>

					<div className="mt-10 flex flex-col gap-4 sm:flex-row">
						<Upload label="Upload PDF" />
						<Link
							href="/chat"
							className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#8f5f42] bg-transparent px-6 py-4 text-sm font-medium text-[#f4b17d] transition duration-300 hover:border-[#f4b17d] hover:bg-white/5 hover:shadow-[0_0_30px_rgba(244,177,125,0.12)]"
						>
							Explore Demo
							<ArrowRightIcon />
						</Link>
					</div>
				</div>

				<div id="features" className="mt-20">
					<div className="grid gap-8 sm:grid-cols-3">
						{features.map((f) => (
							<div
								key={f.title}
								className="flex h-56 flex-col justify-between gap-4 rounded-2xl border border-white/8 bg-[#0f0d0c]/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
							>
								<div className="flex items-center gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1b1613] text-[#f4b17d] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
										{f.title === "Smart Analysis" ? <Brain className="h-6 w-6" /> : f.title === "Instant Answers" ? <Zap className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
									</div>
									<h3 className="text-xl font-semibold text-white">{f.title}</h3>
								</div>
								<p className="text-sm text-zinc-300">{f.description}</p>
							</div>
						))}
					</div>

					<div className="mt-12 rounded-[1.25rem] border border-white/8 bg-gradient-to-b from-black/30 to-transparent p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
						<div className="mx-auto flex max-w-5xl flex-col items-center text-center">
							<h2 className="text-3xl font-semibold text-white">The Future of Reading</h2>
							<p className="mt-4 text-base leading-7 text-zinc-300">
								We believe reading should not be a passive activity. BookBuddy transforms static documents into dynamic collaborators. By bridging the gap between human curiosity and machine intelligence, we are redefining how knowledge is consumed and synthesized in the digital age.
							</p>

							<ul className="mt-8 w-full max-w-xl space-y-4">
								<li className="mx-auto flex w-full items-center justify-center gap-4">
									<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0d0c] text-[#f4b17d]"><svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></span>
									<span className="text-zinc-300">Context-aware dialogue system</span>
								</li>
								<li className="mx-auto flex w-full items-center justify-center gap-4">
									<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0d0c] text-[#f4b17d]"><svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></span>
									<span className="text-zinc-300">Multi-document cross-referencing</span>
								</li>
								<li className="mx-auto flex w-full items-center justify-center gap-4">
									<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0d0c] text-[#f4b17d]"><svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></span>
									<span className="text-zinc-300">Semantic search and discovery</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<footer className="relative z-10 border-t border-white/8 bg-black/20">
				<div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
					<span className="text-[#f4b17d]">BookBuddy</span>
					<div className="flex gap-6">
						<a href="#features" className="transition hover:text-white">
							Terms
						</a>
						<a href="#features" className="transition hover:text-white">
							Privacy
						</a>
						<a href="#features" className="transition hover:text-white">
							Support
						</a>
						<a href="#features" className="transition hover:text-white">
							Contact
						</a>
					</div>
				</div>
			</footer>
		</main>
	);
}
