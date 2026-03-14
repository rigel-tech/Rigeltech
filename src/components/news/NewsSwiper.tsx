"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";
import type { NewsItem } from "@/app/news/data";

const chunkItems = <T,>(items: T[], size: number) => {
    if (!Array.isArray(items) || size <= 0) return [] as T[][];
    const chunks: T[][] = [];
    for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
    }
    return chunks;
};

type LatestVariant = "home" | "page";

type LatestNewsSwiperProps = {
    items: NewsItem[];
    variant?: LatestVariant;
};

export function LatestNewsSwiper({
    items,
    variant = "page",
}: LatestNewsSwiperProps) {
    const slides = chunkItems(items, 3);
    const showCategory = variant === "page";
    const blockPaths = showCategory
        ? ["title", "excerpt", "date", "category", "image"]
        : ["title", "excerpt", "date", "image"];
    const cardClassName =
        variant === "home"
            ? "bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
            : "bg-white/10 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full";

    if (!items || items.length === 0) {
        return (
            <p className="text-white/70">Chua co tin tuc de hien thi.</p>
        );
    }

    return (
        <Swiper
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            className="news-swiper-latest"
        >
            {slides.map((group) => (
                <SwiperSlide>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {group.map((news) => (
                            <Link
                                href={`/news/${news.id}`}
                                key={news.id}
                                className="h-full"
                            >
                                <InlineBlock
                                    path="title"
                                    paths={blockPaths}
                                    docKey={news.id}
                                    className={cardClassName}
                                >
                                    <InlineImage
                                        path="image"
                                        docKey={news.id}
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover"
                                        wrapperClassName="relative h-48"
                                    />
                                    <div className="p-6 flex flex-col flex-1">
                                        {showCategory ? (
                                            <div className="flex items-center gap-4 mb-3">
                                                <InlineText
                                                    as="span"
                                                    path="category"
                                                    docKey={news.id}
                                                    value={news.category}
                                                    className="text-sm text-primary-600"
                                                />
                                                <InlineText
                                                    as="span"
                                                    path="date"
                                                    docKey={news.id}
                                                    value={news.date}
                                                    className="text-sm text-white/70"
                                                />
                                            </div>
                                        ) : (
                                            <InlineText
                                                as="div"
                                                path="date"
                                                docKey={news.id}
                                                value={news.date}
                                                className="text-sm text-primary-600 mb-2"
                                            />
                                        )}
                                        <InlineText
                                            as="h3"
                                            path="title"
                                            docKey={news.id}
                                            value={news.title}
                                            className="text-xl font-semibold text-white mb-3"
                                        />
                                        <InlineText
                                            as="p"
                                            path="excerpt"
                                            docKey={news.id}
                                            value={news.excerpt}
                                            className="text-white/80 line-clamp-3 flex-1"
                                        />
                                    </div>
                                </InlineBlock>
                            </Link>
                        ))}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

type PopularNewsSwiperProps = {
    items: NewsItem[];
};

export function PopularNewsSwiper({ items }: PopularNewsSwiperProps) {
    const slides = chunkItems(items, 3);

    if (!items || items.length === 0) {
        return (
            <p className="text-white/70">Chua co tin tuc pho bien.</p>
        );
    }

    return (
        <Swiper
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            className="news-swiper-popular"
        >
            {slides.map((group) => (
                <SwiperSlide>
                    <div className="grid grid-cols-1 gap-6">
                        {group.map((news) => (
                            <Link
                                href={`/news/${news.id}`}
                                key={news.id}
                                className="block"
                            >
                                <InlineBlock
                                    path="title"
                                    paths={["title", "views", "date", "image"]}
                                    docKey={news.id}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex gap-6">
                                        <InlineImage
                                            path="image"
                                            docKey={news.id}
                                            src={news.image}
                                            alt={news.title}
                                            fill
                                            sizes="128px"
                                            className="object-cover rounded"
                                            wrapperClassName="relative w-32 h-24 flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <InlineText
                                                as="h3"
                                                path="title"
                                                docKey={news.id}
                                                value={news.title}
                                                className="text-lg font-semibold text-white mb-2 line-clamp-2"
                                            />
                                            <div className="flex items-center gap-4 text-sm text-white/70">
                                                {news.views ? (
                                                    <span>
                                                        Views:{" "}
                                                        <InlineText
                                                            as="span"
                                                            path="views"
                                                            docKey={news.id}
                                                            value={String(
                                                                news.views,
                                                            )}
                                                            className="text-sm text-white/70"
                                                        />
                                                    </span>
                                                ) : null}
                                                <span>
                                                    Date:{" "}
                                                    <InlineText
                                                        as="span"
                                                        path="date"
                                                        docKey={news.id}
                                                        value={news.date}
                                                        className="text-sm text-white/70"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </InlineBlock>
                            </Link>
                        ))}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
