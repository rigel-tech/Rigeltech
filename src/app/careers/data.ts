export interface Position {
    id: string;
    title: string;
    tags: string[];
    description: string;
    icon: string;
    // Keep these fields for backend reference but don't show in UI
    salary: string;
    location: string;
    type: string;
    urgent: boolean;
}

export const positions: Position[] = [
    {
        id: "fe-dev",
        title: "Frontend Developer",
        tags: ["React", "NextJS", "TypeScript"],
        description:
            "Phát triển giao diện người dùng với công nghệ hiện đại, tạo ra trải nghiệm mượt mà và thân thiện cho người dùng.",
        icon: "💻",
        salary: "15-25 triệu",
        location: "TP.HCM",
        type: "Toàn thời gian",
        urgent: true,
    },
    {
        id: "be-dev",
        title: "Backend Developer",
        tags: ["NodeJS", "NestJS", "MongoDB"],
        description:
            "Xây dựng hệ thống máy chủ vững chắc, API hiệu năng cao và quản lý cơ sở dữ liệu.",
        icon: "🔧",
        salary: "18-30 triệu",
        location: "TP.HCM",
        type: "Toàn thời gian",
        urgent: false,
    },
    {
        id: "mobile-dev",
        title: "Mobile Developer",
        tags: ["React Native", "Flutter"],
        description:
            "Phát triển ứng dụng di động đa nền tảng với trải nghiệm người dùng tuyệt vời và hiệu suất cao.",
        icon: "📱",
        salary: "15-25 triệu",
        location: "TP.HCM",
        type: "Toàn thời gian",
        urgent: false,
    },
    {
        id: "ui-ux",
        title: "UI/UX Designer",
        tags: ["Figma", "Adobe XD"],
        description:
            "Thiết kế giao diện trực quan và đảm bảo trải nghiệm người dùng tốt nhất trên các sản phẩm của công ty.",
        icon: "🎨",
        salary: "15-22 triệu",
        location: "TP.HCM",
        type: "Toàn thời gian",
        urgent: false,
    },
    {
        id: "qa-engineer",
        title: "QA Engineer",
        tags: ["Testing", "Automation", "QA"],
        description:
            "Đảm bảo chất lượng sản phẩm thông qua việc kiểm thử kỹ lưỡng và xây dựng quy trình QA hiệu quả.",
        icon: "🔍",
        salary: "15-25 triệu",
        location: "TP.HCM",
        type: "Toàn thời gian",
        urgent: false,
    },
    {
        id: "product-manager",
        title: "Product Manager",
        tags: ["Product", "Management", "Strategy"],
        description:
            "Phát triển chiến lược sản phẩm và điều phối giữa các bộ phận để đảm bảo sản phẩm đáp ứng nhu cầu thị trường.",
        icon: "📊",
        salary: "25-40 triệu",
        location: "TP.HCM",
        type: "Toàn thời gian",
        urgent: false,
    },
];

export async function getOpenPositions(): Promise<Position[]> {
    return positions;
}

