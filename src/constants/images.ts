export const BANNER_IMAGES = [
    {
        id: 1,
        src: "/banner-1.jpg",
        alt: "Banner 1",
        title: "CÔNG TY TNHH RIGEL TECH",
        description:
            "Đối tác tin cậy cho sự phát triển bền vững của doanh nghiệp",
    },
    {
        id: 2,
        src: "/banner-2.jpg",
        alt: "Banner 2",
        title: "Giải pháp toàn diện",
        description: "Cung cấp các giải pháp tối ưu cho doanh nghiệp của bạn",
    },
    {
        id: 3,
        src: "/banner-3.jpg",
        alt: "Banner 3",
        title: "Đội ngũ chuyên nghiệp",
        description: "Với đội ngũ nhân viên giàu kinh nghiệm và tận tâm",
    },
];

export const CLIENT_LOGOS = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: `/client-${i + 1}.svg`,
    alt: `Client ${i + 1}`,
}));
