"use client";

import { useEffect, useState } from "react";
import { Plus, FileText, BookOpen, Calendar, Inbox, Loader2 } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export type Document = {
    id: string;
    title: string;
    pages: number;
    date: string;
    type: "book" | "paper";
};

// Interface representing the document payload returned from Express/MongoDB
interface MongoDocument {
    _id: string;
    clerkUserId: string;
    fileName: string;
    pages?: number;
    uploadedAt: string;
}

function DocumentCard({ doc }: { doc: Document }) {
    const Icon = doc.type === "book" ? BookOpen : FileText;

    return (
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#f4b17d]/30 transition-colors">
            <div className="flex h-48 items-center justify-center bg-white/[0.03] border-b border-white/5">
                <Icon className="h-14 w-14 text-[#f4b17d]/40" strokeWidth={1.5} />
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                    <h3 className="font-semibold text-zinc-100 leading-snug line-clamp-2">
                        {doc.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
                        <FileText className="h-4 w-4" />
                        <span>{doc.pages} {doc.pages === 1 ? "Page" : "Pages"}</span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-400">
                        <Calendar className="h-4 w-4" />
                        <span>{doc.date}</span>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center border-t border-white/10 pt-4">
    <Link 
        href={`/chat/${doc.id}`}
        className="text-sm font-semibold tracking-wide text-[#f4b17d] hover:text-[#f9c69a] transition-colors"
    >
        OPEN ARCHIVE
    </Link>
</div>
            </div>
        </div>
    );
}

function AddDocumentCard() {
    return (
        <Link 
            href="/chat"
            className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#f4b17d]/30 bg-white/[0.01] py-16 hover:border-[#f4b17d]/60 hover:bg-white/[0.02] transition-colors"
        >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                <Plus className="h-6 w-6 text-[#f4b17d]" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-zinc-200">
                ADD DOCUMENT
            </span>
        </Link>
    );
}

function EmptyState() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5">
                <Inbox className="h-7 w-7 text-[#f4b17d]/50" />
            </span>
            <h3 className="mt-4 font-semibold text-zinc-200">No documents yet</h3>
            <p className="mt-1 max-w-sm text-sm text-zinc-500">
                Upload your first manuscript or paper to start building your archive.
            </p>
        </div>
    );
}

export default function DocumentsPage() {
    const { user, isLoaded } = useUser();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDocuments() {
            if (!user?.id) return;

            try {
                // Adjust port/endpoint path if your API runs on a different port or path (e.g. /api/documents)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/user/${user.id}`);
                
                if (response.ok) {
                    const data: MongoDocument[] = await response.json();
                    
                    // Map MongoDB documents to UI Document shape
                    const mappedDocs: Document[] = data.map((doc) => ({
                        id: doc._id,
                        title: doc.fileName,
                        pages: doc.pages || 1,
                        date: new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }),
                        type: doc.fileName.toLowerCase().endsWith(".pdf") ? "paper" : "book",
                    }));

                    setDocuments(mappedDocs);
                }
            } catch (error) {
                console.error("Failed to fetch documents:", error);
            } finally {
                setLoading(false);
            }
        }

        if (isLoaded) {
            fetchDocuments();
        }
    }, [user, isLoaded]);

    return (
        <main className="min-h-screen bg-[#0b0a09] text-zinc-100">
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

            <div className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-2xl font-bold text-zinc-100">My Documents</h1>
                <p className="mt-2 max-w-2xl text-zinc-400">
                    A premium curated archive of your personal library. Access, search,
                    and manage your uploaded manuscripts and papers.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20 text-[#f4b17d]">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : documents.length === 0 ? (
                        <>
                            <EmptyState />
                            <AddDocumentCard />
                        </>
                    ) : (
                        <>
                            {documents.map((doc) => (
                                <DocumentCard key={doc.id} doc={doc} />
                            ))}
                            <AddDocumentCard />
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}