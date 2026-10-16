export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    video?: string;
    tech: string[];
    year: string;
    fullDescription: string;
    challenge: string;
    solution: string;
    results: string[];
    gallery: string[];
    // Live projects rendered with the green-finance ecosystem layout and flow diagram
    ecosystem?: "digifund" | "farm" | "digital";
}

export const projects: Project[] = [
    {
        "id": "project-1",
        "title": "Credit Fund Mobile App",
        "description": "Phát triển ứng dụng di động toàn diện cho các dịch vụ quỹ tín dụng bao gồm tính năng cho vay, tiết kiệm và chuyển tiền sử dụng React Native và Spring Boot.",
        "image": "/projects/project-1.PNG",
        "tech": [
            "React Native",
            "Spring Boot",
            "My SQL",
            "Redux"
        ],
        "year": "2025",
        "fullDescription": "Ứng dụng di động toàn diện cho quỹ tín dụng, cung cấp các tính năng cho vay, tiết kiệm và chuyển tiền. Hệ thống tích hợp đầy đủ các quy trình từ đăng ký khoản vay, quản lý tiết kiệm đến giao dịch chuyển tiền an toàn.",
        "challenge": "Xây dựng hệ thống bảo mật cao, đáp ứng các quy định về tài chính, xử lý giao dịch realtime và tích hợp nhiều phương thức thanh toán khác nhau.",
        "solution": "Triển khai kiến trúc microservices, sử dụng mã hóa end-to-end cho dữ liệu nhạy cảm, và áp dụng các chuẩn bảo mật trong ngành tài chính.",
        "results": [
            "Xử lý hơn 10,000 giao dịch mỗi ngày",
            "Giảm 70% thời gian xử lý khoản vay",
            "Tăng 45% số lượng khách hàng mới",
            "Đạt 99.99% uptime hệ thống"
        ],
        "gallery": [
            "/projects/project-1.PNG",
            "/projects/project-1.1.PNG",
            "/projects/project-1.2.PNG"
        ]
    },
    {
        "id": "project-2",
        "title": "Loan Management Dashboard",
        "description": "Xây dựng hệ thống quản lý cho vay toàn diện với dashboard theo dõi dữ liệu khách hàng, khoản vay và hiệu suất nhân viên.",
        "image": "/projects/project-2.png",
        "tech": [
            "NextJS",
            "Spring Boot",
            "My SQL",
            "Material-UI"
        ],
        "year": "2025",
        "fullDescription": "Hệ thống quản lý dành cho quản trị viên và nhân viên, cung cấp công cụ phân tích dữ liệu cho vay, theo dõi khách hàng và đánh giá hiệu suất nhân viên. Dashboard trực quan hóa các chỉ số KPI quan trọng và tự động hóa quy trình phê duyệt khoản vay.",
        "challenge": "Xử lý và phân tích lượng lớn dữ liệu, tạo báo cáo real-time, và thiết kế giao diện người dùng trực quan cho nhiều vai trò khác nhau.",
        "solution": "Sử dụng My SQL cho khả năng mở rộng cao, xây dựng API hiệu suất cao với Node.js, và thiết kế UI thân thiện với Material-UI.",
        "results": [
            "Giảm 60% thời gian xử lý hồ sơ vay",
            "Tăng 40% hiệu suất nhân viên",
            "Cải thiện 50% độ chính xác trong đánh giá rủi ro",
            "Xử lý trên 5000 hồ sơ vay mỗi tháng"
        ],
        "gallery": [
            "/projects/project-2.png"
        ]
    },
    {
        "id": "project-7",
        "title": "QTD DigiFund - Quỹ Tín Dụng Tự Động",
        "description": "Nền tảng tín dụng xanh tự động kết nối FarmTrace, eKYC và AI scoring để phê duyệt, giải ngân và giám sát dòng vốn theo thời gian thực.",
        "image": "",
        "tech": [
            "NextJS",
            "Node.js",
            "Solidity",
            "Python ML",
            "AWS",
            "Blockchain"
        ],
        "year": "2025",
        "fullDescription": "QTD DigiFund là nền tảng tín dụng xanh tự động dành cho ngân hàng đối tác, kết nối FarmTrace, eKYC và dữ liệu giao dịch để hình thành hồ sơ tín dụng số theo thời gian thực. Hệ thống sử dụng AI và machine learning để đánh giá rủi ro mùa vụ, hành vi dòng tiền và xây dựng hạn mức tín dụng động phù hợp với từng khách hàng.\n\nLuồng vận hành tập trung vào tự động hóa giải ngân theo điều kiện, giám sát mục đích sử dụng vốn và cập nhật điểm rủi ro liên tục. Dữ liệu thực địa được xác thực giúp ngân hàng kiểm soát rủi ro sớm, rút ngắn thời gian thẩm định và duy trì tuân thủ khi mở rộng danh mục tín dụng xanh.\n\nNền tảng cung cấp dashboard quản trị theo dõi KPI danh mục, cảnh báo sớm và báo cáo ESG, hỗ trợ ngân hàng tối ưu chi phí vận hành và nâng cao minh bạch dòng vốn. QTD DigiFund phù hợp với tín dụng nông nghiệp, năng lượng tái tạo và chuỗi cung ứng xanh, sẵn sàng tích hợp với core banking và hệ thống hiện hữu.",
        "challenge": "Đồng bộ dữ liệu thực địa và dữ liệu tài chính theo thời gian thực, chuẩn hóa eKYC đa nguồn, và duy trì tuân thủ khi tự động hóa toàn bộ vòng đời khoản vay.",
        "solution": "Thiết kế kiến trúc API chuẩn hóa, lớp AI scoring đa nguồn, smart contract điều phối giải ngân và thu nợ, cùng cơ chế kiểm soát tuân thủ theo chính sách ngân hàng.",
        "results": [
            "Rút ngắn thời gian phê duyệt hồ sơ và giải ngân theo tiến độ.",
            "Tăng mức độ tự động hóa quản lý khoản vay và thu nợ.",
            "Nâng cao minh bạch dòng vốn và khả năng kiểm toán ESG.",
            "Mở rộng tiếp cận tín dụng xanh cho hộ sản xuất nhỏ."
        ],
        "gallery": [],
        "ecosystem": "digifund"
    },
    {
        "id": "project-8",
        "title": "FarmTrace - Truy xuất nguồn gốc nông sản",
        "description": "Giải pháp truy xuất nguồn gốc nông sản kết hợp IoT, QR code và blockchain để đảm bảo tính minh bạch từ vườn đến bàn ăn.",
        "image": "",
        "tech": [
            "NextJS",
            "Node.js",
            "MongoDB",
            "IoT",
            "Blockchain"
        ],
        "year": "2025",
        "fullDescription": "FarmTrace là giải pháp truy xuất nguồn gốc nông sản dựa trên IoT, dữ liệu vệ tinh và blockchain, giúp ghi nhận toàn bộ quá trình canh tác, thu hoạch và phân phối theo thời gian thực. Dữ liệu được chuẩn hóa và xác thực để tạo hồ sơ minh bạch cho từng lô hàng và vùng trồng.\n\nGiải pháp hỗ trợ doanh nghiệp và ngân hàng đánh giá chất lượng, kiểm soát rủi ro gian lận và nâng cao uy tín sản phẩm xanh trên thị trường. Các báo cáo ESG được tạo tự động từ dữ liệu thực địa, giúp rút ngắn thời gian kiểm tra và tăng niềm tin của người tiêu dùng.",
        "challenge": "Tập hợp dữ liệu từ nhiều giai đoạn sản xuất, đảm bảo tính toàn vẹn và xác thực của thông tin trong quá trình truyền tải.",
        "solution": "Sử dụng IoT để thu thập dữ liệu môi trường, blockchain để ngăn chặn gian lận dữ liệu, và giao diện người dùng thân thiện để truy cập thông tin sản phẩm.",
        "results": [
            "Tăng độ tin cậy của sản phẩm bằng cách cung cấp thông tin chi tiết cho người tiêu dùng.",
            "Giảm 30% sai sót trong quản lý chuỗi cung ứng.",
            "Tăng khả năng truy xuất nguồn gốc nhanh trong trường hợp cần thu hồi sản phẩm."
        ],
        "gallery": [],
        "ecosystem": "farm"
    },
    {
        "id": "project-9",
        "title": "Digital Asset Tracking - Truy Xuất Tài Sản Số",
        "description": "Nền tảng truy xuất và token hóa tài sản xanh RWA, kết nối dữ liệu thực địa với hồ sơ định danh để quản trị tài sản đảm bảo minh bạch.",
        "image": "",
        "tech": [
            "React",
            "Node.js",
            "Web3",
            "IPFS",
            "AWS",
            "Solidity"
        ],
        "year": "2025",
        "fullDescription": "Quản trị rủi ro và bảo mật cho hồ sơ chào giá tài sản số. Việc token hóa tài sản xanh như carbon credits, green bonds và ESG certificates mang lại cơ hội lớn nhưng cũng tiềm ẩn rủi ro về bảo mật, pháp lý và vận hành. Digital Asset Tracking được thiết kế với framework quản trị rủi ro toàn diện để bảo vệ giá trị tài sản và bảo đảm tuân thủ quy định.\n\nFramework quản trị rủi ro 4 tầng. Tầng 1 là rủi ro kỹ thuật, tập trung vào lỗ hổng hợp đồng thông minh, rủi ro mạng lưới blockchain và rủi ro lưu trữ IPFS. Biện pháp chính gồm audit độc lập, multi sig cho giao dịch quản trị, giám sát thời gian thực, cơ chế chống thao túng oracle và kiểm soát toàn vẹn dữ liệu.\n\nTầng 2 là rủi ro vận hành, kiểm soát sai sót con người bằng đào tạo bắt buộc, phân quyền theo nguyên tắc tối thiểu và quy trình phản ứng sự cố 24 trên 7. Rủi ro chuỗi cung ứng được xử lý bằng đánh giá nhà cung cấp, hợp đồng thông minh và hạ tầng dự phòng đa vùng. Rủi ro thanh khoản được kiểm soát bằng circuit breakers, bảo hiểm và triển khai đa chuỗi.\n\nTầng 3 là rủi ro pháp lý và tuân thủ với eKYC, AML, pháp lý đa quốc gia và báo cáo tuân thủ tự động. Quyền sở hữu trí tuệ được xác thực bằng AI, hợp đồng thông minh thực thi quyền sử dụng và cơ chế trọng tài phi tập trung. Nghĩa vụ thuế được theo dõi với audit trail đầy đủ và tính toán tự động.\n\nTầng 4 là rủi ro thị trường và tài chính, giảm biến động giá bằng các công cụ phòng hộ, ghép cặp stablecoin và quỹ bảo hiểm cộng đồng. Rủi ro đối tác được kiểm soát bằng chấm điểm tín dụng on chain, thế chấp vượt mức và escrow thông minh. Rủi ro thanh khoản được xử lý bằng market making tự động, quyền hoàn đổi và kết nối thị trường thứ cấp.\n\nHệ thống bảo mật toàn diện gồm mã hóa AES 256, MPC cho quản trị khóa, HSM, xoay vòng khóa định kỳ. Monitoring và cảnh báo hoạt động 24 trên 7 với phát hiện bất thường bằng AI, tích hợp nguồn tin an ninh blockchain và phản ứng tự động. Bảo hiểm và phục hồi bao gồm cyber insurance, social recovery cho khóa bị mất, chương trình bug bounty và đánh giá bảo mật định kỳ.\n\nCase study token hóa carbon credit. Ngân hàng token hóa 10.000 carbon credits thành CCT tokens với giá trị thị trường 500.000 USD. Biện pháp bảo mật áp dụng gồm audit trước triển khai, giám sát trong vận hành, phê duyệt multi sig và bảo hiểm sau sự cố. Kết quả đạt zero incident trong 12 tháng đầu và tuân thủ đầy đủ tiêu chuẩn quốc tế.\n\nKết luận. Digital Asset Tracking không chỉ là công cụ quản lý tài sản số mà còn là nền tảng bảo vệ giá trị trong hệ sinh thái Web3. Framework quản trị rủi ro 4 tầng và bảo mật enterprise grade giúp tài sản xanh được bảo vệ tối đa trong quá trình token hóa và giao dịch. Chọn Digital Asset Tracking, bảo mật là tiền đề của sự tin cậy.",
        "challenge": "Xác thực nguồn gốc tài sản đa nguồn, chuẩn hóa dữ liệu và bảo đảm tính pháp lý khi token hóa tài sản xanh.",
        "solution": "Kết hợp blockchain, IPFS và lớp định danh số để tạo hồ sơ bất biến, đồng thời triển khai cơ chế kiểm toán và truy vết đầy đủ.",
        "results": [
            "Tăng độ tin cậy của tài sản đảm bảo nhờ truy xuất nguồn gốc.",
            "Rút ngắn thời gian thẩm định tài sản số.",
            "Nâng cao minh bạch ESG cho đối tác tài chính.",
            "Giảm rủi ro gian lận và sai lệch dữ liệu."
        ],
        "gallery": [],
        "ecosystem": "digital"
    },
    {
        "id": "project-3",
        "title": "Trọng Đức Cacao - Website Bán Hàng",
        "description": "Thiết kế và phát triển website thương mại điện tử, hệ thống truy xuất nguồn gốc và ứng dụng IoT cho doanh nghiệp chuyên sản xuất các sản phẩm cacao chất lượng cao.",
        "image": "/projects/project-3.png",
        "tech": [
            "NextJS",
            "Tailwind CSS",
            "Node.js",
            "MongoDB",
            "IoT",
            "QR Code"
        ],
        "year": "2024",
        "fullDescription": "Website thương mại điện tử dành cho Trọng Đức Cacao kết hợp với hệ thống truy xuất nguồn gốc sản phẩm và ứng dụng IoT trong sản xuất. Dự án được phát triển cho công ty Cacao Trọng Đức với sự tài trợ từ Helvetas Việt Nam, nhằm nâng cao giá trị và minh bạch thông tin sản phẩm. Ngoài hệ thống bán hàng trực tuyến, dự án còn bao gồm các giải pháp kỹ thuật cao cho quy trình sản xuất và quản lý chất lượng.",
        "challenge": "Xây dựng hệ thống đa chức năng kết hợp giữa thương mại điện tử và công nghệ truy xuất nguồn gốc, tích hợp dữ liệu IoT từ dây chuyền sản xuất, đảm bảo tính xác thực và minh bạch của thông tin sản phẩm từ vườn trồng đến tay người tiêu dùng.",
        "solution": "Phát triển hệ thống truy xuất nguồn gốc sản phẩm thông qua QR Code, xây dựng ứng dụng Nhật ký Canh tác Thông minh với công nghệ IoT kết hợp Cisco Packet Tracer để theo dõi điều kiện trồng trọt, và thiết kế giải pháp tự động hóa cho dây chuyền sản xuất tại nhà máy Đồng Nai.",
        "results": [
            "Tăng 65% tỷ lệ chuyển đổi khách hàng nhờ tính năng truy xuất nguồn gốc minh bạch",
            "Giảm 40% thời gian tải trang và tối ưu trải nghiệm người dùng",
            "Giảm 25% chi phí sản xuất nhờ tự động hóa dây chuyền",
            "Cải thiện 35% chất lượng sản phẩm thông qua theo dõi và kiểm soát bằng IoT",
            "Tăng 50% lượng đơn hàng trực tuyến",
            "Mở rộng phạm vi khách hàng đến nhiều tỉnh thành trong nước"
        ],
        "gallery": [
            "/projects/project-3.png"
        ]
    },
    {
        "id": "project-6",
        "title": "Phát triển phần mềm tích hợp Blockchain và AI/ML",
        "description": "Cung cấp giải pháp phát triển phần mềm tích hợp, hỗ trợ ứng dụng AI và Blockchain. Chúng tôi đồng thời đào tạo và chuyển giao công nghệ, giúp doanh nghiệp triển khai hiệu quả các hệ thống thông minh, bảo mật và dễ mở rộng.",
        "image": "/projects/project-5.jpg",
        "tech": [
            "React Native",
            "Java Spring Boot",
            "PostgreSQL",
            "Redis",
            "Microservices",
            "Docker",
            "Kubernetes"
        ],
        "year": "2023",
        "fullDescription": "Ứng dụng ví điện tử và cổng thanh toán toàn diện phát triển cho Mailinh Group, cho phép người dùng thực hiện đa dạng giao dịch tài chính từ chuyển tiền, thanh toán hóa đơn đến nạp tiền điện thoại và mua sắm online. Hệ thống được xây dựng trên nền tảng công nghệ hiện đại, đảm bảo tính bảo mật cao và trải nghiệm người dùng mượt mà.",
        "challenge": "Xây dựng hệ thống có khả năng xử lý khối lượng giao dịch lớn, đảm bảo bảo mật thông tin nhạy cảm, tuân thủ các quy định về thanh toán điện tử của Ngân hàng Nhà nước, và tích hợp với nhiều nhà cung cấp dịch vụ khác nhau.",
        "solution": "Triển khai kiến trúc microservices có khả năng mở rộng cao, sử dụng hệ thống xác thực hai lớp kết hợp với mã hóa đầu cuối, xây dựng hệ thống giám sát giao dịch thời gian thực và phát triển API trung gian để kết nối với các đối tác.",
        "results": [
            "Xử lý hơn 200.000 giao dịch mỗi ngày với tỷ lệ thành công 99.8%",
            "Đạt 500.000+ lượt tải về trên Google Play Store",
            "Giảm 60% thời gian xử lý giao dịch so với phương thức truyền thống",
            "Tích hợp thành công với hơn 50 nhà cung cấp dịch vụ thanh toán",
            "Đạt chứng nhận bảo mật PCI DSS cho hệ thống thanh toán",
            "Tăng trưởng người dùng 40% mỗi quý từ khi ra mắt"
        ],
        "gallery": [
            "/projects/project-5.jpg",
            "/projects/project-5-1.png"
        ]
    },
    {
        "id": "project-4",
        "title": "Digifund Spice Store - Cửa Hàng Gia Vị",
        "description": "Phát triển website giới thiệu và bán hàng trực tuyến cho cửa hàng gia vị với giao diện hiện đại, thân thiện người dùng.",
        "image": "",
        "tech": [
            "React",
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap",
            "Firebase"
        ],
        "year": "2023",
        "fullDescription": "Website dành cho cửa hàng gia vị với thiết kế tập trung vào việc hiển thị sản phẩm một cách hấp dẫn. Khách hàng có thể dễ dàng tìm kiếm, xem thông tin chi tiết và đặt hàng các loại gia vị trực tuyến. Hệ thống quản lý đơn hàng đơn giản, hiệu quả giúp chủ cửa hàng dễ dàng theo dõi và xử lý.",
        "challenge": "Tạo giao diện trực quan giúp khách hàng dễ dàng tìm kiếm sản phẩm trong danh mục đa dạng, tối ưu hóa quy trình thanh toán để giảm tỷ lệ bỏ giỏ hàng.",
        "solution": "Thiết kế hệ thống phân loại sản phẩm thông minh, xây dựng quy trình thanh toán đơn giản chỉ với 3 bước, và sử dụng Firebase để quản lý dữ liệu thời gian thực.",
        "results": [
            "Đạt 2000+ lượt truy cập trong tháng đầu ra mắt",
            "Tăng 30% doanh số bán hàng so với phương thức truyền thống",
            "Mở rộng phạm vi kinh doanh ra toàn quốc",
            "Xây dựng được cơ sở dữ liệu khách hàng với hơn 500 người đăng ký"
        ],
        "gallery": [],
        "ecosystem": "digifund"
    },
    {
        "id": "project-5",
        "title": "Phát triển phần mềm tích hợp và đào tạo AI, Blockchain",
        "description": "Cung cấp giải pháp phát triển phần mềm tích hợp, hỗ trợ ứng dụng AI và Blockchain. Chúng tôi đồng thời đào tạo và chuyển giao công nghệ, giúp doanh nghiệp triển khai hiệu quả các hệ thống thông minh, bảo mật và dễ mở rộng.",
        "image": "/projects/project-5.jpg",
        "tech": [
            "React Native",
            "Java Spring Boot",
            "PostgreSQL",
            "Redis",
            "Microservices",
            "Docker",
            "Kubernetes"
        ],
        "year": "2023",
        "fullDescription": "Ứng dụng ví điện tử và cổng thanh toán toàn diện phát triển cho Mailinh Group, cho phép người dùng thực hiện đa dạng giao dịch tài chính từ chuyển tiền, thanh toán hóa đơn đến nạp tiền điện thoại và mua sắm online. Hệ thống được xây dựng trên nền tảng công nghệ hiện đại, đảm bảo tính bảo mật cao và trải nghiệm người dùng mượt mà.",
        "challenge": "Xây dựng hệ thống có khả năng xử lý khối lượng giao dịch lớn, đảm bảo bảo mật thông tin nhạy cảm, tuân thủ các quy định về thanh toán điện tử của Ngân hàng Nhà nước, và tích hợp với nhiều nhà cung cấp dịch vụ khác nhau.",
        "solution": "Triển khai kiến trúc microservices có khả năng mở rộng cao, sử dụng hệ thống xác thực hai lớp kết hợp với mã hóa đầu cuối, xây dựng hệ thống giám sát giao dịch thời gian thực và phát triển API trung gian để kết nối với các đối tác.",
        "results": [
            "Xử lý hơn 200.000 giao dịch mỗi ngày với tỷ lệ thành công 99.8%",
            "Đạt 500.000+ lượt tải về trên Google Play Store",
            "Giảm 60% thời gian xử lý giao dịch so với phương thức truyền thống",
            "Tích hợp thành công với hơn 50 nhà cung cấp dịch vụ thanh toán",
            "Đạt chứng nhận bảo mật PCI DSS cho hệ thống thanh toán",
            "Tăng trưởng người dùng 40% mỗi quý từ khi ra mắt"
        ],
        "gallery": [
            "/projects/project-5.jpg",
            "/projects/project-5-1.png"
        ]
    }
];
