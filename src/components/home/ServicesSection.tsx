import Link from "next/link";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";

interface ServiceProps {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    sourceKey?: string;
}

export default function ServicesSection({
    services,
    showAll = false,
}: {
    services: ServiceProps[];
    showAll?: boolean;
}) {
    const displayServices = showAll ? services : services.slice(0, 4);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-6">
                        Dịch Vụ Của Chúng Tôi
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Giải pháp công nghệ toàn diện với quy trình chuyên
                        nghiệp
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayServices.map((service, index) => (
                        <InlineBlock
                            key={index}
                            path="title"
                            paths={[
                                "title",
                                "subtitle",
                                "description",
                                "icon",
                            ]}
                            docKey={service.sourceKey}
                            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-start space-x-6">
                                <div className="w-14 h-14 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                                    <InlineImage
                                        path="icon"
                                        docKey={service.sourceKey}
                                        src={service.icon}
                                        alt={service.title}
                                        width={28}
                                        height={28}
                                    />
                                </div>
                                <div>
                                    <div className="mb-3">
                                        <InlineText
                                            as="h3"
                                            path="title"
                                            docKey={service.sourceKey}
                                            value={service.title}
                                            className="text-xl font-semibold text-gray-800"
                                        />
                                        <InlineText
                                            as="p"
                                            path="subtitle"
                                            docKey={service.sourceKey}
                                            value={service.subtitle}
                                            className="text-sm text-primary-600"
                                        />
                                    </div>
                                    <InlineText
                                        as="p"
                                        path="description"
                                        docKey={service.sourceKey}
                                        value={service.description}
                                        className="text-gray-500 line-clamp-3"
                                    />
                                </div>
                            </div>
                        </InlineBlock>
                    ))}
                </div>

                {!showAll && (
                    <div className="text-center mt-12">
                        <Link
                            href="/services"
                            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300"
                        >
                            Xem tất cả dịch vụ
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
