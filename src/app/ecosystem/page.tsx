import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function EcosystemPage() {
    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-6">
                            Hệ sinh thái Rigel Tech
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Giải pháp tài chính số toàn diện cho ngân hàng và doanh nghiệp
                        </p>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Kết nối eKYC, thanh toán, ngân hàng số, AI và Blockchain trên một nền tảng mở, dễ tích hợp.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="mb-6">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-5xl mb-4 text-primary-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    #1 RigelPay
                                </h2>
                                <p className="text-primary-600 font-semibold">
                                    Payment Gateway & Wallet
                                </p>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Hạ tầng thanh toán đa kênh, hỗ trợ chuyển tiền, thu hộ và đối soát tự động.
                            </p>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    Tính năng nổi bật
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Kết nối ngân hàng & ví điện tử
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Đối soát tự động
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            API thanh toán nhanh
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Chống gian lận thời gian thực
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="mb-6">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-5xl mb-4 text-primary-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <polyline points="17 11 19 13 23 9" />
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    #2 RigelKYC
                                </h2>
                                <p className="text-primary-600 font-semibold">
                                    eKYC & Identity
                                </p>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Xác thực định danh số đa lớp, tuân thủ KYC/AML và giảm rủi ro gian lận.
                            </p>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    Tính năng nổi bật
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            OCR + Face Match
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Liveness Detection
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            AML Screening
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Audit Trail
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="mb-6">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-5xl mb-4 text-primary-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    #3 RigelBank
                                </h2>
                                <p className="text-primary-600 font-semibold">
                                    Digital Core Banking
                                </p>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Nền tảng ngân hàng số linh hoạt cho sản phẩm tài khoản, tín dụng và dịch vụ số.
                            </p>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    Tính năng nổi bật
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Tài khoản số
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Tín dụng số
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Open API
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Bảo mật chuẩn ngân hàng
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-yellow-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="mb-6">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-5xl mb-4 text-primary-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                                    <rect x="9" y="9" width="6" height="6" />
                                    <line x1="9" y1="1" x2="9" y2="4" />
                                    <line x1="15" y1="1" x2="15" y2="4" />
                                    <line x1="9" y1="20" x2="9" y2="23" />
                                    <line x1="15" y1="20" x2="15" y2="23" />
                                    <line x1="20" y1="9" x2="23" y2="9" />
                                    <line x1="20" y1="14" x2="23" y2="14" />
                                    <line x1="1" y1="9" x2="4" y2="9" />
                                    <line x1="1" y1="14" x2="4" y2="14" />
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    #4 RigelAI
                                </h2>
                                <p className="text-primary-600 font-semibold">
                                    AI Analytics
                                </p>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Phân tích dữ liệu và chấm điểm tín dụng theo thời gian thực, hỗ trợ quyết định nhanh.
                            </p>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    Tính năng nổi bật
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Predictive Analytics
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Risk Scoring
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Dashboard KPI
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Explainable AI
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="mb-6">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-5xl mb-4 text-primary-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    #5 RigelChain
                                </h2>
                                <p className="text-primary-600 font-semibold">
                                    Blockchain Trust Layer
                                </p>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Sổ cái bất biến và hợp đồng thông minh cho truy xuất tài sản số và giao dịch tin cậy.
                            </p>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    Tính năng nổi bật
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Smart Contract
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Tokenization
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Traceability
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Consortium Network
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-cyan-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="mb-6">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-5xl mb-4 text-primary-700" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    #6 RigelCloud
                                </h2>
                                <p className="text-primary-600 font-semibold">
                                    Cloud & Data
                                </p>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Hạ tầng dữ liệu và vận hành cloud an toàn, tối ưu chi phí và khả năng mở rộng.
                            </p>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    Tính năng nổi bật
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Data Lake
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            ETL Pipeline
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Monitoring
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-primary-600 mr-3 font-bold">
                                            -
                                        </span>
                                        <span className="text-gray-700">
                                            Disaster Recovery
                                        </span>
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
                            Một hệ sinh thái mở, sẵn sàng mở rộng và đồng hành cùng ngân hàng đối tác.
                        </p>
                        <Link className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors" href="/contact">
                            Liên hệ tư vấn
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
