import Link from "next/link";
import { getNewsBySlug } from "@/lib/content/news";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";
import InlineVideo from "@/components/admin/InlineVideo";

export const dynamic = "force-dynamic";

export default async function NewsDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        return (
            <main className="min-h-screen pt-32">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl text-primary-600">
                        Không tìm thấy bài viết
                    </h1>
                    <Link
                        href="/news"
                        className="text-primary-600 hover:text-primary-700"
                    >
                        ← Quay lại trang tin tức
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <article className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link
                            href="/news"
                            className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                        >
                            ← Quay lại Tin tức
                        </Link>
                    </div>

                    {/* Article Header */}
                    <header className="mb-8">
                        <InlineText
                            as="h1"
                            path="title"
                            docKey={news.id}
                            value={news.title}
                            className="text-4xl font-bold text-primary-800 mb-4"
                        />
                        <div className="flex items-center gap-4 text-primary-600">
                            <span>
                                📅{" "}
                                <InlineText
                                    as="span"
                                    path="date"
                                    docKey={news.id}
                                    value={news.date}
                                />
                            </span>
                            <span>
                                👤{" "}
                                <InlineText
                                    as="span"
                                    path="author"
                                    docKey={news.id}
                                    value={news.author}
                                />
                            </span>
                            <span>
                                📂{" "}
                                <InlineText
                                    as="span"
                                    path="category"
                                    docKey={news.id}
                                    value={news.category}
                                />
                            </span>
                            {news.views ? (
                                <span>
                                    👁️{" "}
                                    <InlineText
                                        as="span"
                                        path="views"
                                        docKey={news.id}
                                        value={String(news.views)}
                                    />{" "}
                                    lượt xem
                                </span>
                            ) : null}
                        </div>
                    </header>

                    {/* Featured Image */}
                    <InlineImage
                        path="image"
                        docKey={news.id}
                        src={news.image}
                        alt={news.title}
                        fill
                        priority
                        className="object-cover rounded-xl"
                        wrapperClassName="relative h-[400px] mb-8"
                    />

                    {/* Featured Video */}
                    {news.video && (
                        <InlineVideo
                            path="video"
                            docKey={news.id}
                            src={news.video}
                            className="w-full mb-8 rounded-xl"
                        />
                    )}

                    {/* Article Content */}
                    <div
                        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-white/90 prose-a:text-primary-600 hover:prose-a:text-primary-700"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                </div>
            </article>
        </main>
    );
}
