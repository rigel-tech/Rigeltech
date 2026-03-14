import { getFields } from "@/lib/content/fields";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";

export default async function FieldsPage() {
    const fields = await getFields();

    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-6">
                            Lĩnh Vực Của Chúng Tôi
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Cung cấp giải pháp công nghệ toàn diện cho doanh
                            nghiệp của bạn
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                        {fields.map((field) => (
                            <InlineBlock
                                key={field.id}
                                path="title"
                                paths={["title", "description", "features", "icon"]}
                                docKey={String(field.id)}
                                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="w-16 h-16 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                                        <InlineImage
                                            path="icon"
                                            docKey={String(field.id)}
                                            src={field.icon}
                                            alt={field.title}
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                    <div>
                                        <InlineText
                                            as="h3"
                                            path="title"
                                            docKey={String(field.id)}
                                            value={field.title}
                                            className="text-xl font-semibold text-gray-800 mb-3"
                                        />
                                        <InlineText
                                            as="p"
                                            path="description"
                                            docKey={String(field.id)}
                                            value={field.description}
                                            className="text-gray-500 mb-4"
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {field.features.map(
                                                (feature, idx) => (
                                                    <InlineText
                                                        key={idx}
                                                        as="span"
                                                        path={`features[${idx}]`}
                                                        docKey={String(field.id)}
                                                        value={feature}
                                                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </InlineBlock>
                        ))}
                    </div>

                    <div className="bg-primary-50 p-10 rounded-xl">
                        <h2 className="text-3xl font-bold text-center mb-8 text-primary-800">
                            Tại sao chọn giải pháp của RIGEL TECH?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    Đội ngũ chuyên nghiệp
                                </h3>
                                <p className="text-gray-600">
                                    Chuyên gia với nhiều năm kinh nghiệm trong
                                    các lĩnh vực phát triển phần mềm và công
                                    nghệ mới nhất.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    Giải pháp tùy chỉnh
                                </h3>
                                <p className="text-gray-600">
                                    Mọi giải pháp đều được thiết kế riêng theo
                                    nhu cầu và mục tiêu của từng doanh nghiệp.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    Hỗ trợ liên tục
                                </h3>
                                <p className="text-gray-600">
                                    Đồng hành cùng khách hàng từ giai đoạn phát
                                    triển đến khi vận hành và bảo trì.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
