import { getNewsBySlug, getNews } from "@/lib/content/news";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    try {
        const news = await getNewsBySlug(slug);

        if (!news) {
            return {
                title: "Không tìm thấy bài viết",
            };
        }

        return {
            title: news.title,
            description: news.excerpt,
        };
    } catch (error) {
        console.error(error);
        return {
            title: "Đã xảy ra lỗi",
        };
    }
}

export async function generateStaticParams() {
    try {
        const news = await getNews();
        return news.map((item) => ({
            slug: item.id,
        }));
    } catch (error) {
        // Fallback to static if needed
        return [];
    }
}
