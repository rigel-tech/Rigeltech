import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function WhyUsPage() {
    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-6">
                            Vì sao chọn Rigel Tech?
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Giải pháp toàn diện cho ngân hàng và doanh nghiệp trong kỷ nguyên số.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start">
                                <div className="text-5xl mr-6 flex-shrink-0 text-primary-700">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="6" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        1. Chuyên gia tài chính số
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Đội ngũ hiểu sâu nghiệp vụ ngân hàng, dữ liệu và quản trị rủi ro.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start">
                                <div className="text-5xl mr-6 flex-shrink-0 text-primary-700">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                        <polyline points="17 6 23 6 23 12" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        2. Kiến trúc mở
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Dễ tích hợp Core Banking, CIC và hệ thống hiện có của đối tác.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start">
                                <div className="text-5xl mr-6 flex-shrink-0 text-primary-700">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        3. Bảo mật & tuân thủ
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Áp dụng chuẩn bảo mật, mã hóa dữ liệu và tuân thủ pháp lý nghiêm ngặt.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start">
                                <div className="text-5xl mr-6 flex-shrink-0 text-primary-700">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        4. Triển khai nhanh
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Lộ trình rõ ràng, linh hoạt theo quy mô và mục tiêu dự án.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start">
                                <div className="text-5xl mr-6 flex-shrink-0 text-primary-700">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                        5. Đồng hành dài hạn
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Hỗ trợ vận hành, tối ưu hiệu quả và nâng cấp liên tục.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            So sánh năng lực
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-primary-600 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Tiêu chí
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold">
                                        Rigel Tech
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold">
                                        Đơn vị khác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        Hiểu biết nghiệp vụ
                                    </td>
                                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                                        Chuyên sâu
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-400">
                                        Cơ bản
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        Tùy biến
                                    </td>
                                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                                        Linh hoạt
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-400">
                                        Giới hạn
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        Bảo mật
                                    </td>
                                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                                        Chuẩn ngân hàng
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-400">
                                        Trung bình
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        Tốc độ triển khai
                                    </td>
                                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                                        Nhanh
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-400">
                                        Chậm
                                    </td>
                                </tr>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        Hỗ trợ vận hành
                                    </td>
                                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                                        24/7
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-400">
                                        Giờ hành chính
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                            <span className="inline-flex items-center justify-center align-middle text-primary-600 mr-2">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            </span>
                            Chúng tôi cung cấp giải pháp sát nhu cầu thực tế và đồng hành dài hạn cùng đối tác.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors" href="/contact">
                                Liên hệ ngay
                            </Link>
                            <Link className="inline-block border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors" href="/ecosystem">
                                Xem hệ sinh thái
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
