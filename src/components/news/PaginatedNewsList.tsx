"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";
import type { NewsItem } from "@/app/news/data";

type PaginatedNewsListProps = {
    items: NewsItem[];
    pageSize?: number;
    title: string;
};

const PAGE_BUTTONS_TO_SHOW = 5;

export default function PaginatedNewsList({
    items,
    pageSize = 10,
    title,
}: PaginatedNewsListProps) {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, page, pageSize]);

    const pageButtons = useMemo(() => {
        const buttons: number[] = [];
        const half = Math.floor(PAGE_BUTTONS_TO_SHOW / 2);
        let start = Math.max(1, page - half);
        let end = Math.min(totalPages, start + PAGE_BUTTONS_TO_SHOW - 1);
        if (end - start + 1 < PAGE_BUTTONS_TO_SHOW) {
            start = Math.max(1, end - PAGE_BUTTONS_TO_SHOW + 1);
        }
        for (let i = start; i <= end; i++) {
            buttons.push(i);
        }
        return buttons;
    }, [page, totalPages]);

    if (!items || items.length === 0) {
        return <p className="text-white/70">Chưa có tin tức để hiển thị.</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                {title}
            </h2>
            <div className="space-y-4">
                {pageItems.map((news) => (
                    <Link
                        href={`/news/${news.id}`}
                        key={news.id}
                        className="block rounded-lg bg-white/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex flex-col md:flex-row gap-4 p-4">
                            <div className="relative h-32 w-full md:w-48 flex-shrink-0">
                                <InlineImage
                                    path="image"
                                    docKey={news.id}
                                    src={news.image}
                                    alt={news.title}
                                    fill
                                    className="object-cover rounded"
                                    wrapperClassName="relative h-full w-full"
                                />
                            </div>
                            <div className="flex-1">
                                <InlineText
                                    as="h3"
                                    path="title"
                                    docKey={news.id}
                                    value={news.title}
                                    className="text-xl font-semibold text-white mb-2"
                                />
                                <div className="flex flex-wrap items-center gap-3 text-sm text-white/70 mb-2">
                                    <InlineText
                                        as="span"
                                        path="category"
                                        docKey={news.id}
                                        value={news.category}
                                        className=""
                                    />
                                    <InlineText
                                        as="span"
                                        path="date"
                                        docKey={news.id}
                                        value={news.date}
                                        className=""
                                    />
                                    {news.views ? (
                                        <InlineText
                                            as="span"
                                            path="views"
                                            docKey={news.id}
                                            value={String(news.views)}
                                            className=""
                                        />
                                    ) : null}
                                </div>
                                <InlineText
                                    as="p"
                                    path="excerpt"
                                    docKey={news.id}
                                    value={news.excerpt}
                                    className="text-white/80 line-clamp-3"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 ? (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                        className="rounded border border-slate-600 bg-slate-900 px-3 py-1 text-sm text-slate-100 disabled:opacity-40"
                    >
                        «
                    </button>
                    {pageButtons.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            type="button"
                            onClick={() => setPage(pageNumber)}
                            className={`rounded px-3 py-1 text-sm ${
                                pageNumber === page
                                    ? "bg-primary-500 text-white"
                                    : "bg-slate-900 text-slate-100 hover:bg-slate-800"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={page === totalPages}
                        className="rounded border border-slate-600 bg-slate-900 px-3 py-1 text-sm text-slate-100 disabled:opacity-40"
                    >
                        »
                    </button>
                </div>
            ) : null}
        </div>
    );
}
