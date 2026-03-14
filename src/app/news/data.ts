export interface NewsItem {
    id: string;
    title: string;
    date: string;
    category: string;
    image: string;
    video?: string;
    excerpt: string;
    author: string;
    content: string;
    views?: string;
    isPopular?: boolean;
}

export const newsData: NewsItem[] = [
    {
        id: "top-10-ngon-ngu-lap-trinh-2024",
        title: "Top 10 ngôn ngữ lập trình đáng học nhất 2024",
        date: "22/01/2024",
        category: "Lập trình",
        image: "/news/languages-top10.jpg",
        excerpt:
            "Tổng hợp 10 ngôn ngữ lập trình phổ biến và đáng học nhất năm 2024 cho người mới bắt đầu...",
        author: "Tech Team",
        content: `
            <h2>Giới thiệu</h2>
            <p>Trong thời đại công nghệ phát triển mạnh mẽ như hiện nay, việc lựa chọn ngôn ngữ lập trình phù hợp để học tập và phát triển là vô cùng quan trọng.</p>
            
            <h2>1. JavaScript</h2>
            <p>JavaScript là ngôn ngữ lập trình phổ biến nhất thế giới, được sử dụng rộng rãi trong phát triển web. Với JavaScript, bạn có thể:</p>
            <ul>
                <li>Phát triển ứng dụng web full-stack</li>
                <li>Tạo các tương tác động trên website</li>
                <li>Phát triển ứng dụng di động với React Native</li>
                <li>Xây dựng ứng dụng desktop với Electron</li>
            </ul>

            <h2>2. Python</h2>
            <p>Python là ngôn ngữ lập trình được đánh giá là dễ học nhất cho người mới bắt đầu. Python được ứng dụng trong:</p>
            <ul>
                <li>Trí tuệ nhân tạo và Machine Learning</li>
                <li>Data Science và phân tích dữ liệu</li>
                <li>Phát triển web backend</li>
                <li>Tự động hóa và scripting</li>
            </ul>

            <h2>3. Java</h2>
            <p>Java là một trong những ngôn ngữ lập trình phổ biến nhất, đặc biệt trong phát triển ứng dụng doanh nghiệp. Ưu điểm của Java:</p>
            <ul>
                <li>Bảo mật cao</li>
                <li>Khả năng mở rộng tốt</li>
                <li>Cộng đồng lớn mạnh</li>
                <li>Nhiều framework hỗ trợ</li>
            </ul>

            <h2>4. PHP</h2>
            <p>PHP vẫn là một trong những ngôn ngữ phổ biến nhất trong phát triển web, đặc biệt với WordPress. PHP mang lại:</p>
            <ul>
                <li>Dễ học và tiếp cận</li>
                <li>Chi phí hosting thấp</li>
                <li>Nhiều framework mạnh mẽ như Laravel</li>
                <li>Cộng đồng lớn và nhiều tài liệu</li>
            </ul>

            <h2>5. C#</h2>
            <p>C# là ngôn ngữ chủ lực trong hệ sinh thái Microsoft, được sử dụng rộng rãi trong:</p>
            <ul>
                <li>Phát triển game với Unity</li>
                <li>Ứng dụng Windows</li>
                <li>Phát triển web với .NET</li>
                <li>Ứng dụng doanh nghiệp</li>
            </ul>

            <h2>Kết luận</h2>
            <p>Việc chọn ngôn ngữ lập trình để học phụ thuộc vào mục tiêu nghề nghiệp và lĩnh vực bạn muốn theo đuổi. Các ngôn ngữ trên đều có triển vọng việc làm tốt trong năm 2024 và tương lai.</p>`,
        views: "12.5K",
        isPopular: true,
    },
    {
        id: "phap-luat-ve-dinh-danh-khach-hang-dien-tu",
        title: "Pháp luật về định danh khách hàng điện tử trong hoạt động ngân hàng tại Việt Nam",
        date: "24/01/2024",
        category: "Pháp luật",
        image: "/news/ekyc.jpg",
        excerpt:
            "Nghiên cứu về quy định pháp luật về định danh khách hàng điện tử (eKYC) trong hoạt động ngân hàng tại Việt Nam...",
        author: "Tech Team",
        content: `
            <h2>1. Khái quát chung về định danh khách hàng điện tử trong hoạt động ngân hàng</h2>
            <p>Định danh khách hàng điện tử (electronic Know Your Customer - eKYC) là việc tổ chức tài chính thực hiện các biện pháp để nhận biết và xác minh thông tin khách hàng thông qua phương thức điện tử. Đây là một xu hướng tất yếu trong bối cảnh Cách mạng công nghiệp 4.0 và các hoạt động trực tuyến ngày càng phát triển.</p>

            <h2>2. Các quy định pháp luật về định danh khách hàng điện tử trong hoạt động ngân hàng tại Việt Nam</h2>
            <p>Việt Nam đã ban hành nhiều văn bản quy phạm pháp luật điều chỉnh hoạt động định danh khách hàng điện tử, bao gồm:</p>
            <ul>
                <li>Luật Phòng, chống rửa tiền 2012</li>
                <li>Nghị định 87/2019/NĐ-CP về giao dịch điện tử trong hoạt động tài chính</li>
                <li>Thông tư 23/2019/TT-NHNN quy định về các tài liệu, giấy tờ do khách hàng cung cấp</li>
            </ul>

            <h2>3. Quy trình thực hiện eKYC trong hoạt động ngân hàng</h2>
            <p>Quy trình eKYC thường bao gồm các bước cơ bản sau:</p>
            <ul>
                <li>Thu thập thông tin khách hàng qua hình ảnh giấy tờ tùy thân</li>
                <li>Xác thực chân dung khách hàng thông qua công nghệ nhận diện khuôn mặt</li>
                <li>Đối chiếu, xác minh thông tin với cơ sở dữ liệu</li>
                <li>Lưu trữ thông tin khách hàng theo quy định</li>
            </ul>

            <h2>4. Thách thức và giải pháp</h2>
            <p>Việc triển khai eKYC trong hoạt động ngân hàng gặp một số thách thức như:</p>
            <ul>
                <li>Rủi ro về an toàn, bảo mật thông tin</li>
                <li>Hạn chế về công nghệ và cơ sở hạ tầng</li>
                <li>Chi phí đầu tư ban đầu cao</li>
            </ul>

            <h2>5. Kết luận và kiến nghị</h2>
            <p>Để phát triển eKYC trong hoạt động ngân hàng tại Việt Nam, cần:</p>
            <ul>
                <li>Hoàn thiện khung pháp lý</li>
                <li>Đầu tư công nghệ và hạ tầng</li>
                <li>Tăng cường hợp tác quốc tế</li>
                <li>Nâng cao nhận thức của người dân</li>
            </ul>`,
        views: "2.1K",
        isPopular: false,
    },
    {
        id: "ung-dung-tri-tue-nhan-tao-trong-bao-cao-tai-chinh",
        title: "Ứng dụng trí tuệ nhân tạo trong báo cáo tài chính - Xu hướng tất yếu cho kinh tế số",
        date: "25/01/2024",
        category: "Công nghệ",
        image: "/news/ai-finance.jpg",
        excerpt:
            "Trí tuệ nhân tạo (AI) đang dần trở thành công cụ đắc lực trong việc phân tích và lập báo cáo tài chính...",
        author: "Tech Team",
        content: `
            <h2>1. Vai trò của AI trong báo cáo tài chính</h2>
            <p>Trí tuệ nhân tạo đang đóng vai trò ngày càng quan trọng trong việc tự động hóa và nâng cao hiệu quả của quy trình lập báo cáo tài chính. Các công nghệ AI hiện đại có khả năng:</p>
            <ul>
                <li>Tự động hóa việc nhập liệu và xử lý dữ liệu</li>
                <li>Phân tích xu hướng và dự báo tài chính</li>
                <li>Phát hiện gian lận và bất thường</li>
                <li>Tối ưu hóa quy trình kế toán</li>
            </ul>

            <h2>2. Lợi ích của việc ứng dụng AI</h2>
            <p>Việc áp dụng AI trong báo cáo tài chính mang lại nhiều lợi ích đáng kể:</p>
            <ul>
                <li>Giảm thiểu sai sót trong quá trình xử lý dữ liệu</li>
                <li>Tiết kiệm thời gian và chi phí nhân lực</li>
                <li>Tăng độ chính xác trong dự báo tài chính</li>
                <li>Cải thiện khả năng ra quyết định</li>
            </ul>

            <h2>3. Các công nghệ AI đang được áp dụng</h2>
            <p>Hiện nay, nhiều công nghệ AI tiên tiến đang được ứng dụng trong lĩnh vực tài chính:</p>
            <ul>
                <li>Machine Learning cho phân tích dự báo</li>
                <li>Natural Language Processing để xử lý văn bản</li>
                <li>Computer Vision trong nhận dạng chứng từ</li>
                <li>Deep Learning trong phát hiện gian lận</li>
            </ul>

            <h2>4. Thách thức và giải pháp</h2>
            <p>Việc ứng dụng AI trong báo cáo tài chính cũng gặp một số thách thức:</p>
            <ul>
                <li>Chi phí đầu tư ban đầu cao</li>
                <li>Yêu cầu về nguồn nhân lực có kỹ năng</li>
                <li>Vấn đề bảo mật và quyền riêng tư</li>
                <li>Sự phụ thuộc vào công nghệ</li>
            </ul>

            <h2>5. Xu hướng phát triển trong tương lai</h2>
            <p>Trong tương lai, AI sẽ tiếp tục phát triển với:</p>
            <ul>
                <li>Các giải pháp AI tích hợp toàn diện hơn</li>
                <li>Khả năng tự học và thích nghi cao hơn</li>
                <li>Tính năng dự báo chính xác hơn</li>
                <li>Tích hợp với Blockchain và IoT</li>
            </ul>

            <h2>6. Kết luận</h2>
            <p>Ứng dụng AI trong báo cáo tài chính là xu hướng tất yếu trong kỷ nguyên số. Doanh nghiệp cần chủ động trong việc áp dụng công nghệ này để nâng cao hiệu quả hoạt động và duy trì lợi thế cạnh tranh.</p>`,
        views: "1.8K",
        isPopular: false,
    },
    {
        id: "thoi-cua-chuyen-doi-so-ngan-hang",
        title: "Thời của chuyển đổi số ngân hàng",
        date: "26/01/2024",
        category: "Công nghệ",
        image: "/news/digital-banking.jpg",
        excerpt:
            "Chuyển đổi số trong ngành ngân hàng đang diễn ra mạnh mẽ với sự phát triển của công nghệ và thay đổi hành vi người dùng...",
        author: "Tech Team",
        content: `
            <h2>1. Xu hướng chuyển đổi số trong ngành ngân hàng</h2>
            <p>Chuyển đổi số đang tạo ra những thay đổi to lớn trong hoạt động ngân hàng. Các ngân hàng đang tích cực đầu tư vào công nghệ để nâng cao trải nghiệm khách hàng và tối ưu hóa hoạt động.</p>

            <h2>2. Các lĩnh vực chuyển đổi số chính</h2>
            <p>Chuyển đổi số trong ngân hàng tập trung vào các lĩnh vực:</p>
            <ul>
                <li>Ngân hàng số (Digital Banking)</li>
                <li>Thanh toán điện tử</li>
                <li>Dịch vụ tài chính số</li>
                <li>Quản trị rủi ro thông minh</li>
            </ul>

            <h2>3. Lợi ích của chuyển đổi số</h2>
            <p>Việc chuyển đổi số mang lại nhiều lợi ích:</p>
            <ul>
                <li>Tiết kiệm chi phí vận hành</li>
                <li>Nâng cao trải nghiệm khách hàng</li>
                <li>Tăng cường bảo mật</li>
                <li>Mở rộng phạm vi dịch vụ</li>
            </ul>

            <h2>4. Các công nghệ chủ chốt</h2>
            <p>Các công nghệ đang được ứng dụng bao gồm:</p>
            <ul>
                <li>Trí tuệ nhân tạo (AI)</li>
                <li>Điện toán đám mây</li>
                <li>Dữ liệu lớn (Big Data)</li>
                <li>Blockchain</li>
            </ul>

            <h2>5. Thách thức và giải pháp</h2>
            <p>Quá trình chuyển đổi số gặp một số thách thức:</p>
            <ul>
                <li>An ninh mạng và bảo mật thông tin</li>
                <li>Đầu tư cơ sở hạ tầng lớn</li>
                <li>Thay đổi thói quen người dùng</li>
                <li>Đào tạo nguồn nhân lực</li>
            </ul>

            <h2>6. Triển vọng phát triển</h2>
            <p>Trong tương lai, ngành ngân hàng sẽ tiếp tục phát triển với:</p>
            <ul>
                <li>Ngân hàng không giấy tờ</li>
                <li>Thanh toán không tiếp xúc</li>
                <li>Dịch vụ ngân hàng tự động hoàn toàn</li>
                <li>Tích hợp đa kênh liền mạch</li>
            </ul>

            <h2>7. Kết luận</h2>
            <p>Chuyển đổi số không chỉ là xu hướng mà đã trở thành yêu cầu bắt buộc đối với các ngân hàng trong kỷ nguyên số. Việc đầu tư vào chuyển đổi số sẽ quyết định khả năng cạnh tranh và phát triển bền vững của ngân hàng trong tương lai.</p>`,
        views: "1.5K",
        isPopular: false,
    },
    {
        id: "van-hoa-so-va-lo-trinh-xay-dung",
        title: "Văn hóa số và lộ trình xây dựng",
        date: "27/01/2024",
        category: "Chuyển đổi số",
        image: "/news/van-hoa-so.png",
        excerpt:
            "Văn hóa số là nền tảng quan trọng trong quá trình chuyển đổi số, tác động mạnh mẽ đến sự thành công của tổ chức...",
        author: "Tech Team",
        content: `
            <h2>1. Khái niệm văn hóa số</h2>
            <p>Văn hóa số là tập hợp các giá trị, niềm tin, hành vi và cách thức làm việc trong môi trường số. Nó bao gồm:</p>
            <ul>
                <li>Tư duy số và đổi mới sáng tạo</li>
                <li>Thích nghi với thay đổi nhanh chóng</li>
                <li>Học tập liên tục và phát triển</li>
                <li>Hợp tác và chia sẻ thông tin</li>
            </ul>

            <h2>2. Tầm quan trọng của văn hóa số</h2>
            <p>Văn hóa số đóng vai trò then chốt trong:</p>
            <ul>
                <li>Thúc đẩy chuyển đổi số thành công</li>
                <li>Tăng cường năng lực cạnh tranh</li>
                <li>Nâng cao hiệu quả làm việc</li>
                <li>Phát triển bền vững trong kỷ nguyên số</li>
            </ul>

            <h2>3. Lộ trình xây dựng văn hóa số</h2>
            <p>Quá trình xây dựng văn hóa số cần thực hiện theo các bước:</p>
            <ul>
                <li>Đánh giá hiện trạng văn hóa tổ chức</li>
                <li>Xác định tầm nhìn và mục tiêu chuyển đổi</li>
                <li>Phát triển kế hoạch hành động</li>
                <li>Triển khai và đo lường kết quả</li>
            </ul>

            <h2>4. Các yếu tố cốt lõi của văn hóa số</h2>
            <p>Văn hóa số bao gồm các yếu tố chính:</p>
            <ul>
                <li>Lãnh đạo số và tầm nhìn chiến lược</li>
                <li>Môi trường làm việc linh hoạt</li>
                <li>Đổi mới sáng tạo và chấp nhận rủi ro</li>
                <li>Hợp tác và chia sẻ kiến thức</li>
            </ul>

            <h2>5. Thách thức trong xây dựng văn hóa số</h2>
            <p>Các tổ chức thường gặp những thách thức như:</p>
            <ul>
                <li>Thay đổi tư duy và thói quen làm việc</li>
                <li>Khác biệt thế hệ trong lực lượng lao động</li>
                <li>Thiếu hụt kỹ năng số</li>
                <li>Kháng cự với thay đổi</li>
            </ul>

            <h2>6. Giải pháp và khuyến nghị</h2>
            <p>Để xây dựng văn hóa số thành công, cần:</p>
            <ul>
                <li>Đào tạo và phát triển nhân lực</li>
                <li>Tăng cường truyền thông nội bộ</li>
                <li>Xây dựng hệ thống động lực</li>
                <li>Đo lường và đánh giá thường xuyên</li>
            </ul>

            <h2>7. Kết luận</h2>
            <p>Xây dựng văn hóa số là một quá trình dài hạn và cần sự cam kết mạnh mẽ từ lãnh đạo cũng như sự tham gia tích cực của toàn thể nhân viên. Đây là yếu tố quan trọng quyết định sự thành công của chuyển đổi số trong tổ chức.</p>`,
        views: "980",
        isPopular: true,
    },
];

export const getLatestNews = () =>
    newsData.filter((news) => !news.isPopular).slice(0, 3);
export const getPopularNews = () =>
    newsData.filter((news) => news.isPopular).slice(0, 3);
export const getNewsBySlug = (slug: string) =>
    newsData.find((news) => news.id === slug);
