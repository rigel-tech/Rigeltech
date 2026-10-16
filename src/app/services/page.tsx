import { getServices } from "@/lib/content/services";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-6">
                            Dịch vụ &amp; Giải pháp
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Tư vấn, thiết kế, triển khai và vận hành hệ thống số hóa toàn diện cho doanh nghiệp và ngân hàng đối tác.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <InlineBlock
                                key={`${service.sourceKey || service.title}-${index}`}
                                path="title"
                                paths={["title", "subtitle", "description", "icon"]}
                                docKey={service.sourceKey}
                                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start gap-4 mb-4">
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
                                                className="text-xl font-semibold text-gray-800"
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
                                        className="text-gray-500 text-sm flex-grow"
                                    />
                                </div>
                            </InlineBlock>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
