import { draftMode } from "next/headers";
import { getMongoClient } from "@/lib/mongodb";

export type AboutContent = {
    title: string;
    intro: string;
    vision: {
        title: string;
        body: string;
    };
    mission: {
        title: string;
        body: string[];
    };
    coreValuesTitle: string;
    coreValues: { title: string; body: string }[];
    cta: {
        title: string;
        body: string;
        buttonText: string;
        buttonHref: string;
    };
};

export type LegalPage = {
    slug: "privacy-policy" | "terms-of-use";
    title: string;
    contentHtml: string;
};

export const ABOUT_FALLBACK: AboutContent = {
    "title": "Về chúng tôi",
    "intro": "Rigel Tech là công ty công nghệ trẻ với khát vọng trở thành đơn vị tiên phong trong lĩnh vực phát triển phần mềm và chuyển đổi số tại Việt Nam. Chúng tôi luôn đón đầu xu hướng công nghệ mới và không ngừng đổi mới để phát triển các giải pháp số hiệu quả.",
    "vision": {
        "title": "Tầm nhìn",
        "body": "Rigel Tech hướng tới trở thành công ty công nghệ phần mềm và chuyển đổi số hàng đầu tại Việt Nam. Chúng tôi tiên phong nghiên cứu, sáng tạo để cung cấp các sản phẩm và giải pháp công nghệ chất lượng cao, đáp ứng nhu cầu xã hội, góp phần nâng cao chất lượng cuộc sống người Việt và khẳng định vị thế Việt Nam trên thị trường quốc tế."
    },
    "mission": {
        "title": "Sứ mệnh",
        "body": [
            "Là công ty công nghệ luôn ứng biến nhanh và không ngừng nâng cao năng lực sáng tạo, chúng tôi hướng tới việc đóng vai trò chủ lực trong quá trình chuyển đổi kinh tế số 4.0 của Việt Nam.",
            "RIGEL TECH mang trên mình sứ mệnh cung cấp các giải pháp công nghệ, sản phẩm phần mềm, dịch vụ số và các sản phẩm thông minh chất lượng cao trong các lĩnh vực như viễn thông, tài chính – ngân hàng, đào tạo, giải trí và chuyển giao công nghệ, góp phần thúc đẩy quá trình công nghiệp hóa, hiện đại hóa đất nước trong bối cảnh hội nhập kinh tế thế giới."
        ]
    },
    "coreValuesTitle": "Giá trị cốt lõi",
    "coreValues": [
        {
            "title": "Đối với khách hàng",
            "body": "Cam kết cung cấp sản phẩm chất lượng và dịch vụ tốt nhất"
        },
        {
            "title": "Đối với nhân viên",
            "body": "Xây dựng môi trường làm việc chuyên nghiệp, năng động, sáng tạo và nhân văn, tạo điều kiện thu nhập cao và cơ hội phát triển công bằng"
        },
        {
            "title": "Đối với xã hội",
            "body": "Hài hòa lợi ích doanh nghiệp với lợi ích xã hội, đóng góp tích cực vào các hoạt động hướng về cộng đồng, thể hiện tinh thần trách nhiệm đối với xã hội"
        },
        {
            "title": "Đối với công ty",
            "body": "Tạo ra giá trị cho công ty luôn luôn sáng tạo mang trí tuệ, kiến thức và công nghệ phục vụ cho phát triển đất nước là ưu tiên hàng đầu"
        }
    ],
    "cta": {
        "title": "Sẵn sàng bắt đầu dự án của bạn?",
        "body": "Hãy để Rigel Tech đồng hành cùng bạn trong việc xây dựng giải pháp công nghệ hiện đại và phù hợp nhất cho doanh nghiệp",
        "buttonText": "Liên hệ tư vấn",
        "buttonHref": "/contact"
    }
};

