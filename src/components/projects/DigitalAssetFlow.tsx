export default function DigitalAssetFlow() {
    return (
        <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 p-8 rounded-xl border border-cyan-500/30">
            <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2 text-center">
                    Digital Asset Tracking - Token hóa Tài chính Xanh
                </h3>
                <p className="text-cyan-200 text-center mb-8 text-sm">
                    Từ nguồn tài sản đến thanh khoản thị trường thứ cấp
                </p>
                <svg viewBox="0 0 1100 850" className="w-full h-auto">
                    <defs>
                        <marker id="arrowCyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
                        </marker>
                        <linearGradient id="stepGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <g>
                        <circle cx="100" cy="100" r="50" fill="url(#stepGradCyan)" stroke="#06b6d4" strokeWidth="3" />
                        <text x="100" y="110" textAnchor="middle" fontSize="48" fill="#06b6d4">
                            1
                        </text>
                        <rect x="20" y="180" width="160" height="120" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                        <text x="100" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#22d3ee">
                            Tài sản Xanh
                        </text>
                        <text x="30" y="230" fontSize="11" fill="#cffafe">
                            Trang trại năng lượng mặt trời
                        </text>
                        <text x="30" y="250" fontSize="11" fill="#cffafe">
                            Trồng rừng
                        </text>
                        <text x="30" y="270" fontSize="11" fill="#cffafe">
                            Tiết kiệm năng lượng
                        </text>
                    </g>
                    <line x1="280" y1="100" x2="380" y2="100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan)" strokeDasharray="5,5" />
                    <g>
                        <circle cx="500" cy="100" r="50" fill="url(#stepGradCyan)" stroke="#06b6d4" strokeWidth="3" />
                        <text x="500" y="110" textAnchor="middle" fontSize="48" fill="#06b6d4">
                            2
                        </text>
                        <rect x="380" y="180" width="240" height="120" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                        <text x="500" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#22d3ee">
                            Hợp đồng Thông minh
                        </text>
                        <text x="390" y="230" fontSize="11" fill="#cffafe">
                            1:1 tài sản đảm bảo
                        </text>
                        <text x="390" y="250" fontSize="11" fill="#cffafe">
                            Định giá tự động
                        </text>
                        <text x="390" y="270" fontSize="11" fill="#cffafe">
                            Giao dịch được
                        </text>
                    </g>
                    <line x1="720" y1="100" x2="820" y2="100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan)" strokeDasharray="5,5" />
                    <g>
                        <circle cx="900" cy="100" r="50" fill="url(#stepGradCyan)" stroke="#06b6d4" strokeWidth="3" />
                        <text x="900" y="110" textAnchor="middle" fontSize="48" fill="#06b6d4">
                            3
                        </text>
                        <rect x="780" y="180" width="240" height="120" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                        <text x="900" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#22d3ee">
                            Hồ thanh khoản
                        </text>
                        <text x="790" y="230" fontSize="11" fill="#cffafe">
                            LP kiếm phí
                        </text>
                        <text x="790" y="250" fontSize="11" fill="#cffafe">
                            Khám phá giá
                        </text>
                    </g>
                    <line x1="500" y1="360" x2="500" y2="440" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan)" strokeDasharray="5,5" />
                    <circle cx="500" cy="520" r="50" fill="url(#stepGradCyan)" stroke="#06b6d4" strokeWidth="3" />
                    <text x="500" y="530" textAnchor="middle" fontSize="48" fill="#06b6d4">
                        4
                    </text>
                    <rect x="280" y="590" width="500" height="100" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="2" rx="4" />
                    <text x="500" y="615" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#06b6d4">
                        Thị trường thứ cấp
                    </text>
                    <text x="300" y="640" fontSize="12" fill="#ecf0f1">
                        Hồ thanh khoản (AMM)
                    </text>
                    <text x="300" y="660" fontSize="12" fill="#ecf0f1">
                        Lợi ích thanh khoản hệ sinh thái và định giá
                    </text>
                    <rect x="50" y="380" width="200" height="140" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                    <text x="150" y="405" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#22d3ee">
                        Oracle
                    </text>
                    <text x="60" y="430" fontSize="11" fill="#cffafe">
                        Nguồn tài sản xanh
                    </text>
                    <text x="60" y="460" fontSize="11" fill="#cffafe">
                        Token hóa hợp đồng thông minh
                    </text>
                    <text x="60" y="490" fontSize="11" fill="#cffafe">
                        Lợi ích thanh khoản hệ sinh thái và định giá
                    </text>
                    <rect x="750" y="380" width="200" height="140" fill="rgba(6,182,212,0.1)" stroke="#22d3ee" strokeWidth="2" rx="4" />
                    <text x="850" y="405" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#22d3ee">
                        Liên kết chuỗi
                    </text>
                    <text x="760" y="430" fontSize="11" fill="#cffafe">
                        Ethereum / BSC / Polygon
                    </text>
                    <text x="760" y="460" fontSize="11" fill="#cffafe">
                        Giao dịch thị trường thứ cấp
                    </text>
                    <text x="760" y="490" fontSize="11" fill="#cffafe">
                        Lợi ích thanh khoản hệ sinh thái và định giá
                    </text>
                </svg>
                <div className="mt-8 bg-cyan-900/20 border border-cyan-500/50 p-4 rounded">
                    <p className="text-cyan-300 text-sm">
                        <span className="font-bold">
                            Tài sản Xanh:
                        </span>
                        {" "}{"Token hóa hợp đồng thông minh -> Hồ thanh khoản (AMM) -> Giao dịch thị trường thứ cấp"}
                    </p>
                </div>
            </div>
        </div>
    );
}
