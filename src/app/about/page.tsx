import Link from "next/link";
import { getAboutContent } from "@/lib/content/pages";
import InlineText from "@/components/admin/InlineText";
import InlineBlock from "@/components/admin/InlineBlock";

export default async function AboutPage() {
    const content = await getAboutContent();

    return (
        <main className="pt-28 pb-20">
            <div className="container mx-auto px-4">
                {/* Company Introduction */}
                <InlineBlock
                    as="section"
                    path="content.title"
                    paths={["content.title", "content.intro"]}
                    selectPath="content.title"
                    className="mb-16"
                >
                    <InlineText
                        as="h1"
                        path="content.title"
                        value={content.title}
                        className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 mt-10"
                    />
                    <InlineText
                        as="p"
                        path="content.intro"
                        value={content.intro}
                        className="text-lg mb-6"
                    />
                </InlineBlock>

                {/* Mission & Vision */}
                <section className="grid md:grid-cols-2 gap-8 mb-16">
                    <InlineBlock
                        path="content.vision"
                        className="bg-white p-8 rounded-lg shadow-lg"
                    >
                        <InlineText
                            as="h2"
                            path="content.vision.title"
                            value={content.vision.title}
                            className="text-2xl font-bold mb-4 text-primary-600"
                        />
                        <InlineText
                            as="p"
                            path="content.vision.body"
                            value={content.vision.body}
                            className="text-gray-700 leading-relaxed"
                        />
                    </InlineBlock>
                    <InlineBlock
                        path="content.mission"
                        className="bg-white p-8 rounded-lg shadow-lg"
                    >
                        <InlineText
                            as="h2"
                            path="content.mission.title"
                            value={content.mission.title}
                            className="text-2xl font-bold mb-4 text-primary-600"
                        />
                        {content.mission.body.map((paragraph, index) => (
                            <InlineText
                                key={`${content.mission.title}-${index}`}
                                as="p"
                                path={`content.mission.body[${index}]`}
                                value={paragraph}
                                className={
                                    index === 0
                                        ? "text-gray-700 mb-4 leading-relaxed"
                                        : "text-gray-700 leading-relaxed"
                                }
                            />
                        ))}
                    </InlineBlock>
                </section>

                {/* Core Values */}
                <section className="mb-16">
                    <InlineText
                        as="h2"
                        path="content.coreValuesTitle"
                        value={content.coreValuesTitle}
                        className="text-3xl font-bold mb-8 text-center"
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                        {content.coreValues.map((value, index) => (
                            <InlineBlock
                                key={`${value.title}-${index}`}
                                path={`content.coreValues[${index}]`}
                                className="bg-white p-8 rounded-lg shadow-lg"
                            >
                                <InlineText
                                    as="h3"
                                    path={`content.coreValues[${index}].title`}
                                    value={value.title}
                                    className="text-xl font-bold mb-4 text-primary-600"
                                />
                                <InlineText
                                    as="p"
                                    path={`content.coreValues[${index}].body`}
                                    value={value.body}
                                    className="text-gray-700"
                                />
                            </InlineBlock>
                        ))}
                    </div>
                </section>

                {/* Contact CTA */}
                <InlineBlock
                    as="section"
                    path="content.cta"
                    className="text-center bg-gradient-to-r from-primary-50 to-primary-100 p-12 rounded-xl shadow-lg border border-primary-200"
                >
                    <InlineText
                        as="h2"
                        path="content.cta.title"
                        value={content.cta.title}
                        className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800"
                    />
                    <InlineText
                        as="p"
                        path="content.cta.body"
                        value={content.cta.body}
                        className="mb-8 text-lg text-gray-700 max-w-2xl mx-auto"
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href={content.cta.buttonHref}
                            className="bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-colors text-lg font-semibold min-w-[200px] inline-block"
                        >
                            <InlineText
                                as="span"
                                path="content.cta.buttonText"
                                value={content.cta.buttonText}
                                className="inline-block"
                            />
                        </Link>
                        {/* <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full hover:bg-primary-50 transition-colors text-lg font-semibold min-w-[200px]">
                            Xem portfolio
                        </button> */}
                    </div>
                </InlineBlock>
            </div>
        </main>
    );
}
