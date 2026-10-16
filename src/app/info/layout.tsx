import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: "Thông tin liên hệ | RIGEL TECH",
    description:
        "Thông tin liên hệ của RIGEL TECH - Công ty Cổ phần Công nghệ RIGEL TECH",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function InfoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* No header rendered here */}
            <main>{children}</main>
            {/* No footer rendered here */}
        </>
    );
}
