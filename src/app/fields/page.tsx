import Link from "next/link";
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
                            Lĩnh vực hoạt động
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Tập trung vào các mũi nhọn: Blockchain, AI, Fintech, bảo mật và quản trị hệ thống.
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

                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200 p-12 rounded-2xl mb-16">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-primary-800 mb-4">
                                Cam kết chất lượng
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Từ phân tích nghiệp vụ đến vận hành, chúng tôi đảm bảo sản phẩm ổn định, bảo mật và dễ mở rộng.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link className="group" href="/ecosystem">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full border-2 border-blue-200 hover:border-blue-400">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-4xl mb-4 text-blue-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                                    Hệ sinh thái sản phẩm
                                </h3>
                                <p className="text-blue-700 mb-4">
                                    Khám phá các nền tảng fintech, AI và blockchain của Rigel Tech.
                                </p>
                                <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                                    Xem hệ sinh thái
                                </span>
                            </div>
                        </Link>
                        <Link className="group" href="/company-info">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full border-2 border-purple-200 hover:border-purple-400">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-4xl mb-4 text-purple-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                <h3 className="text-2xl font-bold text-purple-900 mb-3">
                                    Giới thiệu công ty
                                </h3>
                                <p className="text-purple-700 mb-4">
                                    Tìm hiểu đội ngũ, định hướng và lộ trình phát triển của Rigel Tech.
                                </p>
                                <span className="text-purple-600 font-semibold group-hover:text-purple-700">
                                    Xem hồ sơ công ty
                                </span>
                            </div>
                        </Link>
                        <Link className="group" href="/why-us">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full border-2 border-green-200 hover:border-green-400">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-4xl mb-4 text-green-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <h3 className="text-2xl font-bold text-green-900 mb-3">
                                    Vì sao chọn Rigel Tech
                                </h3>
                                <p className="text-green-700 mb-4">
                                    So sánh năng lực và giá trị chúng tôi mang lại cho đối tác.
                                </p>
                                <span className="text-green-600 font-semibold group-hover:text-green-700">
                                    Khám phá ngay
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-primary-50 p-10 rounded-xl mt-16">
                        <h2 className="text-3xl font-bold text-center mb-8 text-primary-800">
                            Vì sao chọn Rigel Tech?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    Đội ngũ chuyên gia
                                </h3>
                                <p className="text-gray-600">
                                    Kinh nghiệm triển khai hệ thống tài chính số, dữ liệu lớn và AI cho ngân hàng.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    Kiến trúc linh hoạt
                                </h3>
                                <p className="text-gray-600">
                                    Thiết kế mở, dễ tích hợp Core Banking, CIC và hệ thống hiện hữu.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    Đồng hành lâu dài
                                </h3>
                                <p className="text-gray-600">
                                    Hỗ trợ vận hành, tối ưu hiệu quả và nâng cấp theo lộ trình.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
