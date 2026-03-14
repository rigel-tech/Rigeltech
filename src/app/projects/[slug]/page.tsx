import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/content/projects";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";
import InlineVideo from "@/components/admin/InlineVideo";

export default async function ProjectDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    let project = await getProjectBySlug(slug);

    // Fallback to static if DB fails
    if (!project) {
        try {
            const { projects } = await import("@/app/projects/data");
            project = projects.find((p) => p.id === slug) || null;
        } catch (error) {
            console.error("Fallback failed:", error);
        }
    }

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-primary-600 mb-8 hover:-translate-x-2 transition-transform duration-300"
                    >
                        ← Quay lại
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        <InlineText
                            as="h1"
                            path="title"
                            docKey={project.id}
                            value={project.title}
                            className="text-4xl font-bold text-primary-600 mb-4"
                        />

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Project Image */}
                        <div className="mb-8">
                            <InlineImage
                                path="image"
                                docKey={project.id}
                                src={project.image}
                                alt={project.title}
                                width={800}
                                height={500}
                                className="w-full h-auto rounded-lg"
                                wrapperClassName="relative"
                            />
                        </div>

                        {/* Project Video */}
                        {project.video && (
                            <div className="mb-8">
                                <InlineVideo
                                    path="video"
                                    docKey={project.id}
                                    src={project.video}
                                    className="w-full rounded-lg"
                                />
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none">
                            <InlineText
                                as="p"
                                path="fullDescription"
                                docKey={project.id}
                                value={project.fullDescription}
                                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                            />

                            <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">
                                Thách thức
                            </h2>
                            <InlineText
                                as="p"
                                path="challenge"
                                docKey={project.id}
                                value={project.challenge}
                                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                            />

                            <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">
                                Giải pháp
                            </h2>
                            <InlineText
                                as="p"
                                path="solution"
                                docKey={project.id}
                                value={project.solution}
                                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                            />

                            <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">
                                Kết quả
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                {project.results.map((result, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-600 dark:text-gray-300"
                                    >
                                        <InlineText
                                            as="span"
                                            path={`results[${index}]`}
                                            docKey={project.id}
                                            value={result}
                                            className="text-gray-600 dark:text-gray-300"
                                        />
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold mb-6 text-primary-600">
                                    Hình ảnh dự án
                                </h2>

                                {project.gallery.length === 1 ? (
                                    <div className="flex justify-center">
                                        <div className="max-w-2xl w-full">
                                            <InlineImage
                                                path="gallery[0]"
                                                docKey={project.id}
                                                src={project.gallery[0]}
                                                alt={`${project.title} gallery`}
                                                width={800}
                                                height={500}
                                                className="w-full h-auto"
                                                wrapperClassName="relative rounded-lg overflow-hidden"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.gallery.map((image, index) => (
                                            <InlineImage
                                                key={index}
                                                path={`gallery[${index}]`}
                                                docKey={project.id}
                                                src={image}
                                                alt={`${project.title} gallery ${
                                                    index + 1
                                                }`}
                                                width={600}
                                                height={400}
                                                className="w-full h-auto"
                                                wrapperClassName="relative w-full rounded-lg overflow-hidden"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
