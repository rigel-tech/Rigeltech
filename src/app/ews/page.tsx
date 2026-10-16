
import EwsTabs from "@/components/ews/EwsTabs";

/* eslint-disable @next/next/no-img-element */
export default function EwsPage() {
    return (
        <div className="min-h-screen bg-[#0b0b0b] text-white">
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-6xl mx-auto space-y-12">
                    <header className="text-center space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-4 py-1 text-xs font-semibold text-amber-300">
                            Enterprise Grade Solution
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
                            EWS - Hệ thống Cảnh báo sớm
                        </h1>
                        <p className="text-lg font-semibold text-slate-200">
                            Giải pháp cấp doanh nghiệp cho quản trị rủi ro
                        </p>
                        <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            EWS (Early Warning System) là hệ thống cảnh báo sớm giúp theo dõi, dự báo và phản ứng kịp thời trước các rủi ro trong lĩnh vực tài chính và môi trường.
                        </p>
                    </header>
                    <section className="grid gap-6">
                        <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-1 ring-amber-400/10">
                            <h2 className="text-xl font-semibold text-amber-300">
                                Tổng quan giải pháp
                            </h2>
                            <p className="mt-3 text-slate-200/85 leading-relaxed">
                                Kiến trúc dữ liệu đa nguồn, mô hình dự báo và cảnh báo tín dụng theo thời gian thực cho ngân hàng đối tác.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-1 ring-amber-400/10">
                            <h2 className="text-xl font-semibold text-amber-300">
                                Giá trị mang lại
                            </h2>
                            <p className="mt-3 text-slate-200/85 leading-relaxed">
                                Giảm thiểu rủi ro tín dụng, nâng cao tuân thủ và rút ngắn thời gian phản ứng trước biến động thị trường.
                            </p>
                        </div>
                    </section>
                    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6">
                        <div className="prose prose-invert max-w-none text-slate-200">
                            <h2>
                                Giới thiệu về Hệ thống Cảnh báo Tín dụng Sớm (EWS)
                            </h2>
                            {" "}
                            <p>
                                Hệ thống Cảnh báo Tín dụng Sớm (EWS - Early Warning System) là giải pháp công nghệ tiên tiến được thiết kế để phát hiện sớm các dấu hiệu rủi ro tín dụng trong lĩnh vực nông nghiệp và tài chính xanh. Bằng cách tích hợp trí tuệ nhân tạo (AI) và học máy (ML), EWS giúp các tổ chức tài chính, đặc biệt là ngân hàng đối tác, chủ động quản lý rủi ro và tối ưu hóa danh mục tín dụng.
                            </p>
                            {" "}
                            <p>
                                EWS không chỉ là một công cụ giám sát mà còn là nền tảng thông minh kết nối dữ liệu từ FarmTrace (hệ thống truy xuất nguồn gốc nông sản) và QTD (Quỹ Tín Dụng Tự Động), tạo nên một hệ sinh thái toàn diện cho tín dụng xanh bền vững.
                            </p>
                            {" "}
                            <h2>
                                Công nghệ Hỗ trợ
                            </h2>
                            {" "}
                            <h3>
                                Python ML Framework
                            </h3>
                            {" "}
                            <p>
                                EWS được xây dựng trên nền tảng Python với các thư viện ML tiên tiến:
                            </p>
                            {" "}
                            <ul>
                                {" "}
                                <li>
                                    <strong>
                                        Scikit-learn
                                    </strong>
                                    : Thuật toán học máy cho phân tích rủi ro tín dụng
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        TensorFlow/PyTorch
                                    </strong>
                                    : Mạng nơ-ron sâu để dự báo xu hướng thị trường
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Pandas & NumPy
                                    </strong>
                                    : Xử lý dữ liệu lớn từ FarmTrace và QTD
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Flask/FastAPI
                                    </strong>
                                    : API backend cho tích hợp thời gian thực
                                </li>
                                {" "}
                            </ul>
                            {" "}
                            <h3>
                                AWS Cloud Infrastructure
                            </h3>
                            {" "}
                            <ul>
                                {" "}
                                <li>
                                    <strong>
                                        Amazon SageMaker
                                    </strong>
                                    : Huấn luyện và triển khai mô hình ML
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        AWS Lambda
                                    </strong>
                                    : Xử lý sự kiện thời gian thực
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Amazon S3
                                    </strong>
                                    : Lưu trữ dữ liệu lịch sử và logs
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Amazon RDS/Redshift
                                    </strong>
                                    : Cơ sở dữ liệu phân tích
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        AWS IoT Core
                                    </strong>
                                    : Kết nối với cảm biến FarmTrace
                                </li>
                                {" "}
                            </ul>
                            {" "}
                            <h3>
                                Tích hợp với FarmTrace & QTD
                            </h3>
                            {" "}
                            <ul>
                                {" "}
                                <li>
                                    <strong>
                                        FarmTrace Integration
                                    </strong>
                                    : Nhận dữ liệu canh tác thời gian thực (nhiệt độ, độ ẩm, năng suất) để đánh giá rủi ro mùa vụ
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        QTD Integration
                                    </strong>
                                    : Đồng bộ trạng thái khoản vay và lịch sử thanh toán để tinh chỉnh mô hình dự báo
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Real-time Data Pipeline
                                    </strong>
                                    : ETL pipeline tự động xử lý dữ liệu từ cả hai hệ thống
                                </li>
                                {" "}
                            </ul>
                            {" "}
                            <h2>
                                Sự Khác biệt của EWS
                            </h2>
                            {" "}
                            <h3>
                                So với Hệ thống Cảnh báo Truyền thống
                            </h3>
                            {" "}
                            <table data-path-to-node="4" style={{ marginBottom: "32px", fontFamily: "\"Google Sans Text\", sans-serif !important", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                <thead style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                    <tr style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <strong style={{ lineHeight: "1.15 !important", marginTop: "0px !important", marginBottom: "0px !important" }}>
                                                Yếu tố so sánh
                                            </strong>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <strong style={{ lineHeight: "1.15 !important", marginTop: "0px !important", marginBottom: "0px !important" }}>
                                                Hệ thống Quản trị Truyền thống
                                            </strong>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <strong style={{ lineHeight: "1.15 !important", marginTop: "0px !important", marginBottom: "0px !important" }}>
                                                Giải pháp EWS (Rigel Tech)
                                            </strong>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                    <tr style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,1,0,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                <b data-path-to-node="4,1,0,0" data-index-in-node="0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                    Nguồn dữ liệu
                                                </b>
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,1,1,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                Phụ thuộc vào báo cáo thủ công và dữ liệu tài chính quá khứ.
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,1,2,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                Tích hợp dữ liệu thời gian thực từ IoT, ảnh vệ tinh và AI phân tích đa chiều.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,2,0,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                <b data-path-to-node="4,2,0,0" data-index-in-node="0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                    Độ chính xác
                                                </b>
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,2,1,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                Đạt 60-70% (Dễ sai lệch do độ trễ của số liệu lịch sử).
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,2,2,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                Đạt{" "}
                                                <b data-path-to-node="4,2,2,0" data-index-in-node="4" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                    85-90%
                                                </b>
                                                {" "}nhờ thuật toán Machine Learning dự đoán tương lai.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,3,0,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                <b data-path-to-node="4,3,0,0" data-index-in-node="0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                    Thời gian phản hồi
                                                </b>
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,3,1,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                Tính bằng ngày hoặc tuần (Chậm trễ trong việc xử lý sự cố).
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,3,2,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                <b data-path-to-node="4,3,2,0" data-index-in-node="0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                    Tức thời (Giây - Phút)
                                                </b>
                                                {" "}ngay khi nhận diện dấu hiệu bất thường.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,4,0,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                <b data-path-to-node="4,4,0,0" data-index-in-node="0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                    Phạm vi giám sát
                                                </b>
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,4,1,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                Chỉ tập trung vào các chỉ số rủi ro tài chính cơ bản.
                                            </span>
                                        </td>
                                        <td style={{ borderWidth: "1px", borderColor: "initial", lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                            <span data-path-to-node="4,4,2,0" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                Mở rộng sang{" "}
                                                <b data-path-to-node="4,4,2,0" data-index-in-node="13" style={{ lineHeight: "1.15 !important", marginTop: "0px !important" }}>
                                                    Rủi ro môi trường, Thiên tai và Biến động mùa vụ
                                                </b>
                                                .
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {" "}
                            <h3>
                                Giá trị Cốt lõi
                            </h3>
                            {" "}
                            <ol>
                                {" "}
                                <li>
                                    <strong>
                                        Proactive Risk Management
                                    </strong>
                                    : Phát hiện rủi ro trước khi xảy ra, giảm NPL từ 3% xuống 0.5%
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Data-Driven Decisions
                                    </strong>
                                    : Ra quyết định dựa trên dữ liệu thực tế, không phải cảm tính
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Integrated Ecosystem
                                    </strong>
                                    : Kết nối liền mạch với FarmTrace và QTD cho tầm nhìn toàn diện
                                </li>
                                {" "}
                                <li>
                                    <strong>
                                        Scalable Architecture
                                    </strong>
                                    : Xây dựng trên AWS, dễ dàng mở rộng cho hàng triệu nông dân
                                </li>
                                {" "}
                            </ol>
                            {" "}
                            <h2>
                                Kết luận
                            </h2>
                            {" "}
                            <p>
                                EWS đại diện cho bước tiến quan trọng trong việc số hóa và xanh hóa ngành tài chính Việt Nam. Bằng cách kết hợp sức mạnh của AI, cloud computing và dữ liệu thực tế từ FarmTrace và QTD, hệ thống không chỉ giúp ngân hàng giảm rủi ro mà còn góp phần thúc đẩy nền kinh tế xanh bền vững.
                            </p>
                            {" "}
                            <p>
                                Với độ chính xác cao và khả năng phản hồi tức thì, EWS giúp các tổ chức tài chính tự tin mở rộng tín dụng cho nông dân nhỏ lẻ, góp phần giảm nghèo và phát triển nông nghiệp bền vững tại Việt Nam.
                            </p>
                            {" "}
                            <p>
                                <em>
                                    Liên hệ Rigel Technology để triển khai EWS cho ngân hàng của bạn ngay hôm nay.
                                </em>
                            </p>
                        </div>
                    </section>
                    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6">
                        <EwsTabs
                            tabs={[
                                {
                                    id: "architecture",
                                    label: "Kiến trúc",
                                    content: (
                                        <div className="space-y-8">
                                            <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 p-8 rounded-xl border border-emerald-500/30">
                                                <div className="max-w-6xl mx-auto">
                                                    <h3 className="text-2xl font-bold text-emerald-400 mb-8 text-center">
                                                        Kiến trúc 4 lớp - Early Warning System
                                                    </h3>
                                                    <svg viewBox="0 0 1500 850" className="w-full h-auto">
                                                        <defs>
                                                            <linearGradient id="layerGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" stopColor="#059669" stopOpacity="0.1" />
                                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                                                            </linearGradient>
                                                            <linearGradient id="layerGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.1" />
                                                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                                                            </linearGradient>
                                                            <linearGradient id="layerGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.1" />
                                                                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                                                            </linearGradient>
                                                            <linearGradient id="layerGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.1" />
                                                                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                                                            </linearGradient>
                                                        </defs>
                                                        <g>
                                                            <rect x="20" y="20" width="1160" height="160" fill="url(#layerGradient1)" stroke="#10b981" strokeWidth="2" rx="8" />
                                                            <text x="60" y="60" fontSize="24" fontWeight="bold" fill="#10b981">
                                                                Lớp Dữ liệu (Data Layer)
                                                            </text>
                                                            <g>
                                                                <rect x="60" y="80" width="220" height="80" fill="rgba(16,185,129,0.1)" stroke="#34d399" strokeWidth="2" rx="4" />
                                                                <text x="80" y="110" fontSize="14" fontWeight="bold" fill="#34d399">
                                                                    IoT & Cảm biến
                                                                </text>
                                                                <text x="80" y="135" fontSize="12" fill="#c7f0d8">
                                                                    Dữ liệu thời tiết, mùa vụ
                                                                </text>
                                                                <text x="80" y="152" fontSize="12" fill="#c7f0d8">
                                                                    Nông nghiệp, sản xuất
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="360" y="80" width="220" height="80" fill="rgba(16,185,129,0.1)" stroke="#34d399" strokeWidth="2" rx="4" />
                                                                <text x="380" y="110" fontSize="14" fontWeight="bold" fill="#34d399">
                                                                    Core Banking
                                                                </text>
                                                                <text x="380" y="135" fontSize="12" fill="#c7f0d8">
                                                                    Lịch sử tín dụng
                                                                </text>
                                                                <text x="380" y="152" fontSize="12" fill="#c7f0d8">
                                                                    Giao dịch & dòng tiền
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="660" y="80" width="220" height="80" fill="rgba(16,185,129,0.1)" stroke="#34d399" strokeWidth="2" rx="4" />
                                                                <text x="680" y="110" fontSize="14" fontWeight="bold" fill="#34d399">
                                                                    CIC & External
                                                                </text>
                                                                <text x="680" y="135" fontSize="12" fill="#c7f0d8">
                                                                    Điểm tín dụng
                                                                </text>
                                                                <text x="680" y="152" fontSize="12" fill="#c7f0d8">
                                                                    Thông tin thị trường
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="960" y="80" width="200" height="80" fill="rgba(16,185,129,0.1)" stroke="#34d399" strokeWidth="2" rx="4" />
                                                                <text x="980" y="110" fontSize="14" fontWeight="bold" fill="#34d399">
                                                                    ESG & Satellite
                                                                </text>
                                                                <text x="980" y="135" fontSize="12" fill="#c7f0d8">
                                                                    Dữ liệu ESG
                                                                </text>
                                                                <text x="980" y="152" fontSize="12" fill="#c7f0d8">
                                                                    Vệ tinh/remote sensing
                                                                </text>
                                                            </g>
                                                        </g>
                                                        <g>
                                                            <rect x="20" y="210" width="1160" height="160" fill="url(#layerGradient2)" stroke="#0891b2" strokeWidth="2" rx="8" />
                                                            <text x="60" y="250" fontSize="24" fontWeight="bold" fill="#06b6d4">
                                                                Lớp AI Scoring (Python/ML)
                                                            </text>
                                                            <g>
                                                                <rect x="60" y="270" width="220" height="80" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                                                                <text x="80" y="300" fontSize="14" fontWeight="bold" fill="#22d3ee">
                                                                    Feature Engineering
                                                                </text>
                                                                <text x="80" y="325" fontSize="12" fill="#cffafe">
                                                                    50+ biến rủi ro
                                                                </text>
                                                                <text x="80" y="342" fontSize="12" fill="#cffafe">
                                                                    DSCR, Yield, Rainfall
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="360" y="270" width="220" height="80" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                                                                <text x="380" y="300" fontSize="14" fontWeight="bold" fill="#22d3ee">
                                                                    ML Model Training
                                                                </text>
                                                                <text x="380" y="325" fontSize="12" fill="#cffafe">
                                                                    XGBoost, RNN
                                                                </text>
                                                                <text x="380" y="342" fontSize="12" fill="#cffafe">
                                                                    PD/LGD/EAD
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="660" y="270" width="220" height="80" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                                                                <text x="680" y="300" fontSize="14" fontWeight="bold" fill="#22d3ee">
                                                                    Risk Scoring
                                                                </text>
                                                                <text x="680" y="325" fontSize="12" fill="#cffafe">
                                                                    Early Warning Signals
                                                                </text>
                                                                <text x="680" y="342" fontSize="12" fill="#cffafe">
                                                                    Stress Testing
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="960" y="270" width="200" height="80" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                                                                <text x="980" y="300" fontSize="14" fontWeight="bold" fill="#22d3ee">
                                                                    Explainability
                                                                </text>
                                                                <text x="980" y="325" fontSize="12" fill="#cffafe">
                                                                    SHAP / Reason Code
                                                                </text>
                                                                <text x="980" y="342" fontSize="12" fill="#cffafe">
                                                                    Minh bạch quyết định
                                                                </text>
                                                            </g>
                                                        </g>
                                                        <g>
                                                            <rect x="20" y="400" width="1160" height="160" fill="url(#layerGradient3)" stroke="#a855f7" strokeWidth="2" rx="8" />
                                                            <text x="60" y="440" fontSize="24" fontWeight="bold" fill="#d8b4fe">
                                                                Lớp Xác thực (Blockchain)
                                                            </text>
                                                            <g>
                                                                <rect x="60" y="460" width="280" height="80" fill="rgba(168,85,247,0.1)" stroke="#e9d5ff" strokeWidth="2" rx="4" />
                                                                <text x="80" y="490" fontSize="14" fontWeight="bold" fill="#e9d5ff">
                                                                    Immutable Ledger
                                                                </text>
                                                                <text x="80" y="515" fontSize="12" fill="#faf5ff">
                                                                    Lưu vết dữ liệu
                                                                </text>
                                                                <text x="80" y="532" fontSize="12" fill="#faf5ff">
                                                                    Chống sửa đổi
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="420" y="460" width="280" height="80" fill="rgba(168,85,247,0.1)" stroke="#e9d5ff" strokeWidth="2" rx="4" />
                                                                <text x="440" y="490" fontSize="14" fontWeight="bold" fill="#e9d5ff">
                                                                    Smart Contract
                                                                </text>
                                                                <text x="440" y="515" fontSize="12" fill="#faf5ff">
                                                                    Xác thực giao dịch
                                                                </text>
                                                                <text x="440" y="532" fontSize="12" fill="#faf5ff">
                                                                    Tự động hóa
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="780" y="460" width="360" height="80" fill="rgba(168,85,247,0.1)" stroke="#e9d5ff" strokeWidth="2" rx="4" />
                                                                <text x="800" y="490" fontSize="14" fontWeight="bold" fill="#e9d5ff">
                                                                    Audit Trail
                                                                </text>
                                                                <text x="800" y="515" fontSize="12" fill="#faf5ff">
                                                                    Truy xuất nguồn gốc
                                                                </text>
                                                                <text x="800" y="532" fontSize="12" fill="#faf5ff">
                                                                    Đối soát minh bạch
                                                                </text>
                                                            </g>
                                                        </g>
                                                        <g>
                                                            <rect x="20" y="590" width="1160" height="160" fill="url(#layerGradient4)" stroke="#ef4444" strokeWidth="2" rx="8" />
                                                            <text x="60" y="630" fontSize="24" fontWeight="bold" fill="#fca5a5">
                                                                Lớp Giao diện & Hành động
                                                            </text>
                                                            <g>
                                                                <rect x="60" y="650" width="280" height="80" fill="rgba(239,68,68,0.1)" stroke="#fecaca" strokeWidth="2" rx="4" />
                                                                <text x="80" y="680" fontSize="14" fontWeight="bold" fill="#fecaca">
                                                                    Dashboard & BI
                                                                </text>
                                                                <text x="80" y="705" fontSize="12" fill="#ffe2e2">
                                                                    Theo dõi danh mục
                                                                </text>
                                                                <text x="80" y="722" fontSize="12" fill="#ffe2e2">
                                                                    Cảnh báo realtime
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="420" y="650" width="280" height="80" fill="rgba(239,68,68,0.1)" stroke="#fecaca" strokeWidth="2" rx="4" />
                                                                <text x="440" y="680" fontSize="14" fontWeight="bold" fill="#fecaca">
                                                                    API Integration
                                                                </text>
                                                                <text x="440" y="705" fontSize="12" fill="#ffe2e2">
                                                                    Kết nối Core
                                                                </text>
                                                                <text x="440" y="722" fontSize="12" fill="#ffe2e2">
                                                                    Open API
                                                                </text>
                                                            </g>
                                                            <g>
                                                                <rect x="780" y="650" width="360" height="80" fill="rgba(239,68,68,0.1)" stroke="#fecaca" strokeWidth="2" rx="4" />
                                                                <text x="800" y="680" fontSize="14" fontWeight="bold" fill="#fecaca">
                                                                    Smart Triggers
                                                                </text>
                                                                <text x="800" y="705" fontSize="12" fill="#ffe2e2">
                                                                    Kích hoạt quy trình
                                                                </text>
                                                                <text x="800" y="722" fontSize="12" fill="#ffe2e2">
                                                                    Giảm thiểu rủi ro
                                                                </text>
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                                                <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
                                                            </marker>
                                                        </defs>
                                                        <line x1="600" y1="180" x2="600" y2="210" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
                                                        <line x1="600" y1="370" x2="600" y2="400" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
                                                        <line x1="600" y1="560" x2="600" y2="590" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
                                                    </svg>
                                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div className="group bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-5 rounded-lg border border-emerald-500/50 hover:border-emerald-400/80 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer">
                                                            <div className="flex items-start gap-3">
                                                                <div className="text-2xl">
                                                                    ✅
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-emerald-400 font-bold mb-2 group-hover:text-emerald-300 transition-colors">
                                                                        Data Residency
                                                                    </h4>
                                                                    <p className="text-sm text-emerald-100/80 group-hover:text-emerald-100 transition-colors">
                                                                        AWS ap-southeast-1, lưu trữ dữ liệu tại Việt Nam.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="group bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-5 rounded-lg border border-emerald-500/50 hover:border-emerald-400/80 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer">
                                                            <div className="flex items-start gap-3">
                                                                <div className="text-2xl">
                                                                    ✅
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-emerald-400 font-bold mb-2 group-hover:text-emerald-300 transition-colors">
                                                                        AES-256 & mTLS
                                                                    </h4>
                                                                    <p className="text-sm text-emerald-100/80 group-hover:text-emerald-100 transition-colors">
                                                                        Mã hóa dữ liệu và truyền thông an toàn.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="group bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-5 rounded-lg border border-emerald-500/50 hover:border-emerald-400/80 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer">
                                                            <div className="flex items-start gap-3">
                                                                <div className="text-2xl">
                                                                    ✅
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-emerald-400 font-bold mb-2 group-hover:text-emerald-300 transition-colors">
                                                                        Predictive Analytics
                                                                    </h4>
                                                                    <p className="text-sm text-emerald-100/80 group-hover:text-emerald-100 transition-colors">
                                                                        Dự báo rủi ro theo thời gian thực.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="group bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-5 rounded-lg border border-emerald-500/50 hover:border-emerald-400/80 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer">
                                                            <div className="flex items-start gap-3">
                                                                <div className="text-2xl">
                                                                    ✅
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-emerald-400 font-bold mb-2 group-hover:text-emerald-300 transition-colors">
                                                                        Immutable Ledger
                                                                    </h4>
                                                                    <p className="text-sm text-emerald-100/80 group-hover:text-emerald-100 transition-colors">
                                                                        Sổ cái bất biến cho truy xuất nguồn gốc.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-12 pt-8 border-t border-emerald-500/20">
                                                        <h4 className="text-lg font-bold text-emerald-400 mb-8 text-center">
                                                            Luồng xử lý
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 items-stretch">
                                                            <div className="flex flex-col items-center">
                                                                <div className="bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg">
                                                                    1
                                                                </div>
                                                                <h5 className="font-bold text-emerald-400 text-center mb-2">
                                                                    Thu thập dữ liệu
                                                                </h5>
                                                                <p className="text-xs text-center text-slate-300">
                                                                    Kết nối IoT, Core Banking, CIC và dữ liệu thị trường.
                                                                </p>
                                                            </div>
                                                            <div className="hidden md:flex items-center justify-center md:px-2">
                                                                <div className="text-emerald-500 text-2xl">
                                                                    →
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-center">
                                                                <div className="bg-gradient-to-b from-purple-600 to-purple-700 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg">
                                                                    2
                                                                </div>
                                                                <h5 className="font-bold text-purple-400 text-center mb-2">
                                                                    Xác thực & chuẩn hóa
                                                                </h5>
                                                                <p className="text-xs text-center text-slate-300">
                                                                    Blockchain + Data Quality đảm bảo dữ liệu tin cậy.
                                                                </p>
                                                            </div>
                                                            <div className="hidden md:flex items-center justify-center md:px-2">
                                                                <div className="text-purple-500 text-2xl">
                                                                    →
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-center">
                                                                <div className="bg-gradient-to-b from-cyan-600 to-cyan-700 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg">
                                                                    3
                                                                </div>
                                                                <h5 className="font-bold text-cyan-400 text-center mb-2">
                                                                    Chấm điểm rủi ro
                                                                </h5>
                                                                <p className="text-xs text-center text-slate-300">
                                                                    AI Scoring, Explainability và Early Warning Signals.
                                                                </p>
                                                            </div>
                                                            <div className="hidden md:flex items-center justify-center md:px-2">
                                                                <div className="text-cyan-500 text-2xl">
                                                                    →
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-center">
                                                                <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg">
                                                                    4
                                                                </div>
                                                                <h5 className="font-bold text-green-400 text-center mb-2">
                                                                    Kích hoạt hành động
                                                                </h5>
                                                                <p className="text-xs text-center text-slate-300">
                                                                    Dashboard, API và cảnh báo tự động tới đơn vị phụ trách.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-12 pt-8 border-t border-emerald-500/20">
                                                        <h4 className="text-lg font-bold text-red-400 mb-6 text-center">
                                                            Tuân thủ & An toàn
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 hover:bg-red-900/30 transition-colors">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="text-xl">
                                                                        📜
                                                                    </span>
                                                                    <div>
                                                                        <h5 className="text-red-400 font-bold mb-1">
                                                                            Nghị định 13/2023/NĐ-CP
                                                                        </h5>
                                                                        <p className="text-xs text-slate-300">
                                                                            Bảo vệ dữ liệu cá nhân và quyền riêng tư.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 hover:bg-red-900/30 transition-colors">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="text-xl">
                                                                        🏦
                                                                    </span>
                                                                    <div>
                                                                        <h5 className="text-red-400 font-bold mb-1">
                                                                            Thông tư NHNN
                                                                        </h5>
                                                                        <p className="text-xs text-slate-300">
                                                                            Tuân thủ quy định ngân hàng và lưu trữ dữ liệu.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 hover:bg-yellow-900/30 transition-colors">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="text-xl">
                                                                        ✅
                                                                    </span>
                                                                    <div>
                                                                        <h5 className="text-yellow-400 font-bold mb-1">
                                                                            ISO/IEC 27001
                                                                        </h5>
                                                                        <p className="text-xs text-slate-300">
                                                                            Quản trị an toàn thông tin cấp doanh nghiệp.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="text-xl">
                                                                        🔍
                                                                    </span>
                                                                    <div>
                                                                        <h5 className="text-blue-400 font-bold mb-1">
                                                                            Audit & Backtesting
                                                                        </h5>
                                                                        <p className="text-xs text-slate-300">
                                                                            Kiểm soát mô hình và báo cáo định kỳ.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 p-8 rounded-xl border border-emerald-500/30">
                                                <h3 className="text-2xl font-bold text-emerald-400 mb-8 text-center">
                                                    Luồng dữ liệu & cảnh báo sớm
                                                </h3>
                                                <svg viewBox="0 0 1200 940" className="w-full h-auto">
                                                    <g>
                                                        <rect x="20" y="20" width="1160" height="180" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="2" rx="8" />
                                                        <text x="40" y="50" fontSize="20" fontWeight="bold" fill="#10b981">
                                                            Lớp 1: Nguồn dữ liệu
                                                        </text>
                                                        <g>
                                                            <rect x="40" y="70" width="250" height="110" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" rx="4" />
                                                            <text x="60" y="100" fontSize="14" fontWeight="bold" fill="#22c55e">
                                                                FarmTrace
                                                            </text>
                                                            <text x="60" y="125" fontSize="12" fill="#86efac">
                                                                IoT/Satellite
                                                            </text>
                                                            <text x="60" y="145" fontSize="12" fill="#86efac">
                                                                Dữ liệu mùa vụ
                                                            </text>
                                                            <text x="60" y="165" fontSize="11" fill="#a7f3d0">
                                                                Chuỗi cung ứng
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="320" y="70" width="200" height="110" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="2" rx="4" />
                                                            <text x="340" y="100" fontSize="14" fontWeight="bold" fill="#06b6d4">
                                                                Core Banking
                                                            </text>
                                                            <text x="340" y="125" fontSize="12" fill="#cffafe">
                                                                Dòng tiền
                                                            </text>
                                                            <text x="340" y="145" fontSize="12" fill="#cffafe">
                                                                Lịch sử tín dụng
                                                            </text>
                                                            <text x="340" y="165" fontSize="12" fill="#cffafe">
                                                                Hành vi trả nợ
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="550" y="70" width="200" height="110" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" rx="4" />
                                                            <text x="570" y="100" fontSize="14" fontWeight="bold" fill="#a855f7">
                                                                CIC & Thị trường
                                                            </text>
                                                            <text x="570" y="125" fontSize="12" fill="#e9d5ff">
                                                                Điểm tín dụng
                                                            </text>
                                                            <text x="570" y="145" fontSize="12" fill="#e9d5ff">
                                                                Thông tin ngành
                                                            </text>
                                                            <text x="570" y="165" fontSize="12" fill="#e9d5ff">
                                                                Xu hướng vĩ mô
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="780" y="70" width="200" height="110" fill="rgba(236,72,153,0.1)" stroke="#ec4899" strokeWidth="2" rx="4" />
                                                            <text x="800" y="100" fontSize="14" fontWeight="bold" fill="#ec4899">
                                                                ESG & Compliance
                                                            </text>
                                                            <text x="800" y="125" fontSize="12" fill="#fbcfe8">
                                                                Chỉ số ESG
                                                            </text>
                                                            <text x="800" y="145" fontSize="12" fill="#fbcfe8">
                                                                Green compliance
                                                            </text>
                                                            <text x="800" y="165" fontSize="12" fill="#fbcfe8">
                                                                Báo cáo định kỳ
                                                            </text>
                                                        </g>
                                                    </g>
                                                    <line x1="165" y1="190" x2="165" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowgreen)" />
                                                    <line x1="420" y1="190" x2="420" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowgreen)" />
                                                    <line x1="650" y1="190" x2="650" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowgreen)" />
                                                    <line x1="880" y1="190" x2="880" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowgreen)" />
                                                    <g>
                                                        <rect x="20" y="220" width="1160" height="160" fill="rgba(6,182,212,0.05)" stroke="#0891b2" strokeWidth="2" rx="8" />
                                                        <text x="40" y="250" fontSize="20" fontWeight="bold" fill="#06b6d4">
                                                            Lớp 2: Xác thực & chuẩn hóa
                                                        </text>
                                                        <g>
                                                            <rect x="60" y="270" width="280" height="90" fill="rgba(168,85,247,0.1)" stroke="#d8b4fe" strokeWidth="2" rx="4" />
                                                            <text x="80" y="300" fontSize="13" fontWeight="bold" fill="#d8b4fe">
                                                                Smart Contract Validation
                                                            </text>
                                                            <text x="80" y="325" fontSize="11" fill="#faf5ff">
                                                                Xác thực dữ liệu
                                                            </text>
                                                            <text x="80" y="345" fontSize="11" fill="#faf5ff">
                                                                Hash & timestamp
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="380" y="270" width="280" height="90" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                                                            <text x="400" y="300" fontSize="13" fontWeight="bold" fill="#22d3ee">
                                                                AWS ETL Pipeline
                                                            </text>
                                                            <text x="400" y="325" fontSize="11" fill="#cffafe">
                                                                Chuẩn hóa đa nguồn
                                                            </text>
                                                            <text x="400" y="345" fontSize="11" fill="#cffafe">
                                                                Data Lake
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="700" y="270" width="280" height="90" fill="rgba(34,197,94,0.1)" stroke="#86efac" strokeWidth="2" rx="4" />
                                                            <text x="720" y="300" fontSize="13" fontWeight="bold" fill="#86efac">
                                                                Data Quality Check
                                                            </text>
                                                            <text x="720" y="325" fontSize="11" fill="#a7f3d0">
                                                                Phát hiện bất thường
                                                            </text>
                                                            <text x="720" y="345" fontSize="11" fill="#a7f3d0">
                                                                Loại nhiễu dữ liệu
                                                            </text>
                                                        </g>
                                                    </g>
                                                    <line x1="200" y1="380" x2="200" y2="410" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrowcyan)" />
                                                    <line x1="520" y1="380" x2="520" y2="410" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrowcyan)" />
                                                    <line x1="840" y1="380" x2="840" y2="410" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrowcyan)" />
                                                    <g>
                                                        <rect x="20" y="410" width="1160" height="180" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="2" rx="8" />
                                                        <text x="40" y="440" fontSize="20" fontWeight="bold" fill="#d8b4fe">
                                                            Lớp 3: AI Engine
                                                        </text>
                                                        <g>
                                                            <rect x="60" y="460" width="240" height="110" fill="rgba(168,85,247,0.1)" stroke="#e9d5ff" strokeWidth="2" rx="4" />
                                                            <text x="80" y="490" fontSize="13" fontWeight="bold" fill="#e9d5ff">
                                                                Feature Engineering
                                                            </text>
                                                            <text x="80" y="515" fontSize="11" fill="#faf5ff">
                                                                Yield/DSCR/Rainfall
                                                            </text>
                                                            <text x="80" y="535" fontSize="11" fill="#faf5ff">
                                                                Hành vi tín dụng
                                                            </text>
                                                            <text x="80" y="555" fontSize="10" fill="#f3e8ff">
                                                                Tín hiệu cảnh báo
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="340" y="460" width="240" height="110" fill="rgba(168,85,247,0.1)" stroke="#e9d5ff" strokeWidth="2" rx="4" />
                                                            <text x="360" y="490" fontSize="13" fontWeight="bold" fill="#e9d5ff">
                                                                ML Model Training
                                                            </text>
                                                            <text x="360" y="515" fontSize="11" fill="#faf5ff">
                                                                XGBoost/RNN
                                                            </text>
                                                            <text x="360" y="535" fontSize="11" fill="#faf5ff">
                                                                PD/LGD/EAD
                                                            </text>
                                                            <text x="360" y="555" fontSize="10" fill="#f3e8ff">
                                                                Backtesting
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="620" y="460" width="240" height="110" fill="rgba(168,85,247,0.1)" stroke="#e9d5ff" strokeWidth="2" rx="4" />
                                                            <text x="640" y="490" fontSize="13" fontWeight="bold" fill="#e9d5ff">
                                                                Risk Scoring
                                                            </text>
                                                            <text x="640" y="515" fontSize="11" fill="#faf5ff">
                                                                Cảnh báo sớm
                                                            </text>
                                                            <text x="640" y="535" fontSize="11" fill="#faf5ff">
                                                                Stress Testing
                                                            </text>
                                                            <text x="640" y="555" fontSize="10" fill="#f3e8ff">
                                                                Threshold alert
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="900" y="460" width="240" height="110" fill="rgba(168,85,247,0.1)" stroke="#e9d5ff" strokeWidth="2" rx="4" />
                                                            <text x="920" y="490" fontSize="13" fontWeight="bold" fill="#e9d5ff">
                                                                Explainability
                                                            </text>
                                                            <text x="920" y="515" fontSize="11" fill="#faf5ff">
                                                                SHAP/Reason Code
                                                            </text>
                                                            <text x="920" y="535" fontSize="11" fill="#faf5ff">
                                                                Minh bạch quyết định
                                                            </text>
                                                            <text x="920" y="555" fontSize="10" fill="#f3e8ff">
                                                                Trust & Compliance
                                                            </text>
                                                        </g>
                                                    </g>
                                                    <line x1="600" y1="590" x2="600" y2="620" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowpurple)" />
                                                    <g>
                                                        <rect x="20" y="620" width="1160" height="250" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="2" rx="8" />
                                                        <text x="40" y="650" fontSize="20" fontWeight="bold" fill="#fca5a5">
                                                            Lớp 4: Giao diện & Hành động
                                                        </text>
                                                        <g>
                                                            <rect x="60" y="680" width="320" height="170" fill="rgba(239,68,68,0.1)" stroke="#fecaca" strokeWidth="2" rx="4" />
                                                            <text x="80" y="710" fontSize="13" fontWeight="bold" fill="#fecaca">
                                                                EWS Dashboard & BI
                                                            </text>
                                                            <text x="80" y="735" fontSize="11" fill="#ffe2e2">
                                                                Theo dõi danh mục
                                                            </text>
                                                            <text x="80" y="755" fontSize="11" fill="#ffe2e2">
                                                                Rủi ro theo ngành/vùng
                                                            </text>
                                                            <text x="80" y="775" fontSize="11" fill="#ffe2e2">
                                                                Cảnh báo realtime
                                                            </text>
                                                            <text x="80" y="795" fontSize="11" fill="#ffe2e2">
                                                                Audit trail & báo cáo
                                                            </text>
                                                            <text x="80" y="835" fontSize="10" fill="#fecaca" fontWeight="bold">
                                                                Tích hợp API vào Core Banking
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="420" y="680" width="320" height="170" fill="rgba(34,197,94,0.1)" stroke="#86efac" strokeWidth="2" rx="4" />
                                                            <text x="440" y="710" fontSize="13" fontWeight="bold" fill="#86efac">
                                                                Ưu đãi tín dụng xanh
                                                            </text>
                                                            <text x="440" y="735" fontSize="11" fill="#a7f3d0">
                                                                {"PD < 30%"}
                                                            </text>
                                                            <text x="440" y="755" fontSize="11" fill="#a7f3d0">
                                                                Tăng hạn mức
                                                            </text>
                                                            <text x="440" y="775" fontSize="11" fill="#a7f3d0">
                                                                Giảm lãi suất
                                                            </text>
                                                            <text x="440" y="795" fontSize="11" fill="#a7f3d0">
                                                                Gia hạn ưu đãi
                                                            </text>
                                                            <text x="440" y="815" fontSize="10" fill="#a7f3d0" fontWeight="bold">
                                                                Kích hoạt Smart Contract
                                                            </text>
                                                            <text x="440" y="835" fontSize="10" fill="#a7f3d0">
                                                                Feedback loop retrain
                                                            </text>
                                                        </g>
                                                        <g>
                                                            <rect x="780" y="680" width="320" height="170" fill="rgba(234,179,8,0.1)" stroke="#fbbf24" strokeWidth="2" rx="4" />
                                                            <text x="800" y="710" fontSize="13" fontWeight="bold" fill="#fbbf24">
                                                                Cảnh báo vàng
                                                            </text>
                                                            <text x="800" y="735" fontSize="11" fill="#fef3c7">
                                                                PD 30-60%
                                                            </text>
                                                            <text x="800" y="755" fontSize="11" fill="#fef3c7">
                                                                Giảm hạn mức
                                                            </text>
                                                            <text x="800" y="775" fontSize="11" fill="#fef3c7">
                                                                Yêu cầu bổ sung tài sản
                                                            </text>
                                                            <text x="800" y="795" fontSize="11" fill="#fef3c7">
                                                                Tăng tần suất giám sát
                                                            </text>
                                                            <text x="800" y="815" fontSize="10" fill="#fef3c7" fontWeight="bold">
                                                                Đánh giá lại rủi ro
                                                            </text>
                                                            <text x="800" y="835" fontSize="10" fill="#fef3c7">
                                                                Gửi Risk Team
                                                            </text>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <rect x="60" y="885" width="1100" height="40" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="2" rx="4" />
                                                        <text x="80" y="912" fontSize="12" fontWeight="bold" fill="#fca5a5">
                                                            {"CẢNH BÁO ĐỎ: Nếu PD > 60% hoặc Greenwashing Index > 50% → Tạm dừng giải ngân + Thông báo tức thì"}
                                                        </text>
                                                    </g>
                                                    <defs>
                                                        <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                                            <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
                                                        </marker>
                                                        <marker id="arrowcyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                                            <polygon points="0 0, 10 3, 0 6" fill="#0891b2" />
                                                        </marker>
                                                        <marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                                            <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
                                                        </marker>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    id: "compliance",
                                    label: "Tuân thủ",
                                    content: (
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="rounded-xl border p-4 bg-emerald-500/10 border-emerald-400/40 text-emerald-200">
                                                <h4 className="text-base font-semibold mb-2">
                                                    Nghị định 13/2023/NĐ-CP
                                                </h4>
                                                <p className="text-sm text-slate-200/80">
                                                    Bảo vệ dữ liệu cá nhân và Data Residency tại Việt Nam.
                                                </p>
                                            </div>
                                            <div className="rounded-xl border p-4 bg-cyan-500/10 border-cyan-400/40 text-cyan-200">
                                                <h4 className="text-base font-semibold mb-2">
                                                    Thông tư NHNN
                                                </h4>
                                                <p className="text-sm text-slate-200/80">
                                                    Tuân thủ chuẩn kết nối Core Banking và CIC.
                                                </p>
                                            </div>
                                            <div className="rounded-xl border p-4 bg-yellow-500/10 border-yellow-400/40 text-yellow-200">
                                                <h4 className="text-base font-semibold mb-2">
                                                    ISO 27001
                                                </h4>
                                                <p className="text-sm text-slate-200/80">
                                                    Quản trị an toàn thông tin và kiểm soát rủi ro.
                                                </p>
                                            </div>
                                            <div className="rounded-xl border p-4 bg-blue-500/10 border-blue-400/40 text-blue-200">
                                                <h4 className="text-base font-semibold mb-2">
                                                    Audit & Logging
                                                </h4>
                                                <p className="text-sm text-slate-200/80">
                                                    Giám sát, lưu vết và kiểm toán toàn bộ giao dịch.
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    id: "risk",
                                    label: "Rủi ro",
                                    content: (
                                        <div className="rounded-2xl border border-amber-500/30 bg-slate-900/60 p-6">
                                            <h4 className="text-lg font-semibold text-amber-300 mb-4">
                                                Quản trị rủi ro chủ động
                                            </h4>
                                            <ul className="space-y-3 text-sm text-slate-200 list-disc list-inside">
                                                <li>
                                                    Backtesting hàng quý để đánh giá độ chính xác mô hình.
                                                </li>
                                                <li>
                                                    Tái huấn luyện mô hình AI định kỳ theo biến động thị trường.
                                                </li>
                                                <li>
                                                    Stress testing theo các kịch bản rủi ro vĩ mô.
                                                </li>
                                                <li>
                                                    Early Warning Signals kích hoạt trước khi nợ xấu phát sinh.
                                                </li>
                                                <li>
                                                    Cơ chế phê duyệt đa tầng và log minh bạch.
                                                </li>
                                            </ul>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </section>
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 text-emerald-300">
                            <h2 className="text-2xl font-semibold">
                                Công nghệ đột phá
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200/20 bg-gradient-to-br p-6 from-blue-100/60 to-blue-200/60 text-blue-700">
                                <h3 className="text-lg font-semibold mb-3 text-slate-800">
                                    AI & Machine Learning (Python)
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                                    <li>
                                        Scikit-learn, TensorFlow/PyTorch
                                    </li>
                                    <li>
                                        XGBoost & RNN cho Predictive Analytics
                                    </li>
                                    <li>
                                        Feature Engineering 50+ biến rủi ro
                                    </li>
                                    <li>
                                        Tái huấn luyện định kỳ
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-slate-200/20 bg-gradient-to-br p-6 from-purple-100/60 to-purple-200/60 text-purple-700">
                                <h3 className="text-lg font-semibold mb-3 text-slate-800">
                                    Blockchain & Smart Contracts
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                                    <li>
                                        Immutable Ledger cho truy xuất nguồn gốc
                                    </li>
                                    <li>
                                        Smart Contract Validation
                                    </li>
                                    <li>
                                        Audit Trail minh bạch
                                    </li>
                                    <li>
                                        Zero-Trust Access
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-slate-200/20 bg-gradient-to-br p-6 from-emerald-100/60 to-emerald-200/60 text-emerald-700">
                                <h3 className="text-lg font-semibold mb-3 text-slate-800">
                                    AWS Cloud Infrastructure
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                                    <li>
                                        AWS ap-southeast-1, Data Residency
                                    </li>
                                    <li>
                                        S3 Data Lake + RDS
                                    </li>
                                    <li>
                                        KMS/HSM cho mã hóa
                                    </li>
                                    <li>
                                        Multi-AZ & DR
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-slate-200/20 bg-gradient-to-br p-6 from-amber-100/60 to-amber-200/60 text-amber-700">
                                <h3 className="text-lg font-semibold mb-3 text-slate-800">
                                    Security & Compliance
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                                    <li>
                                        AES-256 at rest
                                    </li>
                                    <li>
                                        mTLS/TLS 1.3 in transit
                                    </li>
                                    <li>
                                        RBAC + MFA
                                    </li>
                                    <li>
                                        Tuân thủ Nghị định 13/2023/NĐ-CP
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="rounded-2xl border border-emerald-500/30 bg-emerald-900/10 p-8">
                        <h2 className="text-2xl font-semibold text-emerald-300 mb-2">
                            Tầm nhìn chiến lược
                        </h2>
                        <p className="text-emerald-100/80 mb-6">
                            EWS giúp ngân hàng chủ động quản trị rủi ro, tối ưu danh mục và gia tăng hiệu quả tín dụng xanh.
                        </p>
                        <div className="rounded-xl bg-emerald-900/40 border border-emerald-400/30 p-4">
                            <p className="text-emerald-200 font-semibold">
                                Thông điệp chính: Biến dữ liệu thành lá chắn rủi ro và động lực tăng trưởng bền vững.
                            </p>
                        </div>
                    </section>
                    <section className="rounded-2xl border border-blue-200/40 bg-gradient-to-r from-blue-100/90 to-blue-50/90 p-10 text-center text-slate-800">
                        <h2 className="text-2xl font-semibold text-blue-700">
                            Sẵn sàng triển khai EWS?
                        </h2>
                        <p className="mt-3 text-slate-600">
                            Chúng tôi cung cấp demo hệ thống, technical assessment chi tiết và roadmap triển khai tuỳ biến.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <button className="rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold shadow hover:bg-emerald-500">
                                Liên hệ ngay
                            </button>
                            <button className="rounded-full bg-slate-800 px-6 py-3 text-white font-semibold shadow hover:bg-slate-700">
                                Yêu cầu demo
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