export const PRIVACY_FALLBACK: LegalPage = {
    slug: "privacy-policy",
    title: "Chính sách bảo mật",
    contentHtml: "<section class=\"mb-10\">\n  <h2>1. Giới thiệu</h2>\n  <p>DIGIFUND cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, tiết lộ, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng trang web và dịch vụ của chúng tôi.</p>\n  <p>Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>2. Thông tin chúng tôi thu thập</h2>\n  <h3>2.1 Thông tin bạn cung cấp cho chúng tôi</h3>\n  <p>Khi bạn đăng ký tài khoản, liên hệ với chúng tôi hoặc sử dụng dịch vụ của chúng tôi, chúng tôi có thể thu thập các thông tin sau:</p>\n  <ul>\n    <li>Thông tin nhận dạng cá nhân như tên, địa chỉ email, số điện thoại, địa chỉ</li>\n    <li>Thông tin công ty (nếu bạn đại diện cho một tổ chức)</li>\n    <li>Thông tin thanh toán (khi bạn mua sản phẩm hoặc dịch vụ)</li>\n    <li>Nội dung liên lạc giữa bạn và DIGIFUND</li>\n  </ul>\n  <h3>2.2 Thông tin chúng tôi thu thập tự động</h3>\n  <p>Khi bạn truy cập trang web của chúng tôi, chúng tôi có thể tự động thu thập:</p>\n  <ul>\n    <li>Thông tin kỹ thuật (địa chỉ IP, loại và phiên bản trình duyệt, múi giờ, hệ điều hành)</li>\n    <li>Thông tin về chuyến thăm của bạn (URL, thời gian và thời lượng truy cập, trang bạn đã xem)</li>\n    <li>Cookie và công nghệ theo dõi tương tự</li>\n  </ul>\n</section>\n<section class=\"mb-10\">\n  <h2>3. Cách chúng tôi sử dụng thông tin</h2>\n  <p>Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:</p>\n  <ul>\n    <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>\n    <li>Xử lý giao dịch và gửi thông báo liên quan đến giao dịch</li>\n    <li>Gửi thông tin kỹ thuật, cập nhật, thông báo bảo mật và hỗ trợ</li>\n    <li>Phản hồi yêu cầu, câu hỏi và phản hồi của bạn</li>\n    <li>Nghiên cứu và phân tích xu hướng để cải thiện trang web và dịch vụ của chúng tôi</li>\n    <li>Bảo vệ quyền, tài sản hoặc sự an toàn của DIGIFUND, người dùng hoặc công chúng</li>\n  </ul>\n</section>\n<section class=\"mb-10\">\n  <h2>4. Chia sẻ và tiết lộ thông tin</h2>\n  <p>Chúng tôi không bán thông tin cá nhân của bạn cho bên thứ ba. Tuy nhiên, chúng tôi có thể chia sẻ thông tin trong các trường hợp sau:</p>\n  <ul>\n    <li>Với các nhà cung cấp dịch vụ giúp chúng tôi vận hành dịch vụ (ví dụ: lưu trữ đám mây, xử lý thanh toán)</li>\n    <li>Khi có sự đồng ý của bạn</li>\n    <li>Để tuân thủ nghĩa vụ pháp lý hoặc quy định</li>\n    <li>Để bảo vệ quyền, tài sản hoặc sự an toàn của DIGIFUND, người dùng hoặc công chúng</li>\n    <li>Trong trường hợp sáp nhập, bán hoặc chuyển nhượng toàn bộ hoặc một phần doanh nghiệp</li>\n  </ul>\n</section>\n<section class=\"mb-10\">\n  <h2>5. Bảo mật thông tin</h2>\n  <p>Chúng tôi thực hiện các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép. Tuy nhiên, không có phương thức truyền tải qua internet hoặc phương thức lưu trữ điện tử nào là an toàn tuyệt đối.</p>\n  <p>Chúng tôi không thể đảm bảo bảo mật tuyệt đối cho dữ liệu được truy cập đến hoặc từ trang web của chúng tôi.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>6. Cookie và công nghệ tương tự</h2>\n  <p>Chúng tôi sử dụng cookie và các công nghệ theo dõi tương tự để thu thập và lưu trữ thông tin khi bạn truy cập trang web của chúng tôi. Cookie giúp chúng tôi cung cấp tính năng và trải nghiệm người dùng tốt hơn.</p>\n  <p>Bạn có thể cấu hình trình duyệt của mình để từ chối tất cả hoặc một số cookie, hoặc để cảnh báo bạn khi các trang web đặt hoặc truy cập cookie. Tuy nhiên, nếu bạn tắt hoặc từ chối cookie, một số phần của trang web có thể không thể truy cập được hoặc không hoạt động bình thường.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>7. Quyền riêng tư của bạn</h2>\n  <p>Tùy thuộc vào luật pháp hiện hành, bạn có thể có các quyền sau liên quan đến dữ liệu cá nhân của mình:</p>\n  <ul>\n    <li>Truy cập và nhận bản sao thông tin cá nhân của bạn</li>\n    <li>Yêu cầu chỉnh sửa hoặc cập nhật thông tin không chính xác</li>\n    <li>Yêu cầu xóa thông tin cá nhân của bạn</li>\n    <li>Phản đối hoặc hạn chế việc xử lý dữ liệu cá nhân</li>\n    <li>Quyền di chuyển dữ liệu</li>\n  </ul>\n  <p>Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi theo thông tin ở phần cuối chính sách này.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>8. Thay đổi chính sách bảo mật</h2>\n  <p>Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để phản ánh các thay đổi trong thực tiễn bảo mật của chúng tôi hoặc vì lý do pháp lý, hoạt động hoặc kỹ thuật khác. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi quan trọng nào bằng cách đăng thông báo trên trang web của chúng tôi hoặc gửi email trực tiếp cho bạn.</p>\n</section>\n<section>\n  <h2>9. Liên hệ với chúng tôi</h2>\n  <p>Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu liên quan đến chính sách bảo mật này hoặc cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ với chúng tôi tại: <a href=\"mailto:info@digifund.tech\">info@digifund.tech</a> hoặc qua điện thoại: <a href=\"tel:0938065499\">0938.065.499</a>.</p>\n</section>",
};

