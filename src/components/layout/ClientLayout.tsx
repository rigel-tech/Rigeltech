"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { SiteSettings } from "@/lib/content/site";
import type { FooterLinks } from "@/lib/content/navigation";

export default function ClientLayout({
    children,
    site,
    links,
}: {
    children: React.ReactNode;
    site: SiteSettings;
    links: FooterLinks;
}) {
    const pathname = usePathname();
    const showHeaderFooter =
        !pathname.startsWith("/info") && !pathname.startsWith("/admin");

    const clickCountRef = useRef(0);
    const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams(window.location.search);
        const isLive = params.get("live") === "1";

        if (!isLive) return;

        const handleTripleClick = (event: MouseEvent) => {
            clickCountRef.current += 1;

            if (clickCountRef.current === 3) {
                // Triple click detected
                clickCountRef.current = 0;
                if (clickTimerRef.current) {
                    clearTimeout(clickTimerRef.current);
                    clickTimerRef.current = null;
                }

                // Send message to parent window with click coordinates
                if (window.parent) {
                    const rect = (event.target as HTMLElement).getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;

                    window.parent.postMessage(
                        {
                            type: "live-add-image",
                            x,
                            y,
                            targetElement: (event.target as HTMLElement).tagName.toLowerCase(),
                            targetClasses: (event.target as HTMLElement).className,
                        },
                        window.location.origin,
                    );
                }
            } else {
                // Reset timer for next click
                if (clickTimerRef.current) {
                    clearTimeout(clickTimerRef.current);
                }
                clickTimerRef.current = setTimeout(() => {
                    clickCountRef.current = 0;
                }, 500); // 500ms window for triple click
            }
        };

        document.addEventListener("click", handleTripleClick as EventListener);

        return () => {
            document.removeEventListener("click", handleTripleClick as EventListener);
            if (clickTimerRef.current) {
                clearTimeout(clickTimerRef.current);
            }
        };
    }, []);

    return (
        <>
            {showHeaderFooter && <Header />}
            {children}
            {showHeaderFooter && <Footer site={site} links={links} />}
        </>
    );
}
