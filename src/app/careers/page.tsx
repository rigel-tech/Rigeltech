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
                        Cơ hội nghề nghiệp
                    </h1>
                    <p className="text-white/80 text-lg mb-12 max-w-3xl">
                        Gia nhập Rigel Tech để xây dựng các giải pháp tài chính số hiện đại.
                    </p>

                    {/* Open Positions */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                            Vị trí đang tuyển
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
                                            Ứng tuyển ngay
                                        </Link>
                                    </div>
                                </InlineBlock>
                            ))}
                        </div>
                    </div>

                    {/* Company Culture */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                            Phúc lợi &amp; môi trường
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-3xl text-primary-300" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    Lương thưởng cạnh tranh
                                </h3>
                                <p className="text-white/70">
                                    Chính sách đãi ngộ rõ ràng, minh bạch và hấp dẫn.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-3xl text-primary-300" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    Công nghệ hiện đại
                                </h3>
                                <p className="text-white/70">
                                    Làm việc với AI, Blockchain, Cloud và hệ thống ngân hàng số.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-3xl text-primary-300" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    Phát triển nghề nghiệp
                                </h3>
                                <p className="text-white/70">
                                    Đào tạo liên tục và lộ trình thăng tiến rõ ràng.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div id="apply-form" className="mt-16 pt-8">
                        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                            Đăng ký ứng tuyển
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
