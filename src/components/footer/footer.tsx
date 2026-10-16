"use client";

import Link from "next/link";
import Image from "next/image";
import type { ComponentType } from "react";
import type { FooterLinks } from "@/lib/content/navigation";
import {
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import type { SiteSettings } from "@/lib/content/site";

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  zalo: SiZalo,
};

const mapLink = (address: string) =>
  `https://maps.google.com/?q=${encodeURIComponent(address)}`;

export default function Footer({
  site,
  links,
}: {
  site: SiteSettings;
  links?: FooterLinks;
}) {
  const safeLinks: FooterLinks = links || {
    serviceLinks: [],
    companyLinks: [],
    socialLinks: [],
  };
  const companyLabel = `${site.companyName} | MST: ${site.taxId}`;
  const hotlineLink = site.hotline.replace(/\./g, "");
  const mainOfficeLink = mapLink(site.mainOffice);
  const branchOfficeLink = mapLink(site.branchOffice);

  return (
    <footer
      className="bg-gradient-to-b from-gray-900 to-gray-950 pb-8 pt-12 text-white md:pt-16 lg:pt-20"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 lg:gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="inline-flex justify-center">
                <Image
                  src="/logo.png"
                  alt="Rigel Logo"
                  width={88}
                  height={88}
                  className="h-20 w-20 object-contain"
                />
              </Link>
              <div className="mt-4 space-y-3">
                <span className="block text-base font-semibold text-white md:text-lg">
                  {site.companyName}
                </span>
                <p
                  className="mx-auto max-w-sm text-sm leading-relaxed text-gray-400 md:text-base"
                  itemProp="description"
                >
                  {site.description}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-center gap-4">
                {safeLinks.socialLinks.map((item) => {
                  const Icon = SOCIAL_ICONS[item.name.trim().toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="rounded-full border border-white/10 p-2.5 text-gray-100 transition-colors duration-300 hover:border-primary-400 hover:text-primary-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-col items-center gap-3">
                <span className="text-base font-semibold text-white md:text-lg">
                  Quét để lưu nhanh
                </span>
                <div className="inline-flex items-center justify-center rounded-2xl bg-white p-3 shadow-lg">
                  <div className="relative inline-block h-[168px] w-[168px]">
                    <Image
                      src="/qr-code-footer.png"
                      alt="RIGEL TECH QR Code"
                      width={168}
                      height={168}
                      unoptimized
                      className="block"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white p-1 shadow-sm">
                        <Image
                          src="/logo-nobackground.png"
                          alt="Logo"
                          width={57}
                          height={57}
                          unoptimized
                          className="opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
            <h4 className="text-base font-semibold text-white md:text-lg">
              Lĩnh vực
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {safeLinks.serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-primary-400 md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
            <h4 className="text-base font-semibold text-white md:text-lg">
              Công ty
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {safeLinks.companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-primary-400 md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-4 space-y-3 md:space-y-4">
            <h4 className="text-base font-semibold text-white md:text-lg">
              Liên hệ
            </h4>
            <div className="space-y-2 md:space-y-3">
              <p className="flex items-start text-sm text-gray-400 md:text-base">
                <a
                  href={branchOfficeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-primary-400"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">{companyLabel}</span>
                </a>
              </p>
              <p className="flex items-start text-sm text-gray-400 md:text-base">
                <span className="mr-2 mt-0.5 w-5 flex-shrink-0 md:mr-3">
                  <FaMapMarkerAlt className="h-4 w-4" />
                </span>
                <a
                  href={mainOfficeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-primary-400"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">
                    Trụ sở chính: {site.mainOffice}
                  </span>
                </a>
              </p>
              <p className="flex items-start text-sm text-gray-400 md:text-base">
                <span className="mr-2 mt-0.5 w-5 flex-shrink-0 md:mr-3">
                  <FaMapMarkerAlt className="h-4 w-4" />
                </span>
                <a
                  href={branchOfficeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-primary-400"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">
                    VP giao dịch: {site.branchOffice}
                  </span>
                </a>
              </p>
              <p className="flex items-center text-sm text-gray-400 md:text-base">
                <span className="mr-2 w-5 flex-shrink-0 md:mr-3">
                  <FaPhoneAlt className="h-4 w-4" />
                </span>
                <a
                  href={`tel:${hotlineLink}`}
                  className="transition-colors duration-300 hover:text-primary-400"
                  itemProp="telephone"
                >
                  Hotline: {site.hotline}
                </a>
              </p>
              <p className="flex items-center text-sm text-gray-400 md:text-base">
                <span className="mr-2 w-5 flex-shrink-0 md:mr-3">
                  <FaEnvelope className="h-4 w-4" />
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors duration-300 hover:text-primary-400"
                  itemProp="email"
                >
                  Email: {site.email}
                </a>
              </p>
              <p className="flex items-center text-sm text-gray-400 md:text-base">
                <span className="mr-2 w-5 flex-shrink-0 md:mr-3">
                  <FaGlobe className="h-4 w-4" />
                </span>
                <a
                  href={`https://${site.website}`}
                  className="transition-colors duration-300 hover:text-primary-400"
                  itemProp="url"
                >
                  Website: {site.website}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 md:mt-12 md:pt-8 lg:mt-16">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-center text-xs text-gray-400 sm:text-left md:text-sm">
              © 2014 <span itemProp="name">{site.companyName}</span>. Đã đăng ký
              Bản quyền.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <Link
                href="/terms-of-use"
                className="text-xs text-gray-400 hover:text-primary-400 md:text-sm"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="/privacy-policy"
                className="text-xs text-gray-400 hover:text-primary-400 md:text-sm"
              >
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
