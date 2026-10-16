import { MetadataRoute } from "next";
import { newsData } from "@/app/news/data";
import { projects } from "@/app/projects/data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://rigeltech.vn";
    const lastModified = new Date();

    const pages: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
        ["", "weekly", 1],
        ["/about", "monthly", 0.8],
        ["/services", "monthly", 0.8],
        ["/ews", "monthly", 0.8],
        ["/gfs", "monthly", 0.8],
        ["/fields", "monthly", 0.7],
        ["/projects", "weekly", 0.7],
        ["/ecosystem", "monthly", 0.7],
        ["/company-info", "monthly", 0.7],
        ["/why-us", "monthly", 0.6],
        ["/news", "weekly", 0.7],
        ["/careers", "monthly", 0.6],
        ["/contact", "yearly", 0.6],
        ["/privacy-policy", "yearly", 0.3],
        ["/terms-of-use", "yearly", 0.3],
    ];

    return [
        ...pages.map(([path, changeFrequency, priority]) => ({
            url: `${baseUrl}${path}`,
            lastModified,
            changeFrequency,
            priority,
        })),
        ...projects.map((project) => ({
            url: `${baseUrl}/projects/${project.id}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
        ...newsData.map((news) => ({
            url: `${baseUrl}/news/${news.id}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
    ];
}