export const TERMS_FALLBACK: LegalPage = {
    slug: "terms-of-use",
    title: "Điều khoản sử dụng",
    contentHtml: "<section class=\"mb-10\">\n  <h2>1. Giới thiệu</h2>\n  <p>Chào mừng bạn đến với DIGIFUND. Khi bạn sử dụng trang web và dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện này. Vui lòng đọc kỹ các điều khoản này.</p>\n  <p>Công ty Cổ phần Công nghệ DIGIFUND có thể sửa đổi các điều khoản này vào bất kỳ lúc nào bằng cách cập nhật trang này. Bạn nên kiểm tra trang này thường xuyên để đảm bảo bạn đã nắm được các thay đổi.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>2. Sử dụng dịch vụ</h2>\n  <p>Bạn đồng ý sử dụng dịch vụ của chúng tôi chỉ cho các mục đích hợp pháp và theo cách không vi phạm quyền của bất kỳ bên thứ ba nào. Bạn không được sử dụng dịch vụ của chúng tôi:</p>\n  <ul>\n    <li>Theo bất kỳ cách nào trái pháp luật hoặc gian lận, hoặc có mục đích hoặc hiệu quả trái pháp luật hoặc gian lận.</li>\n    <li>Để truyền tải hoặc mua bán bất kỳ tài liệu quảng cáo hoặc khuyến mãi không được yêu cầu, hoặc bất kỳ hình thức tiếp thị tương tự nào khác.</li>\n  </ul>\n  <p>Chúng tôi có quyền từ chối dịch vụ, chấm dứt tài khoản hoặc loại bỏ hoặc chỉnh sửa nội dung theo quyết định riêng của mình.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>3. Quyền sở hữu trí tuệ</h2>\n  <p>Tất cả quyền sở hữu trí tuệ trong và đến các dịch vụ của chúng tôi và tất cả nội dung được cung cấp trên hoặc thông qua các dịch vụ (bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh, clip âm thanh, tải xuống kỹ thuật số, tổng hợp dữ liệu) thuộc về DIGIFUND hoặc người cấp phép của chúng tôi.</p>\n  <p>Bạn có thể in một bản và tải xuống các trích đoạn từ trang web của chúng tôi chỉ cho mục đích sử dụng cá nhân phi thương mại, với điều kiện bạn không sửa đổi bất kỳ tài liệu nào và không sử dụng bất kỳ hình ảnh, hình minh họa, video hoặc âm thanh một cách riêng biệt với bất kỳ văn bản đi kèm nào.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>4. Trách nhiệm và bồi thường</h2>\n  <p>Trong phạm vi được pháp luật cho phép, DIGIFUND không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.</p>\n  <p>Bạn đồng ý bảo vệ, bồi thường và giữ cho DIGIFUND và các chi nhánh, giám đốc, nhân viên và đại lý của chúng tôi không bị tổn hại từ bất kỳ khiếu nại, trách nhiệm, thiệt hại, tổn thất và chi phí nào phát sinh từ việc vi phạm các điều khoản này của bạn.</p>\n</section>\n<section class=\"mb-10\">\n  <h2>5. Luật áp dụng và giải quyết tranh chấp</h2>\n  <p>Các điều khoản sử dụng này được điều chỉnh bởi luật pháp Việt Nam. Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các điều khoản này sẽ được giải quyết thông qua thương lượng thiện chí giữa các bên.</p>\n  <p>Nếu không thể giải quyết thông qua thương lượng, tranh chấp sẽ được đưa ra giải quyết tại tòa án có thẩm quyền ở Việt Nam.</p>\n</section>\n<section>\n  <h2>6. Liên hệ</h2>\n  <p>Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng của chúng tôi, vui lòng liên hệ với chúng tôi theo địa chỉ email: <a href=\"mailto:info@digifund.tech\">info@digifund.tech</a> hoặc qua điện thoại: <a href=\"tel:0938065499\">0938.065.499</a>.</p>\n</section>",
};

