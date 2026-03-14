import InlineBlock from "@/components/admin/InlineBlock";
import InlineText from "@/components/admin/InlineText";
import type { Field } from "@/lib/content/fields";
import type { HomeContent, HomeBlock } from "@/lib/content/home";
import type { Service } from "@/lib/content/services";
import AboutSection from "@/components/home/AboutSection";
import BannerSlider from "@/components/home/BannerSlider";
import ClientsScroll from "@/components/home/ClientsScroll";
import FieldsSection from "@/components/home/FieldsSection";
import NewsSection from "@/components/home/NewsSection";
import ServiceExtra from "@/components/home/ServiceExtra";
import ServicesSection from "@/components/home/ServicesSection";

type HomeBlocksProps = {
    home: HomeContent;
    fields: Field[];
    services: Service[];
};

const renderBlock = (
    block: HomeBlock,
    home: HomeContent,
    fields: Field[],
    services: Service[],
) => {
    const docKey = home.docKey;

    switch (block.type) {
        case "banner":
            return (
                <section className="relative h-[600px]">
                    <BannerSlider slides={home.bannerSlides} docKey={docKey} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center max-w-4xl px-4 py-6 rounded-lg bg-black bg-opacity-40 backdrop-blur-sm">
                            <InlineText
                                as="h1"
                                path="hero.headline"
                                docKey={docKey}
                                value={home.hero.headline}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow"
                            />
                            <InlineText
                                as="p"
                                path="hero.subheadline"
                                docKey={docKey}
                                value={home.hero.subheadline}
                                className="text-xl text-white text-shadow-sm"
                            />
                        </div>
                    </div>
                </section>
            );
        case "about":
            return <AboutSection about={home.about} docKey={docKey} />;
        case "news":
            return <NewsSection />;
        case "fields":
            return <FieldsSection fields={fields} />;
        case "services":
            return <ServicesSection services={services} />;
        case "serviceExtra":
            return <ServiceExtra services={services} />;
        case "clients":
            return (
                <section id="clients" className="py-20 overflow-hidden">
                    <InlineBlock
                        path="clients"
                        docKey={docKey}
                        className="block"
                        selectPath="clients.title"
                    >
                        <div className="container mx-auto px-4">
                            <InlineText
                                as="h2"
                                path="clients.title"
                                docKey={docKey}
                                value={home.clients.title}
                                className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800"
                            />
                            <ClientsScroll
                                logos={home.clients.logos}
                                docKey={docKey}
                            />
                        </div>
                    </InlineBlock>
                </section>
            );
        default:
            return null;
    }
};

export default function HomeBlocks({ home, fields, services }: HomeBlocksProps) {
    const blocks = Array.isArray(home.blocks) ? home.blocks : [];

    return (
        <>
            {blocks
                .filter((block) => block.visible !== false)
                .map((block, index) => {
                    const content = renderBlock(block, home, fields, services);
                    if (!content) return null;
                    return (
                        <div key={block.id || `${block.type}-${index}`}>
                            {content}
                        </div>
                    );
                })}
        </>
    );
}
