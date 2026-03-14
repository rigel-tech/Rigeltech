"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState, type MouseEvent } from "react";

const useLiveMode = () => {
    const [isLive, setIsLive] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        setIsLive(params.get("live") === "1");
    }, []);
    return isLive;
};

type InlineImageProps = ImageProps & {
    path: string;
    docKey?: string;
    wrapperClassName?: string;
};

const tokenizePath = (path: string) => path.match(/[^.[\]]+/g) ?? [];

const isPathWithin = (base: string, target: string) => {
    if (!base || !target) return false;
    const baseTokens = tokenizePath(base);
    const targetTokens = tokenizePath(target);
    if (baseTokens.length === 0 || targetTokens.length === 0) return false;
    if (baseTokens.length > targetTokens.length) return false;
    return baseTokens.every((token, index) => token === targetTokens[index]);
};

const formatBreadcrumb = (path: string) => {
    const tokens = tokenizePath(path);
    if (tokens.length === 0) return "";
    return tokens
        .map((token) => (/^\d+$/.test(token) ? `[${token}]` : token))
        .join(" / ");
};

export default function InlineImage({
    path,
    docKey,
    wrapperClassName,
    onClick,
    className,
    ...props
}: InlineImageProps) {
    const isLive = useLiveMode();
    const [selectedPath, setSelectedPath] = useState("");
    const needsWrapper = Boolean(wrapperClassName) || Boolean(props.fill);

    useEffect(() => {
        const handler = (event: Event) => {
            const detail = (event as CustomEvent).detail as { path?: string };
            if (detail?.path) {
                setSelectedPath(detail.path);
            }
        };
        window.addEventListener("live-select", handler as EventListener);
        return () =>
            window.removeEventListener("live-select", handler as EventListener);
    }, []);

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            const payload = event.data as { type?: string; path?: string };
            if (payload?.type !== "live-highlight") return;
            if (payload.path) {
                setSelectedPath(payload.path);
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    if (!isLive) {
        if (!needsWrapper) {
            return <Image {...props} sizes={props.fill ? "100vw" : undefined} className={className} />;
        }
        const wrapperClasses = [
            props.fill ? "relative" : "",
            wrapperClassName,
        ]
            .filter(Boolean)
            .join(" ");
        return (
            <div className={wrapperClasses}>
                <Image {...props} sizes={props.fill ? "100vw" : undefined} className={className} />
            </div>
        );
    }

    const isActive = Boolean(
        selectedPath && isPathWithin(path, selectedPath),
    );
    const breadcrumb = isActive ? formatBreadcrumb(selectedPath) : "";
    const wrapperClasses = ["relative", wrapperClassName]
        .filter(Boolean)
        .join(" ");

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            onClick(event as unknown as MouseEvent<HTMLImageElement>);
        }
        event.preventDefault();
        event.stopPropagation();
        if (!path) return;
        window.dispatchEvent(
            new CustomEvent("live-select", { detail: { path } }),
        );
        if (window.parent) {
            if (docKey) {
                window.parent.postMessage(
                    { type: "live-select-doc", docKey },
                    window.location.origin,
                );
            }
            window.parent.postMessage(
                { type: "live-select", path },
                window.location.origin,
            );
            window.parent.postMessage(
                { type: "live-select-image", path },
                window.location.origin,
            );
        }
    };

    return (
        <div className={wrapperClasses} data-live-path={path} onClick={handleClick}>
            <Image
                {...props}
                sizes={props.fill ? "100vw" : undefined}
                className={`${className || ""} ${
                    isActive
                        ? "outline outline-2 outline-primary-500 outline-offset-2"
                        : ""
                }`}
            />
            {breadcrumb && (
                <div className="pointer-events-none absolute left-2 -bottom-2 z-20 translate-y-full rounded-md border border-slate-700 bg-slate-900/95 px-2 py-1 text-[11px] text-slate-100 shadow">
                    {breadcrumb}
                </div>
            )}
        </div>
    );
}