type PageDoc = {
    slug: string;
    type: "about" | "legal";
    title?: string;
    content?: AboutContent;
    contentHtml?: string;
    status?: string;
};

const getDatabase = async () => {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB;
    return dbName ? client.db(dbName) : client.db();
};

const getSourceMode = () => {
    const source = process.env.CONTENT_SOURCE?.toLowerCase();
    if (!source || source === "auto") return "auto";
    if (source === "db") return "db";
    return "static";
};

const buildStatusFilter = async () => {
    try {
        const { isEnabled: draft } = await draftMode();
        const status = draft ? "draft" : "published";
        return {
            $or: [{ status }, { status: { $exists: false } }],
        };
    } catch {
        return {
            $or: [{ status: "published" }, { status: { $exists: false } }],
        };
    }
};

export const getAboutContent = async (): Promise<AboutContent> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return ABOUT_FALLBACK;
    }

    try {
        const db = await getDatabase();
        const statusFilter = await buildStatusFilter();
        const query = {
            ...statusFilter,
            $or: [{ slug: "about" }, { type: "about" }],
        };
        const doc = await db.collection<PageDoc>("pages").findOne(query);
        if ((doc?.content && (doc.type === "about" || doc.slug === "about")) || mode === "db") {
            return doc?.content || ABOUT_FALLBACK;
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return ABOUT_FALLBACK;
};

export const getLegalPage = async (
    slug: LegalPage["slug"],
): Promise<LegalPage> => {
    const mode = getSourceMode();
    const fallback =
        slug === "privacy-policy" ? PRIVACY_FALLBACK : TERMS_FALLBACK;

    if (mode === "static") {
        return fallback;
    }

    try {
        const db = await getDatabase();
        const query = {
            ...(await buildStatusFilter()),
            slug,
        };
        const doc = await db.collection<PageDoc>("pages").findOne(query);
        if ((doc?.contentHtml && doc.type === "legal") || mode === "db") {
            return {
                slug,
                title: doc?.title || fallback.title,
                contentHtml: doc?.contentHtml || fallback.contentHtml,
            };
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return fallback;
};
