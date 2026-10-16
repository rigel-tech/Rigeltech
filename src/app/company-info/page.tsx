import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function CompanyInfoPage() {
    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-6">
                            Giới thiệu Rigel Tech
                        </h1>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto break-words space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Rigel Tech là doanh nghiệp công nghệ tập trung vào Fintech, AI và Blockchain.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Chúng tôi đồng hành cùng ngân hàng và doanh nghiệp trong hành trình chuyển đổi số an toàn và bền vững.
                        </p>
                        <ul className="bg-primary-50 rounded-xl p-6 space-y-2 list-disc pl-6">
                            <li className="text-gray-700">
                                Tư vấn chiến lược và kiến trúc hệ thống số.
                            </li>
                            <li className="text-gray-700">
                                Triển khai nền tảng EWS, GFS và các giải pháp tài chính xanh.
                            </li>
                            <li className="text-gray-700">
                                Đội ngũ kỹ sư giàu kinh nghiệm, quy trình triển khai chuẩn.
                            </li>
                            <li className="text-gray-700">
                                Cam kết bảo mật và tuân thủ dữ liệu theo Nghị định 13/2023/NĐ-CP.
                            </li>
                        </ul>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Rigel Tech hướng tới xây dựng hệ sinh thái công nghệ mở, dễ tích hợp và mở rộng.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Chúng tôi ưu tiên hiệu quả vận hành, minh bạch dữ liệu và trải nghiệm người dùng.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Cơ cấu tổ chức
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Các khối chức năng phối hợp để đảm bảo tư vấn, triển khai và vận hành trọn vòng đời giải pháp.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-primary-600 mb-6">
                                Khối Giải pháp & Sản phẩm
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Giám đốc Giải pháp
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Định hình kiến trúc, mô hình vận hành và KPI dự án.
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Quản lý sản phẩm
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Thiết kế lộ trình sản phẩm và ưu tiên tính năng.
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Business Analyst
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Chuẩn hóa quy trình và yêu cầu nghiệp vụ.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-primary-600 mb-6">
                                Khối Kỹ thuật
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Engineering
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Phát triển nền tảng core, API và dịch vụ tích hợp.
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Data & AI
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Xây dựng mô hình chấm điểm và phân tích dữ liệu.
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        DevOps & Cloud
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Triển khai hạ tầng, giám sát và tối ưu vận hành.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-primary-600 mb-6">
                                Khối An toàn & Tuân thủ
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Security
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Đảm bảo bảo mật ứng dụng và kiểm soát rủi ro.
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Compliance
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Tuân thủ pháp lý và chuẩn hóa dữ liệu.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-primary-600 mb-6">
                                Khối Hợp tác & Vận hành
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Customer Success
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Đồng hành sau triển khai, tối ưu hiệu quả vận hành.
                                    </p>
                                </div>
                                <div className="border-l-4 border-primary-300 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">
                                        Partnership
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Kết nối đối tác chiến lược và hệ sinh thái.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Lộ trình phát triển
                        </h2>
                        <p className="text-lg text-gray-600">
                            Tập trung mở rộng năng lực nền tảng và giá trị dữ liệu.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative">
                            <div className="hidden md:block absolute top-24 -right-4 w-8 h-0.5 bg-primary-300">
                            </div>
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 shadow-lg">
                                <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
                                    2024-2025
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Củng cố nền tảng
                                </h3>
                                <ul className="space-y-3 list-disc pl-6">
                                    <li className="text-gray-700">
                                        Chuẩn hóa kiến trúc dữ liệu
                                    </li>
                                    <li className="text-gray-700">
                                        Hoàn thiện EWS/GFS
                                    </li>
                                    <li className="text-gray-700">
                                        Tăng cường bảo mật và tuân thủ
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="hidden md:block absolute top-24 -right-4 w-8 h-0.5 bg-primary-300">
                            </div>
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 shadow-lg">
                                <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
                                    2025-2026
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Mở rộng hệ sinh thái
                                </h3>
                                <ul className="space-y-3 list-disc pl-6">
                                    <li className="text-gray-700">
                                        Mở rộng API đối tác
                                    </li>
                                    <li className="text-gray-700">
                                        Tích hợp RWA và tài sản số
                                    </li>
                                    <li className="text-gray-700">
                                        Tối ưu vận hành bằng AI
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 shadow-lg">
                                <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
                                    2026-2028
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Tăng trưởng bền vững
                                </h3>
                                <ul className="space-y-3 list-disc pl-6">
                                    <li className="text-gray-700">
                                        Mở rộng thị trường khu vực
                                    </li>
                                    <li className="text-gray-700">
                                        Chuẩn hóa sản phẩm
                                    </li>
                                    <li className="text-gray-700">
                                        Nâng cao trải nghiệm khách hàng
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                            Rigel Tech cam kết minh bạch, bảo mật và đồng hành dài hạn cùng đối tác.
                        </p>
                        <Link className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors" href="/contact">
                            Liên hệ hợp tác
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
