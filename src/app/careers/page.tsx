import Link from "next/link";
import { getOpenPositions } from "@/lib/content/careers";
import ApplicationForm from "@/components/careers/ApplicationForm";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineText from "@/components/admin/InlineText";

export default async function RecruitPage() {
    const openPositions = await getOpenPositions();

    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-primary-600 mb-4">
                        Tuyển Dụng
                    </h1>
                    <p className="text-white/80 text-lg mb-12 max-w-3xl">
                        Tham gia DIGIFUND để phát triển sự nghiệp trong môi
                        trường năng động và sáng tạo. Chúng tôi đang tìm kiếm
                        các tài năng để cùng xây dựng những giải pháp công nghệ
                        hiện đại.
                    </p>

                    {/* Open Positions */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                            Vị Trí Đang Tuyển
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {openPositions.map((position, index) => (
                                <InlineBlock
                                    key={index}
                                    path="title"
                                    paths={[
                                        "title",
                                        "description",
                                        "tags",
                                        "icon",
                                    ]}
                                    docKey={position.id}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                                >
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-4 text-center">
                                            <div className="w-16 h-16 rounded-full bg-primary-600/20 mx-auto flex items-center justify-center mb-4">
                                                <InlineText
                                                    as="span"
                                                    path="icon"
                                                    docKey={position.id}
                                                    value={position.icon}
                                                    className="text-2xl"
                                                />
                                            </div>
                                            <InlineText
                                                as="h3"
                                                path="title"
                                                docKey={position.id}
                                                value={position.title}
                                                className="text-xl font-semibold text-white"
                                            />
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-2 mb-5">
                                            {position.tags.map((tag, idx) => (
                                                <InlineText
                                                    key={idx}
                                                    as="span"
                                                    path={`tags[${idx}]`}
                                                    docKey={position.id}
                                                    value={tag}
                                                    className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded"
                                                />
                                            ))}
                                        </div>

                                        <InlineText
                                            as="p"
                                            path="description"
                                            docKey={position.id}
                                            value={position.description}
                                            className="text-white/70 text-center mb-6 flex-1"
                                        />

                                        <Link
                                            href="#apply-form"
                                            className="block w-full text-center py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 mt-auto"
                                        >
                                            Ứng Tuyển Ngay
                                        </Link>
                                    </div>
                                </InlineBlock>
                            ))}
                        </div>
                    </div>

                    {/* Company Culture */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                            Phúc Lợi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md">
                                <div className="mb-4 text-3xl">🚀</div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    Phát Triển Kỹ Năng
                                </h3>
                                <p className="text-white/70">
                                    Cơ hội học hỏi với các dự án đa dạng và
                                    chương trình đào tạo chuyên sâu.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md">
                                <div className="mb-4 text-3xl">💼</div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    Môi Trường Hiện Đại
                                </h3>
                                <p className="text-white/70">
                                    Không gian làm việc sáng tạo với cơ hội làm
                                    việc linh hoạt.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md">
                                <div className="mb-4 text-3xl">🎁</div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    Chế Độ Đãi Ngộ
                                </h3>
                                <p className="text-white/70">
                                    Bảo hiểm sức khỏe, du lịch thường niên và
                                    các hoạt động team building.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div id="apply-form" className="mt-16 pt-8">
                        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                            Ứng Tuyển Vị Trí
                        </h2>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                            <ApplicationForm positions={openPositions} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
