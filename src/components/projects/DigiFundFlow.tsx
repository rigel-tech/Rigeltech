export default function DigiFundFlow() {
    return (
        <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 p-8 rounded-xl border border-violet-500/30">
            <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl font-bold text-violet-400 mb-2 text-center">
                    Kịch bản B: DigiFund - Tài chính Tự động
                </h3>
                <p className="text-violet-200 text-center mb-8 text-sm">
                    Tài chính chuỗi cung ứng từ đơn vay đến đối soát tự động
                </p>
                <svg viewBox="0 0 1100 850" className="w-full h-auto">
                    <defs>
                        <marker id="arrowViolet" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
                        </marker>
                        <linearGradient id="stepGradViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <g>
                        <circle cx="100" cy="60" r="40" fill="url(#stepGradViolet)" stroke="#a855f7" strokeWidth="3" />
                        <text x="100" y="70" textAnchor="middle" fontSize="42" fill="#a855f7">
                            1
                        </text>
                        <rect x="20" y="120" width="160" height="120" fill="rgba(168,85,247,0.1)" stroke="#d8b4fe" strokeWidth="2" rx="4" />
                        <text x="100" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#d8b4fe">
                            Gửi đơn vay
                        </text>
                        <text x="30" y="170" fontSize="11" fill="#e9d5ff">
                            Yêu cầu vay 50,000 USD
                        </text>
                        <text x="30" y="190" fontSize="11" fill="#e9d5ff">
                            45 ngày
                        </text>
                        <text x="30" y="210" fontSize="11" fill="#e9d5ff">
                            Cảnh báo thời gian thực
                        </text>
                        <text x="30" y="230" fontSize="11" fontWeight="bold" fill="#a855f7">
                            Ngân hàng giảm rủi ro mặc định
                        </text>
                    </g>
                    <line x1="280" y1="60" x2="380" y2="60" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowViolet)" strokeDasharray="5,5" />
                    <g>
                        <circle cx="500" cy="60" r="40" fill="url(#stepGradViolet)" stroke="#a855f7" strokeWidth="3" />
                        <text x="500" y="70" textAnchor="middle" fontSize="42" fill="#a855f7">
                            2
                        </text>
                        <rect x="380" y="120" width="240" height="120" fill="rgba(168,85,247,0.1)" stroke="#d8b4fe" strokeWidth="2" rx="4" />
                        <text x="500" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#d8b4fe">
                            AI giám sát
                        </text>
                        <text x="390" y="170" fontSize="11" fill="#e9d5ff">
                            AI giám sát dòng tiền
                        </text>
                        <text x="390" y="190" fontSize="11" fill="#e9d5ff">
                            Cảnh báo thời gian thực
                        </text>
                        <text x="390" y="210" fontSize="11" fill="#e9d5ff">
                            Mạng Oracle xác thực sự kiện
                        </text>
                        <text x="390" y="230" fontSize="11" fill="#e9d5ff">
                            Ngân hàng giảm rủi ro mặc định
                        </text>
                    </g>
                    <line x1="720" y1="60" x2="820" y2="60" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowViolet)" strokeDasharray="5,5" />
                    <g>
                        <circle cx="900" cy="60" r="40" fill="url(#stepGradViolet)" stroke="#a855f7" strokeWidth="3" />
                        <text x="900" y="70" textAnchor="middle" fontSize="42" fill="#a855f7">
                            3
                        </text>
                        <rect x="780" y="120" width="240" height="120" fill="rgba(168,85,247,0.1)" stroke="#d8b4fe" strokeWidth="2" rx="4" />
                        <text x="900" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#d8b4fe">
                            Khóa tài sản
                        </text>
                        <text x="790" y="170" fontSize="11" fill="#e9d5ff">
                            Tài sản khóa trên Oracle
                        </text>
                        <text x="790" y="190" fontSize="11" fill="#e9d5ff">
                            Mạng Oracle xác thực sự kiện
                        </text>
                        <text x="790" y="210" fontSize="11" fill="#e9d5ff">
                            AI giám sát dòng tiền
                        </text>
                        <text x="790" y="230" fontSize="11" fill="#e9d5ff">
                            Cảnh báo thời gian thực
                        </text>
                    </g>
                    <line x1="500" y1="290" x2="500" y2="350" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowViolet)" strokeDasharray="5,5" />
                    <circle cx="500" cy="430" r="40" fill="url(#stepGradViolet)" stroke="#a855f7" strokeWidth="3" />
                    <text x="500" y="440" textAnchor="middle" fontSize="42" fill="#a855f7">
                        4
                    </text>
                    <rect x="280" y="490" width="440" height="140" fill="rgba(168,85,247,0.1)" stroke="#d8b4fe" strokeWidth="2" rx="4" />
                    <text x="500" y="515" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#d8b4fe">
                        Đối soát tự động
                    </text>
                    <text x="300" y="545" fontSize="11" fill="#e9d5ff">
                        Đối soát tự động khi điều kiện đạt
                    </text>
                    <text x="300" y="565" fontSize="11" fill="#e9d5ff">
                        AI giám sát dòng tiền
                    </text>
                    <text x="300" y="585" fontSize="11" fill="#e9d5ff">
                        Ngân hàng giảm rủi ro mặc định
                    </text>
                    <text x="300" y="605" fontSize="11" fontWeight="bold" fill="#a855f7">
                        Cảnh báo thời gian thực
                    </text>
                    <rect x="50" y="330" width="180" height="160" fill="rgba(168,85,247,0.1)" stroke="#d8b4fe" strokeWidth="2" rx="4" />
                    <text x="140" y="355" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d8b4fe">
                        Lợi ích cho ngân hàng
                    </text>
                    <text x="60" y="380" fontSize="10" fill="#e9d5ff">
                        Ngân hàng giảm rủi ro mặc định
                    </text>
                    <text x="60" y="410" fontSize="10" fill="#e9d5ff">
                        AI giám sát dòng tiền
                    </text>
                    <text x="60" y="440" fontSize="10" fill="#e9d5ff">
                        Cảnh báo thời gian thực
                    </text>
                    <rect x="770" y="330" width="180" height="180" fill="rgba(168,85,247,0.1)" stroke="#d8b4fe" strokeWidth="2" rx="4" />
                    <text x="860" y="355" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d8b4fe">
                        Mạng Oracle
                    </text>
                    <text x="780" y="390" fontSize="10" fill="#e9d5ff">
                        Mạng Oracle xác thực sự kiện
                    </text>
                    <text x="780" y="425" fontSize="10" fill="#e9d5ff">
                        AI giám sát dòng tiền
                    </text>
                    <text x="780" y="460" fontSize="10" fill="#e9d5ff">
                        Đối soát tự động khi điều kiện đạt
                    </text>
                </svg>
                <div className="mt-8 bg-violet-900/20 border border-violet-500/50 p-4 rounded">
                    <p className="text-violet-300 text-sm">
                        <span className="font-bold">
                            Đối soát tự động:
                        </span>
                        {" "}Ngân hàng giảm rủi ro mặc định
                    </p>
                </div>
            </div>
        </div>
    );
}
