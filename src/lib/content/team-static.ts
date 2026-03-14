export type TeamMember = {
    id: string;
    name: {
        vi: string;
        en: string;
    };
    position: {
        vi: string;
        en: string;
    };
    phone?: string;
    mobile: string;
    email: string;
    qrCode: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
    {
        "id": "1",
        "name": {
            "vi": "Huỳnh Nhựt Trường",
            "en": "Huynh Nhut Truong"
        },
        "position": {
            "vi": "Giám Đốc Điều Hành - Nhà Sáng Lập",
            "en": "CEO - Founder"
        },
        "phone": "02873033268",
        "mobile": "0938065499",
        "email": "truong.huynh@digifund.tech",
        "qrCode": "/qr-code-truong.png"
    },
    {
        "id": "2",
        "name": {
            "vi": "Thiều Quang Thiên",
            "en": "Thieu Quang Thien"
        },
        "position": {
            "vi": "Cố Vấn Tài Chính & Đồng Sáng Lập",
            "en": "Financial Advisor & Co-Founder"
        },
        "mobile": "0909671618",
        "email": "thien.thieu@digifund.tech",
        "qrCode": "/qr-code-thien.png"
    },
    {
        "id": "3",
        "name": {
            "vi": "Phạm Minh Quang",
            "en": "Pham Minh Quang"
        },
        "position": {
            "vi": "Quản Lý Mobile App",
            "en": "Mobile App Manager"
        },
        "mobile": "0921999393",
        "email": "quang.pham@digifund.tech",
        "qrCode": "/qr-code-quang.png"
    },
    {
        "id": "4",
        "name": {
            "vi": "Nguyễn Văn Tuấn",
            "en": "Nguyen Van Tuan"
        },
        "position": {
            "vi": "Leader",
            "en": "Leader"
        },
        "mobile": "0835666356",
        "email": "tuan.nguyen@digifund.tech",
        "qrCode": "/qr-code-tuan.png"
    },
    {
        "id": "5",
        "name": {
            "vi": "Nguyễn Thanh Hậu",
            "en": "Nguyen Thanh Hau"
        },
        "position": {
            "vi": "Quản Lý DevOps",
            "en": "DevOps Manager"
        },
        "mobile": "0914696665",
        "email": "hau.nguyen@digifund.tech",
        "qrCode": "/qr-code-hau.png"
    },
    {
        "id": "6",
        "name": {
            "vi": "Nguyễn Tiến Đạt",
            "en": "Nguyen Tien Dat"
        },
        "position": {
            "vi": "Trợ Lý Giám Đốc",
            "en": "Assistant Director"
        },
        "mobile": "0988666888",
        "email": "dat.nguyen@digifund.tech",
        "qrCode": "/qr-code-dat.png"
    }
];
