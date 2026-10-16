"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { TeamMember } from "@/lib/content/team-static";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineText from "@/components/admin/InlineText";

const QR_SIZE = 80;
const QR_LOGO_SIZE = Math.round(0.34 * QR_SIZE);

const formatPhone = (phone: string, international: boolean) => {
    if (!phone) return "";
    return international
        ? "+84 " + phone.substring(1).replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
        : phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
};

type CardLang = "vi" | "en";

const CARD_TEXT: Record<
    CardLang,
    {
        companyName: string;
        vision: string;
        address: string;
        call: string;
        openMap: string;
        sendEmail: string;
        openWebsite?: string;
        download: string;
    }
> = {
    vi: {
        companyName: "CÔNG TY TNHH RIGEL TECH",
        vision: "Kiến tạo giá trị từ công nghệ",
        address:
            "Số 156 Đường Nam Kỳ Khởi Nghĩa, Phường Sài Gòn, Thành phố Hồ Chí Minh",
        call: "Gọi",
        openMap: "Mở bản đồ đến địa chỉ công ty",
        sendEmail: "Gửi email tới",
        download: "Tải card",
    },
    en: {
        companyName: "RIGEL TECH COMPANY LIMITED",
        vision: "Kiến tạo giá trị từ công nghệ",
        address: "156 Nam Ky Khoi Nghia Street, Sai Gon Ward, Ho Chi Minh City",
        call: "Call",
        openMap: "Open map to company address",
        sendEmail: "Send email to",
        openWebsite: "Open rigeltech.vn",
        download: "Tải card",
    },
};

const waitForImages = async (root: HTMLElement, timeout = 1500) => {
    const images = Array.from(root.querySelectorAll("img"));
    for (const img of images) {
        try {
            img.loading = "eager";
            img.decoding = "sync";
            const src = img.currentSrc || img.getAttribute("src") || "";
            if (src) {
                img.setAttribute("src", src);
                img.removeAttribute("srcset");
                img.removeAttribute("sizes");
            }
        } catch {}
    }
    await Promise.race([
        Promise.all(
            images.map((img) =>
                img.complete
                    ? Promise.resolve()
                    : new Promise<void>((resolve) => {
                          img.addEventListener("load", () => resolve(), { once: true });
                          img.addEventListener("error", () => resolve(), { once: true });
                      }),
            ),
        ),
        new Promise((resolve) => setTimeout(resolve, timeout)),
    ]);
};

const shareOrDownload = async (blob: Blob, filename: string) => {
    const file = new File([blob], filename, { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
            await navigator.share({ files: [file], title: filename });
            return;
        } catch {}
    }
    const url = URL.createObjectURL(blob);
    if (/iP(hone|ad|od)/.test(navigator.userAgent)) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};

const downloadCard = async (
    ref: RefObject<HTMLDivElement | null>,
    filename: string,
) => {
    const card = ref.current;
    if (!card) return;
    // Render an off-screen clone so the visible card is never resized
    const clone = card.cloneNode(true) as HTMLDivElement;
    clone.style.position = "fixed";
    clone.style.left = "-10000px";
    clone.style.top = "0";
    clone.style.width = `${card.offsetWidth}px`;
    clone.style.maxWidth = `${card.offsetWidth}px`;
    clone.style.pointerEvents = "none";
    clone.style.transform = "none";
    document.body.appendChild(clone);
    try {
        try {
            await Promise.race([
                document.fonts?.ready ?? Promise.resolve(),
                new Promise((resolve) => setTimeout(resolve, 800)),
            ]);
        } catch {}
        await waitForImages(clone);
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        const width = card.offsetWidth || 360;
        const ratio = window.devicePixelRatio || 2;
        const scale = width <= 420 ? Math.min(1.5, ratio) : Math.min(2, ratio);
        const canvas = await html2canvas(clone, {
            backgroundColor: "#ffffff",
            scale,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            imageTimeout: 1500,
        });
        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png", 1),
        );
        if (!blob) return;
        await shareOrDownload(blob, filename);
    } catch (error) {
        console.error("Failed to download card image:", error);
    } finally {
        clone.remove();
    }
};

