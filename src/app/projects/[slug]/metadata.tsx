import { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/content/projects";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    try {
        const project = await getProjectBySlug(slug);

        if (!project) {
            return {
                title: "Không tìm thấy dự án",
            };
        }

        return {
            title: project.title,
            description: project.fullDescription || project.description,
        };
    } catch (error) {
        console.error(error);
        // Fallback to static projects
        try {
            const { projects } = await import("@/app/projects/data");
            const project = projects.find((p) => p.id === slug);
            if (project) {
                return {
                    title: project.title,
                    description: project.fullDescription || project.description,
                };
            }
        } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
        }
        return {
            title: "Đã xảy ra lỗi",
        };
    }
}

export async function generateStaticParams() {
    try {
        const projects = await getProjects();
        return projects.map((project) => ({
            slug: project.id,
        }));
    } catch (error) {
        // Fallback to static projects if DB fails
        const { projects } = await import("@/app/projects/data");
        return projects.map((project) => ({
            slug: project.id,
        }));
    }
}
