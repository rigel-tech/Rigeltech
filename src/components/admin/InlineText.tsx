"use client";

import {
    useEffect,
    useState,
    type ElementType,
    type FocusEvent,
    type FormEvent,
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

type InlineTextProps = {
    value: string;
    path: string;
    docKey?: string;
    as?: ElementType;
    className?: string;
};

export default function InlineText({
    value,
    path,
    docKey,
    as,
    className,
}: InlineTextProps) {
    const isLive = useLiveMode();
    const [text, setText] = useState(value ?? "");
    const [editing, setEditing] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (!editing) {
            setText(value ?? "");
        }
    }, [value, editing]);

    useEffect(() => {
        const handler = (event: Event) => {
            const detail = (event as CustomEvent).detail as { path?: string };
            setSelected(detail?.path === path);
        };
        window.addEventListener("live-select", handler as EventListener);
        return () =>
            window.removeEventListener("live-select", handler as EventListener);
    }, [path]);

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            const payload = event.data as { type?: string; path?: string };
            if (payload?.type !== "live-highlight") return;
            setSelected(payload.path === path);
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [path]);

    const Component = (as || "span") as ElementType;

    if (!isLive) {
        return <Component className={className}>{value}</Component>;
    }

    return (
        <Component
            className={`${className || ""} outline outline-offset-2 ${
                selected
                    ? "outline-2 outline-primary-500 bg-primary-200/10"
                    : "outline-1 outline-primary-300/40"
            }`}
            contentEditable
            suppressContentEditableWarning
            data-live-path={path}
            onClick={(event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
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
                }
            }}
            onFocus={() => setEditing(true)}
            onBlur={(event: FocusEvent<HTMLElement>) => {
                setEditing(false);
                const nextValue = event.currentTarget.textContent ?? "";
                setText(nextValue);
                if (window.parent && nextValue !== value) {
                    window.parent.postMessage(
                        { type: "live-edit", path, value: nextValue },
                        window.location.origin,
                    );
                }
            }}
            onInput={(event: FormEvent<HTMLElement>) => {
                const nextValue = event.currentTarget.textContent ?? "";
                setText(nextValue);
            }}
        >
            {text}
        </Component>
    );
}
