"use client";

import { useEffect, useState, type MouseEvent } from "react";

type InlineVideoProps = {
    path: string;
    docKey?: string;
    src: string;
    className?: string;
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

const useLiveMode = () => {
    const [isLive, setIsLive] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        setIsLive(params.get("live") === "1");
    }, []);
    return isLive;
};

const getVideoEmbedUrl = (url: string) => {
    if (!url) return url;

    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // Direct video files
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
        return url;
    }

    return url;
};

export default function InlineVideo({
    path,
    docKey,
    src,
    className,
    wrapperClassName,
}: InlineVideoProps) {
    const isLive = useLiveMode();
    const [selectedPath, setSelectedPath] = useState("");

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

    const embedUrl = getVideoEmbedUrl(src);
    const isEmbed = embedUrl !== src;
    const needsWrapper = Boolean(wrapperClassName);

    if (!isLive) {
        if (!needsWrapper) {
            if (isEmbed) {
                return (
                    <iframe
                        src={embedUrl}
                        className={className}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video"
                    />
                );
            }
            return (
                <video
                    src={src}
                    className={className}
                    controls
                    preload="metadata"
                />
            );
        }
        const wrapperClasses = wrapperClassName;
        return (
            <div className={wrapperClasses}>
                {isEmbed ? (
                    <iframe
                        src={embedUrl}
                        className={className}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video"
                    />
                ) : (
                    <video
                        src={src}
                        className={className}
                        controls
                        preload="metadata"
                    />
                )}
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
                { type: "live-select-video", path },
                window.location.origin,
            );
        }
    };

    return (
        <div className={wrapperClasses} data-live-path={path} onClick={handleClick}>
            {isEmbed ? (
                <iframe
                    src={embedUrl}
                    className={`${className || ""} ${
                        isActive
                            ? "outline outline-2 outline-primary-500 outline-offset-2"
                            : ""
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video"
                />
            ) : (
                <video
                    src={src}
                    className={`${className || ""} ${
                        isActive
                            ? "outline outline-2 outline-primary-500 outline-offset-2"
                            : ""
                    }`}
                    controls
                    preload="metadata"
                />
            )}
            {breadcrumb && (
                <div className="pointer-events-none absolute left-2 -bottom-2 z-20 translate-y-full rounded-md border border-slate-700 bg-slate-900/95 px-2 py-1 text-[11px] text-slate-100 shadow">
                    {breadcrumb}
                </div>
            )}
        </div>
    );
}