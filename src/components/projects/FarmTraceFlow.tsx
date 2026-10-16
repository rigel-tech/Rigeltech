export default function FarmTraceFlow() {
    return (
        <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 p-8 rounded-xl border border-green-500/30">
            <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl font-bold text-green-400 mb-2 text-center">
                    Kịch bản A: FarmTrace → Tín dụng Xanh
                </h3>
                <p className="text-green-200 text-center mb-8 text-sm">
                    Từ nông trường đến Ngân Hàng Đối Tác qua Blockchain & AI
                </p>
                <svg viewBox="0 0 1100 800" className="w-full h-auto">
                    <defs>
                        <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
                        </marker>
                        <linearGradient id="stepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <g>
                        <circle cx="100" cy="100" r="50" fill="url(#stepGrad)" stroke="#22c55e" strokeWidth="3" />
                        <text x="100" y="110" textAnchor="middle" fontSize="48" fill="#22c55e">
                            1
                        </text>
                        <rect x="20" y="180" width="160" height="120" fill="rgba(34,197,94,0.1)" stroke="#4ade80" strokeWidth="2" rx="4" />
                        <text x="100" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4ade80">
                            Thu thập Dữ liệu
                        </text>
                        <text x="30" y="230" fontSize="11" fill="#bbf7d0">
                            10 hecta lúa
                        </text>
                        <text x="30" y="250" fontSize="11" fill="#bbf7d0">
                            Phát thải thấp
                        </text>
                        <text x="30" y="270" fontSize="11" fill="#bbf7d0">
                            IoT + Drone
                        </text>
                        <text x="30" y="290" fontSize="11" fill="#bbf7d0">
                            Quét SAT
                        </text>
                    </g>
                    <line x1="280" y1="100" x2="380" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" strokeDasharray="5,5" />
                    <g>
                        <circle cx="500" cy="100" r="50" fill="url(#stepGrad)" stroke="#22c55e" strokeWidth="3" />
                        <text x="500" y="110" textAnchor="middle" fontSize="48" fill="#22c55e">
                            2
                        </text>
                        <rect x="380" y="180" width="240" height="120" fill="rgba(34,197,94,0.1)" stroke="#4ade80" strokeWidth="2" rx="4" />
                        <text x="500" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4ade80">
                            Phân tích AI
                        </text>
                        <text x="390" y="230" fontSize="11" fill="#bbf7d0">
                            Quét SAT
                        </text>
                        <text x="390" y="250" fontSize="11" fill="#bbf7d0">
                            Xác nhận 10 hecta
                        </text>
                        <text x="390" y="270" fontSize="11" fill="#bbf7d0">
                            Dự đoán sản lượng
                        </text>
                        <text x="390" y="290" fontSize="12" fontWeight="bold" fill="#22c55e">
                            70 tấn
                        </text>
                    </g>
                    <line x1="720" y1="100" x2="820" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" strokeDasharray="5,5" />
                    <g>
                        <circle cx="900" cy="100" r="50" fill="url(#stepGrad)" stroke="#22c55e" strokeWidth="3" />
                        <text x="900" y="110" textAnchor="middle" fontSize="48" fill="#22c55e">
                            3
                        </text>
                        <rect x="780" y="180" width="240" height="120" fill="rgba(34,197,94,0.1)" stroke="#4ade80" strokeWidth="2" rx="4" />
                        <text x="900" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4ade80">
                            Hợp đồng Thông minh
                        </text>
                        <text x="790" y="230" fontSize="11" fill="#bbf7d0">
                            Giá trị hợp đồng 40,000 USD
                        </text>
                        <text x="790" y="250" fontSize="11" fill="#bbf7d0">
                            Điểm ESG 8.5/10
                        </text>
                        <text x="790" y="270" fontSize="11" fill="#bbf7d0">
                            Phát thải thấp: 2.5kg CO2/kg lúa
                        </text>
                        <text x="790" y="290" fontSize="11" fill="#bbf7d0">
                            Hồ sơ Blockchain bất biến
                        </text>
                    </g>
                    <line x1="500" y1="360" x2="500" y2="440" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" strokeDasharray="5,5" />
                    <circle cx="500" cy="520" r="50" fill="url(#stepGrad)" stroke="#22c55e" strokeWidth="3" />
                    <text x="500" y="530" textAnchor="middle" fontSize="48" fill="#22c55e">
                        4
                    </text>
                    <rect x="280" y="590" width="440" height="100" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="2" rx="4" />
                    <text x="500" y="615" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#22c55e">
                        Chấm điểm ESG
                    </text>
                    <text x="300" y="640" fontSize="12" fill="#d1fae5">
                        Điểm ESG 8.5/10
                    </text>
                    <text x="300" y="660" fontSize="12" fill="#d1fae5">
                        Ngân hàng hưởng lợi cho vay thấp rủi ro
                    </text>
                    <rect x="50" y="380" width="200" height="140" fill="rgba(34,197,94,0.1)" stroke="#4ade80" strokeWidth="2" rx="4" />
                    <text x="150" y="405" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4ade80">
                        Chấm điểm ESG
                    </text>
                    <text x="60" y="430" fontSize="11" fill="#bbf7d0">
                        Phát thải thấp
                    </text>
                    <text x="60" y="460" fontSize="11" fill="#bbf7d0">
                        Điểm ESG 8.5/10
                    </text>
                    <text x="60" y="490" fontSize="11" fill="#bbf7d0">
                        Ngân hàng hưởng lợi cho vay thấp rủi ro
                    </text>
                    <rect x="750" y="380" width="200" height="140" fill="rgba(34,197,94,0.1)" stroke="#4ade80" strokeWidth="2" rx="4" />
                    <text x="850" y="405" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4ade80">
                        Mạng Blockchain
                    </text>
                    <text x="760" y="430" fontSize="11" fill="#bbf7d0">
                        Hồ sơ Blockchain bất biến
                    </text>
                    <text x="760" y="460" fontSize="11" fill="#bbf7d0">
                        Giá trị hợp đồng 40,000 USD
                    </text>
                    <text x="760" y="490" fontSize="11" fill="#bbf7d0">
                        Điểm ESG 8.5/10
                    </text>
                </svg>
                <div className="mt-8 bg-green-900/20 border border-green-500/50 p-4 rounded">
                    <p className="text-green-300 text-sm">
                        <span className="font-bold">
                            Thu thập Dữ liệu:
                        </span>
                        {" "}{"10 hecta lúa -> Phân tích AI -> Hợp đồng Thông minh -> Chấm điểm ESG"}
                    </p>
                </div>
            </div>
        </div>
    );
}
