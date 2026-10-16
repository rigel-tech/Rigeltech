import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";
import type { Service } from "@/lib/content/services";

type ServiceExtraProps = {
    services: Service[];
};

export default function ServiceExtra({ services }: ServiceExtraProps) {
    const selectedServices = services.filter((service) =>
        ["Hỗ trợ CNTT", "Cho thuê máy chủ"].includes(service.title),
    );

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-600">
                        Dịch vụ mới nhất
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Các dịch vụ hỗ trợ và cho thuê máy chủ chuyên nghiệp
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedServices.map((service, index) => (
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
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                                    <InlineImage
                                        path="icon"
                                        docKey={service.sourceKey}
                                        src={service.icon}
                                        alt={service.title}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div>
                                    <InlineText
                                        as="h3"
                                        path="title"
                                        docKey={service.sourceKey}
                                        value={service.title}
                                        className="text-lg font-semibold text-gray-800"
                                    />
                                    <InlineText
                                        as="p"
                                        path="subtitle"
                                        docKey={service.sourceKey}
                                        value={service.subtitle}
                                        className="text-sm text-primary-600 font-medium"
                                    />
                                </div>
                            </div>
                            <InlineText
                                as="p"
                                path="description"
                                docKey={service.sourceKey}
                                value={service.description}
                                className="text-gray-600 text-sm leading-relaxed"
                            />
                        </InlineBlock>
                    ))}
                </div>
            </div>
        </section>
    );
}
