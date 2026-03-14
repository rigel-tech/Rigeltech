import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { getSiteSettings } from "@/lib/content/site";
import { getFooterLinks } from "@/lib/content/navigation";

const roboto = Roboto({
    weight: ["400", "500", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RIGEL TECH - Công nghệ tài chính số | Giải pháp Fintech hàng đầu",
  description:
    "RIGEL TECH - Đối tác tin cậy trong hành trình chuyển đổi số của doanh nghiệp. Cung cấp giải pháp tài chính số, blockchain và AI tiên tiến.",
  keywords:
    "RIGEL TECH, fintech, blockchain, AI, digital transformation, financial technology, công nghệ tài chính, chuyển đổi số, tài chính số",
  authors: [{ name: "RIGEL TECH", url: "https://digifund.com.vn" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://digifund.com.vn",
  },
  openGraph: {
    type: "website",
    url: "https://digifund.com.vn",
    title: "RIGEL TECH - Công nghệ tài chính số | Giải pháp Fintech hàng đầu",
    description:
      "RIGEL TECH - Đối tác tin cậy trong hành trình chuyển đổi số của doanh nghiệp",
    siteName: "RIGEL TECH",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RIGEL TECH",
    title: "RIGEL TECH - Công nghệ tài chính số | Giải pháp Fintech hàng đầu",
    description: "Giải pháp tài chính số và chuyển đổi số cho doanh nghiệp",
    images: [{ url: "/images/twitter-image.jpg" }],
  },
  icons: {
    icon: "/logo-nobackground.png",
    apple: "/apple-icon.png",
  },
  metadataBase: new URL("https://digifund.tech"),
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [site, links] = await Promise.all([
        getSiteSettings(),
        getFooterLinks(),
    ]);

    return (
        <html lang="vi">
            <head>
                <meta
                    name="google-site-verification"
                    content="your-verification-code"
                />
            </head>
            <body className={`${roboto.className} antialiased`}>
                <ClientLayout site={site} links={links}>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
