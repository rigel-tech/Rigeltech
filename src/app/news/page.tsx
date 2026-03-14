import { getLatestNews, getPopularNews } from "@/lib/content/news";
import { LatestNewsSwiper } from "@/components/news/NewsSwiper";
import PaginatedNewsList from "@/components/news/PaginatedNewsList";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
    const latestNews = await getLatestNews();
    const popularNews = await getPopularNews();

    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-primary-600 mb-12">
                        Tin Tức & Cập Nhật
                    </h1>

                    {/* Latest News */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                            Tin Tức Mới Nhất
                        </h2>
                        <LatestNewsSwiper items={latestNews} />
                    </div>

                    {/* Popular News */}
                    <div>
                        <PaginatedNewsList
                            title="Tin Tức Phổ Biến"
                            items={popularNews}
                            pageSize={10}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
