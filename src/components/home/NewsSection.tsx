import { getLatestNews } from "@/lib/content/news";
import { LatestNewsSwiper } from "@/components/news/NewsSwiper";

export default async function NewsSection() {
    const latestNews = await getLatestNews({ limit: 3 });

    return (
        <section className="mb-16">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                    Tin tức nổi bật
                </h2>
                <p className="text-white/80 text-center mb-12 max-w-2xl mx-auto">
                    Cập nhật những tin tức mới nhất về công nghệ và tài chính
                    số
                </p>
                <LatestNewsSwiper items={latestNews} variant="home" />
            </div>
        </section>
    );
}
