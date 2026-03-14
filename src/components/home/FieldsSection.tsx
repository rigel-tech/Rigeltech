import Link from "next/link";
import type { Field } from "@/lib/content/fields";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";

type FieldsSectionProps = {
    fields: Field[];
};

export default function FieldsSection({ fields }: FieldsSectionProps) {
    const displayFields = fields.slice(0, 6);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                    Lĩnh vực hoạt động
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Rigel Tech cung cấp giải pháp phát triển phần mềm chuyên
                    nghiệp, từ ứng dụng web, mobile đến các giải pháp tài
                    chính số
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayFields.map((field) => (
                        <InlineBlock
                            key={field.id}
                            path="title"
                            paths={["title", "description", "features", "icon"]}
                            docKey={String(field.id)}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="w-16 h-16 mb-6 bg-primary-100 rounded-lg flex items-center justify-center">
                                <InlineImage
                                    path="icon"
                                    docKey={String(field.id)}
                                    src={field.icon}
                                    alt={field.title}
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <InlineText
                                as="h3"
                                path="title"
                                docKey={String(field.id)}
                                value={field.title}
                                className="font-bold text-xl mb-3 text-gray-900"
                            />
                            <InlineText
                                as="p"
                                path="description"
                                docKey={String(field.id)}
                                value={field.description}
                                className="text-gray-600 leading-relaxed mb-4"
                            />
                            <Link
                                href="/fields"
                                className="text-primary-600 font-medium hover:text-primary-800 transition-colors"
                            >
                                Tìm hiểu thêm →
                            </Link>
                        </InlineBlock>
                    ))}
                </div>
            </div>
        </section>
    );
}
