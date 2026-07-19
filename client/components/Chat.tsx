"use client";

import { useRef, useState } from "react";
import { FileText, User, Bot, Upload } from "lucide-react";

type Message = {
	role: "assistant" | "user";
	content: string;
	citation?: string;
};

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
function ThinkingDots() {
	return (
		<div className="flex gap-1 px-2 py-1">
			<span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
			<span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
			<span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
		</div>
	);
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [prompt, setPrompt] = useState("");
	const [uploadedFileName, setUploadedFileName] = useState("");
	const [uploadStatus, setUploadStatus] = useState<"PROCESSING" | "READY" | "">("");
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const sendMessage = async () => {
	const text = prompt.trim();

	if (!text) return;

	// Save user message immediately
	setMessages((current) => [
		...current,
		{
			role: "user",
			content: text,
		},
	]);

	setPrompt("");

	try {
		setIsLoading(true);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/chat`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: text,
				}),
			}
		);

		const data = await response.json();

		setMessages((current) => [
			...current,
			{
		role: "assistant",
		content: data.answer,
		citation: data.sources?.[0]
			? `Page ${data.sources[0].metadata.loc.pageNumber} · Lines ${data.sources[0].metadata.loc.lines.from}-${data.sources[0].metadata.loc.lines.to}`
			: undefined,
	},
		]);
		setIsLoading(false);
	} catch (err) {
		setIsLoading(false);
		console.error(err);

		setMessages((current) => [
			...current,
			{
				role: "assistant",
				content: "Something went wrong.",
			},
		]);
	}
};

	return (
		<div className="mx-auto flex h-[calc(100vh-5rem)] w-full flex-col px-4 py-4 sm:px-6 lg:px-8">
			<section className="flex min-h-0 flex-1 flex-col rounded-[1rem] border border-white/8 bg-black/20 p-3 backdrop-blur-xl">
				<input
					ref={fileInputRef}
					type="file"
					accept=".pdf"
					className="hidden"
					onChange={async (event) => {
	const file = event.target.files?.[0];

	if (!file) return;

	setUploadedFileName(file.name);
	setUploadStatus("PROCESSING");

	const formData = new FormData();
	formData.append("pdf", file);

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/upload`,
			{
				method: "POST",
				body: formData,
			}
		);

		const data = await response.json();

		console.log(data);

		setUploadStatus("READY");
	} catch (error) {
		console.error(error);
		setUploadStatus("");
	}
}}
				/>

				<div className="flex justify-center pb-5 pt-2">
					{uploadedFileName ? (
						<div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-[#151412] px-5 py-2 text-sm">
							<div className="inline-flex items-center gap-2 text-zinc-100">
								<FileText className="h-5 w-5 text-[#f08a3e]" strokeWidth={1.75} />
								<span className="max-w-[180px] truncate font-medium sm:max-w-[300px]">{uploadedFileName}</span>
							</div>
							<div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#f08a3e]">
	<span
		className={`h-2 w-2 rounded-full ${
			uploadStatus === "PROCESSING"
				? "animate-pulse bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)]"
				: "animate-pulse bg-[#f08a3e] shadow-[0_0_10px_rgba(240,138,62,0.7)]"
		}`}
	/>

	{uploadStatus === "PROCESSING" ? "PROCESSING" : "READY"}
</div>
						</div>
					) : null}
				</div>

				<div className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto py-3 pr-3 scrollbar-thin">
  {uploadedFileName ? (
    <div className="w-full space-y-3">
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          className={`flex items-start gap-3 ${
            message.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#151312]">
              <Bot className="h-4 w-4 text-[#f08a3e]" />
            </div>
          )}

          <div
            className={`max-w-[min(45rem,100%)] rounded-[0.85rem] border px-4 py-2.5 text-sm leading-6 ${
              message.role === "user"
                ? "border-[#8f5f42]/45 bg-[#2b2119] text-[#f8e9dd]"
                : "border-white/8 bg-[#151312] text-zinc-300"
            }`}
          >
            <p>{message.content}</p>

            {message.citation ? (
              <p className="mt-3 inline-flex rounded-full border border-[#8f5f42]/45 bg-[#f4b17d]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f4b17d]">
                {message.citation}
              </p>
            ) : null}
          </div>

          {message.role === "user" && (
            <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#2b2119]">
              <User className="h-4 w-4 text-[#f08a3e]" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-start gap-3">
          <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#151312]">
            <Bot className="h-4 w-4 text-[#f08a3e]" />
          </div>

          <div className="rounded-[0.85rem] border border-white/8 bg-[#151312] px-4 py-3">
            <ThinkingDots />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 rounded-full border border-white/10 bg-[#151312] p-5">
        <Upload className="h-10 w-10 text-zinc-600" strokeWidth={1.6} />
      </div>

      <h2 className="text-xl font-medium text-zinc-300">
        No book uploaded
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
        Upload a PDF to start asking questions and exploring your document.
      </p>
    </div>
  )}
</div>

				<div className="shrink-0 pt-3">
	<div className="w-full">
		<div className="flex items-end gap-3 rounded-[1.2rem] border border-white/8 bg-[#141311]/90 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.22)]">
			<button
				type="button"
				onClick={() => fileInputRef.current?.click()}
				className={`mb-1 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition duration-300
${
  !uploadedFileName
    ? "border border-[#f08a3e]/70 text-[#f08a3e] shadow-[0_0_18px_rgba(240,138,62,0.35)]"
    : "border border-white/8 text-zinc-500 hover:border-white/15 hover:text-zinc-300"
}`}
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
					placeholder="Ask about a PDF once you upload one..."
					className="min-h-12 w-full resize-none bg-transparent py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
				/>
			</label>

			<button
				type="button"
				onClick={sendMessage}
				className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-[#f08a3e] text-black transition duration-300 hover:scale-[1.03] hover:bg-[#ffa55f]"
				aria-label="Send message"
			>
				<SendIcon />
			</button>
		</div>
	</div>
</div>
			</section>

		</div>
	);
}
