import Link from "next/link";
import type { Project } from "@/app/projects/data";
import { textToHtml } from "@/lib/htmlToText";
import DigiFundFlow from "@/components/projects/DigiFundFlow";
import FarmTraceFlow from "@/components/projects/FarmTraceFlow";
import DigitalAssetFlow from "@/components/projects/DigitalAssetFlow";

type Ecosystem = NonNullable<Project["ecosystem"]>;

const THEMES: Record<
    Ecosystem,
    { panel: string; title: string; chip: string; role: string; Flow: () => React.ReactElement }
> = {
    farm: {
        panel: "rounded-3xl border p-6 border-emerald-500/30 bg-slate-900/70",
        title: "text-3xl md:text-4xl font-bold text-emerald-400",
        chip: "rounded-full border px-3 py-1 text-xs font-semibold border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
        role: "Lớp 1: Dữ liệu Nông nghiệp số",
        Flow: FarmTraceFlow,
    },
    digital: {
        panel: "rounded-3xl border p-6 border-amber-500/30 bg-slate-900/70",
        title: "text-3xl md:text-4xl font-bold text-amber-400",
        chip: "rounded-full border px-3 py-1 text-xs font-semibold border-amber-500/40 bg-amber-500/10 text-amber-300",
        role: "Lớp 2: Token hóa & Giao dịch",
        Flow: DigitalAssetFlow,
    },
    digifund: {
        panel: "rounded-3xl border p-6 border-violet-500/30 bg-slate-900/70",
        title: "text-3xl md:text-4xl font-bold text-violet-400",
        chip: "rounded-full border px-3 py-1 text-xs font-semibold border-violet-500/40 bg-violet-500/10 text-violet-300",
        role: "Lớp 3: Tín dụng & Quản lý danh mục",
        Flow: DigiFundFlow,
    },
};

const toHtml = (value: string) =>
    /<\/?[a-z][\s\S]*>/i.test(value) ? value : textToHtml(value);

export default function EcosystemProjectDetail({
    project,
    ecosystem,
}: {
    project: Project;
    ecosystem: Ecosystem;
}) {
    const theme = THEMES[ecosystem];
    const { Flow } = theme;

    return (
        <main className="min-h-screen bg-[#0b0b0b] text-white">
            <section className="pt-28 pb-20">
                <div className="container mx-auto px-4">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-amber-400 mb-8 hover:-translate-x-2 transition-transform duration-300"
                    >
                        ← Quay lại
                    </Link>

                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className={theme.panel}>
                            <Flow />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                                Hệ Sinh Thái Tài Chính Xanh
                            </p>
                            <h1 className={theme.title}>{project.title}</h1>
                            <p className="text-slate-200 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="pt-2">
                                <h3 className="text-sm font-semibold text-slate-300 mb-2">
                                    Công nghệ sử dụng
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className={theme.chip}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                                <div>
                                    <p className="text-xs uppercase text-slate-500">
                                        Năm
                                    </p>
                                    <p className="font-semibold">{project.year}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-slate-500">
                                        Vai trò
                                    </p>
                                    <p className="font-semibold text-slate-100">
                                        {theme.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
                            <h3 className="text-lg font-semibold text-amber-300 mb-3">
                                Thách thức
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line break-words">
                                {project.challenge}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
                            <h3 className="text-lg font-semibold text-amber-300 mb-3">
                                Giải pháp
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line break-words">
                                {project.solution}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
                            <h3 className="text-lg font-semibold text-amber-300 mb-3">
                                Kết quả
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                {project.results.map((result, index) => (
                                    <li key={index} className="flex gap-2">
                                        <span className="text-emerald-400">✓</span>
                                        <span className="text-slate-300">{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
                        <h2 className="text-xl font-semibold text-white mb-3">
                            Mô tả chi tiết
                        </h2>
                        <div
                            className="prose prose-sm prose-invert max-w-none text-slate-300"
                            dangerouslySetInnerHTML={{
                                __html: toHtml(project.fullDescription),
                            }}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
