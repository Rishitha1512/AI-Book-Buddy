import Chat from "@/components/Chat";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function ChatPage() {
	return (
		<main className="h-screen overflow-hidden bg-[#0b0a09] text-zinc-100">
			
<header className="flex items-center justify-between border-b border-white/10 px-6 py-4">

	<Link
		href="/"
		className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-[#f4b17d]"
	>
		<Image
			src="/screen.png"
			alt="BookBuddy logo"
			width={36}
			height={36}
			className="rounded-md border border-white/10"
		/>

		<span>BookBuddy</span>
	</Link>

	<UserButton />

</header>

			<Chat />

		</main>
	);
}