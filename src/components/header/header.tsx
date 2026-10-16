"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/news", label: "Tin tức" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/ews", label: "EWS" },
  { href: "/gfs", label: "GFS" },
  { href: "/fields", label: "Lĩnh vực" },
  { href: "/projects", label: "Dự án" },
  { href: "/ecosystem", label: "Hệ sinh thái" },
  { href: "/company-info", label: "Giới thiệu công ty" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hàm đóng menu khi chuyển trang
  const handleNavigate = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex min-h-[84px] items-center justify-between gap-3 px-4 lg:min-h-[120px]">
        <Link
          href="/"
          className="flex min-w-0 flex-col items-center justify-center gap-2 text-center lg:min-w-[220px] lg:gap-3"
          onClick={handleNavigate}
        >
          <Image
            src="/logo.png"
            alt="RIGEL TECH Logo"
            width={88}
            height={88}
            className="h-14 w-14 shrink-0 object-contain lg:h-[68px] lg:w-[68px]"
          />
          <div className="min-w-0">
            <span className="block text-xl font-bold leading-none text-[#866129] sm:text-2xl lg:text-[22px]">
              RIGEL TECH
            </span>
            <span className="mt-2 block text-[11px] font-semibold leading-tight text-[#866129] sm:text-sm lg:text-base">
              Kiến tạo giá trị từ công nghệ
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="rounded-full p-2 text-primary-600 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Chuyển menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-end gap-6 lg:flex xl:gap-8">
          <nav className="flex items-center gap-5 xl:gap-7 flex-nowrap whitespace-nowrap">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-primary-600 xl:text-base whitespace-nowrap"
                onClick={handleNavigate}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-primary-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-primary-700 hover:shadow-md"
              onClick={handleNavigate}
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`border-t bg-white/95 shadow-lg backdrop-blur-md lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto max-h-[calc(100vh-84px)] overflow-y-auto px-4 py-3">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-3 font-medium text-gray-700 transition-colors duration-200 hover:text-primary-600"
                onClick={handleNavigate}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 rounded-full bg-primary-600 px-6 py-2.5 text-center font-medium text-white shadow-sm transition-colors duration-200 hover:bg-primary-700"
              onClick={handleNavigate}
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
