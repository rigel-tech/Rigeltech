import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";
import type { HomeContent } from "@/lib/content/home";

type AboutSectionProps = {
    about: HomeContent["about"];
    docKey?: string;
};

export default function AboutSection({ about, docKey }: AboutSectionProps) {
    const stats = Array.isArray(about.stats) ? about.stats : [];

    return (
        <InlineBlock
            as="section"
            path="about"
            docKey={docKey}
            className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50"
        >
            <div className="container mx-auto px-4">
                <InlineText
                    as="h2"
                    path="about.title"
                    docKey={docKey}
                    value={about.title}
                    className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r text-blue-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <InlineText
                                as="h3"
                                path="about.heading"
                                docKey={docKey}
                                value={about.heading}
                                className="text-2xl font-semibold text-gray-900"
                            />
                            <InlineText
                                as="p"
                                path="about.body"
                                docKey={docKey}
                                value={about.body}
                                className="text-lg leading-relaxed text-gray-800"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((item, index) => (
                                <div
                                    key={`${item.value}-${index}`}
                                    className="bg-white p-4 rounded-lg shadow-md"
                                >
                                    <InlineText
                                        as="div"
                                        path={`about.stats[${index}].value`}
                                        docKey={docKey}
                                        value={item.value}
                                        className="text-primary-600 font-bold text-3xl mb-2"
                                    />
                                    <InlineText
                                        as="div"
                                        path={`about.stats[${index}].label`}
                                        docKey={docKey}
                                        value={item.label}
                                        className="text-gray-800"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                        <InlineImage
                            path="about.image"
                            docKey={docKey}
                            src={about.image}
                            alt={about.imageAlt || "About"}
                            width={800}
                            height={400}
                            className="object-cover hover:scale-105 transition-transform duration-700 w-full h-full"
                            wrapperClassName="relative w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </InlineBlock>
    );
}
