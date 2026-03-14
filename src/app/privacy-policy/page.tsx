import type { Metadata } from "next";
import { getLegalPage } from "@/lib/content/pages";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineText from "@/components/admin/InlineText";

export const metadata: Metadata = {
    title: "Chính sách bảo mật | DIGIFUND",
    description: "Chính sách bảo mật và quyền riêng tư của DIGIFUND",
};

export default async function PrivacyPolicy() {
    const page = await getLegalPage("privacy-policy");

    return (
        <div className="container mx-auto px-4 py-12 md:py-16 mt-16 md:mt-20">
            <div className="max-w-4xl mx-auto">
                <InlineText
                    as="h1"
                    path="title"
                    docKey={page.slug}
                    value={page.title}
                    className="text-3xl md:text-4xl font-bold mb-8 text-primary-600"
                />

                <div className="max-w-none">
                    <p className="text-lg text-white/70 mb-8">
                        Cập nhật lần cuối:{" "}
                        {new Date().toLocaleDateString("vi-VN")}
                    </p>

                    <InlineBlock
                        path="contentHtml"
                        docKey={page.slug}
                        className="text-white/80 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-white [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_a]:text-primary-600 [&_a]:hover:underline"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
                        />
                    </InlineBlock>
                </div>
            </div>
        </div>
    );
}
