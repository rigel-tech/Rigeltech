"use client";

import {
    useEffect,
    useState,
    type ElementType,
    type ReactNode,
    type MouseEvent,
} from "react";

const useLiveMode = () => {
    const [isLive, setIsLive] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        setIsLive(params.get("live") === "1");
    }, []);
    return isLive;
};

type InlineBlockProps = {
    path: string;
    paths?: string[];
    selectPath?: string;
    docKey?: string;
    as?: ElementType;
    className?: string;
    children: ReactNode;
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

export default function InlineBlock({
    path,
    paths,
    selectPath,
    docKey,
    as,
    className,
    children,
}: InlineBlockProps) {
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

    const matchPaths = [path, ...(paths ?? [])].filter(Boolean);
    const isActive =
        isLive &&
        selectedPath &&
        matchPaths.some((candidate) =>
            isPathWithin(candidate, selectedPath),
        );
    const breadcrumb = isActive ? formatBreadcrumb(selectedPath) : "";
    const Component = (as || "div") as ElementType;

    if (!isLive) {
        return <Component className={className}>{children}</Component>;
    }

    return (
        <Component
            className={`relative ${className || ""} ${
                isActive
                    ? "outline outline-2 outline-primary-500 outline-offset-2"
                    : ""
            }`}
            data-live-path={path}
            onClick={(event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                const nextPath = selectPath || path;
                if (!nextPath) return;
                window.dispatchEvent(
                    new CustomEvent("live-select", { detail: { path: nextPath } }),
                );
                if (window.parent) {
                    if (docKey) {
                        window.parent.postMessage(
                            { type: "live-select-doc", docKey },
                            window.location.origin,
                        );
                    }
                    window.parent.postMessage(
                        { type: "live-select", path: nextPath },
                        window.location.origin,
                    );
                }
            }}
        >
            {children}
            {breadcrumb && (
                <div className="pointer-events-none absolute left-2 -bottom-2 z-20 translate-y-full rounded-md border border-slate-700 bg-slate-900/95 px-2 py-1 text-[11px] text-slate-100 shadow">
                    {breadcrumb}
                </div>
            )}
        </Component>
    );
}