function CardQr() {
    return (
        <div className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-2 shadow-md">
            <div
                className="relative inline-block"
                style={{ width: QR_SIZE, height: QR_SIZE }}
            >
                <Image
                    src="/qr-code-footer.png"
                    alt="RIGE LTECH Secure QR Code"
                    width={QR_SIZE}
                    height={QR_SIZE}
                    unoptimized
                    className="block"
                    style={{ width: QR_SIZE, height: QR_SIZE }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-full bg-white p-1 shadow-sm">
                        <Image
                            src="/logo-nobackground.png"
                            alt="Logo"
                            width={QR_LOGO_SIZE}
                            height={QR_LOGO_SIZE}
                            unoptimized
                            className="opacity-90"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function BusinessCard({
    member,
    lang,
    cardRef,
    className,
}: {
    member: TeamMember;
    lang: CardLang;
    cardRef: RefObject<HTMLDivElement | null>;
    className: string;
}) {
    const text = CARD_TEXT[lang];
    const international = lang === "en";

    return (
        <div className={className}>
            <div
                ref={cardRef}
                className="bg-white rounded-lg shadow-2xl overflow-hidden w-full"
            >
                <InlineBlock
                    path={`name.${lang}`}
                    paths={[`name.${lang}`, `position.${lang}`, "phone", "mobile", "email"]}
                    docKey={member.id}
                    className="flex flex-col w-full"
                >
                    <div className="p-6 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <InlineText
                                    as="h2"
                                    path={`name.${lang}`}
                                    docKey={member.id}
                                    value={member.name[lang]}
                                    className="text-[clamp(14px,4.6vw,20px)] sm:text-lg font-bold text-gray-800 leading-[1.4] whitespace-nowrap overflow-visible pt-[2px] pb-[2px]"
                                />
                                <InlineText
                                    as="p"
                                    path={`position.${lang}`}
                                    docKey={member.id}
                                    value={member.position[lang]}
                                    className="text-[12px] sm:text-[13px] text-primary-600 font-medium"
                                />
                            </div>
                            <div className="flex flex-col items-center flex-shrink-0 max-w-[140px]">
                                <Image
                                    src="/logo-nobackground.png"
                                    alt="RIGEL TECH Logo"
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                                />
                                <h1 className="text-[10px] sm:text-sm font-semibold text-[#866129] mt-0.5 text-center leading-tight">
                                    {text.vision}
                                </h1>
                            </div>
                        </div>
                        <div className="text-center my-3">
                            <p className="text-xs text-gray-500 font-medium">
                                {text.companyName}
                            </p>
                            <p className="text-xs text-gray-500">MST: 0312689498</p>
                        </div>
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary-400/80 to-transparent my-3" />
                        <div className="flex items-end gap-4">
                            <div className="space-y-2 text-xs flex-1">
                                {member.phone && (
                                    <div className="flex items-center text-gray-700">
                                        <span className="text-primary-600 mr-2">📞</span>
                                        <a
                                            href={`tel:${member.phone}`}
                                            aria-label={`${text.call} ${formatPhone(member.phone, international)}`}
                                            className="hover:text-primary-600 transition-colors"
                                        >
                                            <InlineText
                                                as="span"
                                                path="phone"
                                                docKey={member.id}
                                                value={formatPhone(member.phone, international)}
                                                className="text-xs text-gray-700"
                                            />
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center text-gray-700">
                                    <span className="text-primary-600 mr-2">📱</span>
                                    <a
                                        href={`tel:${member.mobile}`}
                                        aria-label={`${text.call} ${formatPhone(member.mobile, international)}`}
                                        className="hover:text-primary-600 transition-colors"
                                    >
                                        <InlineText
                                            as="span"
                                            path="mobile"
                                            docKey={member.id}
                                            value={formatPhone(member.mobile, international)}
                                            className="text-xs text-gray-700"
                                        />
                                    </a>
                                </div>
                                <div className="flex items-start text-gray-700">
                                    <span className="text-primary-600 mr-2 flex-shrink-0 mt-0.5">
                                        <FaMapMarkerAlt className="w-3 h-3" />
                                    </span>
                                    <a
                                        href="https://maps.app.goo.gl/2sGGhNsj73ecWaaU7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={text.openMap}
                                        className="hover:text-primary-600 transition-colors text-xs leading-tight"
                                    >
                                        {text.address}
                                    </a>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <span className="text-primary-600 mr-2">✉️</span>
                                    <a
                                        href={`mailto:${member.email}`}
                                        aria-label={`${text.sendEmail} ${member.email}`}
                                        className="hover:text-primary-600 transition-colors"
                                    >
                                        <InlineText
                                            as="span"
                                            path="email"
                                            docKey={member.id}
                                            value={member.email}
                                            className="text-xs text-gray-700"
                                        />
                                    </a>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <span className="text-primary-600 mr-2">🌐</span>
                                    <a
                                        href="https://rigeltech.vn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={text.openWebsite}
                                        className="hover:text-primary-600 transition-colors text-xs"
                                    >
                                        rigeltech.vn
                                    </a>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <CardQr />
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-gradient-to-r from-primary-500 to-primary-700 p-2 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={() =>
                                downloadCard(cardRef, `rigeltech-${member.id}-${lang}.png`)
                            }
                            className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-primary-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                        >
                            {text.download}
                        </button>
                    </div>
                </InlineBlock>
            </div>
        </div>
    );
}

export default function BusinessCardClient({
    teamMembers,
}: {
    teamMembers: TeamMember[];
}) {
    const searchParams = useSearchParams();
    const [member, setMember] = useState<TeamMember | null>(null);
    const viCardRef = useRef<HTMLDivElement>(null);
    const enCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const id = searchParams.get("id");
        const foundMember = id
            ? teamMembers.find((m) => m.id === id)
            : teamMembers[0];

        setMember(foundMember || teamMembers[0]);
    }, [searchParams, teamMembers]);

    if (!member)
        return <div className="text-white text-center">Đang tải...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <BusinessCard
                member={member}
                lang="vi"
                cardRef={viCardRef}
                className="w-full max-w-md mx-auto"
            />
            <BusinessCard
                member={member}
                lang="en"
                cardRef={enCardRef}
                className="w-full max-w-md mx-auto mt-10"
            />
        </div>
    );
}
