
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { htmlToText, textToHtml } from "@/lib/htmlToText";

type ContentDoc = Record<string, unknown> & { _id?: string };

type CollectionOption = {
    value: string;
    label: string;
};

type MediaItem = {
    name: string;
    path?: string;
    url: string;
    size: number;
    updatedAt: string;
};

type FieldType = "string" | "number" | "boolean" | "object" | "array";

type SimpleFieldType =
    | "text"
    | "textarea"
    | "checkbox"
    | "list"
    | "image"
    | "video"
    | "date";

type SimpleField = {
    label: string;
    path: string;
    type: SimpleFieldType;
    placeholder?: string;
    rows?: number;
};

type ArrayEditorConfig = {
    title: string;
    path: string;
    fields: SimpleField[];
    emptyItem: Record<string, unknown>;
    helper?: string;
};

const COLLECTIONS: CollectionOption[] = [
    { value: "home", label: "Trang chủ" },
    { value: "pages", label: "Trang nội dung" },
    { value: "news", label: "Tin tức" },
    { value: "projects", label: "Dự án" },
    { value: "services", label: "Dịch vụ" },
    { value: "fields", label: "Lĩnh vực" },
    { value: "careers", label: "Tuyển dụng" },
    { value: "teamMembers", label: "Đội ngũ" },
    { value: "siteSettings", label: "Cài đặt website" },
    { value: "navigation", label: "Menu điều hướng" },
];

const QUICK_AREAS = [
    {
        id: "home",
        label: "Trang chủ",
        collection: "home",
        preview: "/",
        docKey: "home:default",
    },
    {
        id: "about",
        label: "Giới thiệu",
        collection: "pages",
        preview: "/about",
        docKey: "about",
    },
    { id: "news", label: "Tin tức", collection: "news", preview: "/news" },
    {
        id: "fields",
        label: "Lĩnh vực",
        collection: "fields",
        preview: "/fields",
    },
    {
        id: "services",
        label: "Dịch vụ",
        collection: "services",
        preview: "/services",
    },
    {
        id: "projects",
        label: "Dự án",
        collection: "projects",
        preview: "/projects",
    },
    {
        id: "careers",
        label: "Tuyển dụng",
        collection: "careers",
        preview: "/careers",
    },
    {
        id: "team",
        label: "Đội ngũ",
        collection: "teamMembers",
        preview: "/info",
    },
    {
        id: "privacy",
        label: "Chính sách bảo mật",
        collection: "pages",
        preview: "/privacy-policy",
        docKey: "privacy-policy",
    },
    {
        id: "terms",
        label: "Điều khoản sử dụng",
        collection: "pages",
        preview: "/terms-of-use",
        docKey: "terms-of-use",
    },
];

const DEFAULT_PREVIEW: Record<string, string> = {
    home: "/",
    pages: "/about",
    news: "/news",
    projects: "/projects",
    services: "/services",
    fields: "/fields",
    careers: "/careers",
    teamMembers: "/info",
    siteSettings: "/contact",
    navigation: "/",
};

const HOME_BLOCK_OPTIONS = [
    { type: "banner", label: "Banner" },
    { type: "about", label: "Về chúng tôi" },
    { type: "news", label: "Tin tức" },
    { type: "fields", label: "Lĩnh vực" },
    { type: "services", label: "Dịch vụ" },
    { type: "serviceExtra", label: "Dịch vụ nổi bật" },
    { type: "clients", label: "Khách hàng" },
];

const SIMPLE_COLLECTIONS = new Set([
    "news",
    "projects",
    "services",
    "fields",
    "careers",
    "teamMembers",
]);

const SIMPLE_FIELDS: Record<string, SimpleField[]> = {
    news: [
        { label: "Tiêu đề", path: "title", type: "text" },
        { label: "Slug", path: "slug", type: "text" },
        { label: "Ngày đăng", path: "date", type: "text" },
        { label: "Chuyên mục", path: "category", type: "text" },
        { label: "Tóm tắt", path: "excerpt", type: "textarea", rows: 3 },
        { label: "Tác giả", path: "author", type: "text" },
        { label: "Ảnh đại diện (URL)", path: "image", type: "image" },
        { label: "Video (URL YouTube/Vimeo)", path: "video", type: "video" },
        { label: "Lượt xem", path: "views", type: "text" },
        { label: "Nổi bật", path: "isPopular", type: "checkbox" },
        { label: "Nội dung (HTML)", path: "content", type: "textarea", rows: 8 },
    ],
    projects: [
        { label: "Tiêu đề", path: "title", type: "text" },
        { label: "Mô tả ngắn", path: "description", type: "textarea", rows: 3 },
        { label: "Năm", path: "year", type: "text" },
        { label: "Ảnh đại diện (URL)", path: "image", type: "image" },
        { label: "Video demo (URL YouTube/Vimeo)", path: "video", type: "video" },
        { label: "Công nghệ (mỗi dòng 1)", path: "tech", type: "list" },
        { label: "Mô tả đầy đủ", path: "fullDescription", type: "textarea", rows: 6 },
        { label: "Thách thức", path: "challenge", type: "textarea", rows: 4 },
        { label: "Giải pháp", path: "solution", type: "textarea", rows: 4 },
        { label: "Kết quả (mỗi dòng 1)", path: "results", type: "list" },
        { label: "Gallery (mỗi dòng 1 URL)", path: "gallery", type: "list" },
    ],
    services: [
        { label: "Tiêu đề", path: "title", type: "text" },
        { label: "Phụ đề", path: "subtitle", type: "text" },
        { label: "Mô tả", path: "description", type: "textarea", rows: 4 },
        { label: "Icon (URL hoặc emoji)", path: "icon", type: "text" },
    ],
    fields: [
        { label: "Tiêu đề", path: "title", type: "text" },
        { label: "Mô tả", path: "description", type: "textarea", rows: 4 },
        { label: "Icon (URL hoặc emoji)", path: "icon", type: "text" },
        { label: "Tính năng (mỗi dòng 1)", path: "features", type: "list" },
    ],
    careers: [
        { label: "Tiêu đề", path: "title", type: "text" },
        { label: "Mô tả", path: "description", type: "textarea", rows: 4 },
        { label: "Tags (mỗi dòng 1)", path: "tags", type: "list" },
        { label: "Icon (emoji)", path: "icon", type: "text" },
        { label: "Mức lương", path: "salary", type: "text" },
        { label: "Địa điểm", path: "location", type: "text" },
        { label: "Hình thức", path: "type", type: "text" },
        { label: "Tuyển gấp", path: "urgent", type: "checkbox" },
    ],
    teamMembers: [
        { label: "Họ tên (VI)", path: "name.vi", type: "text" },
        { label: "Họ tên (EN)", path: "name.en", type: "text" },
        { label: "Chức vụ (VI)", path: "position.vi", type: "text" },
        { label: "Chức vụ (EN)", path: "position.en", type: "text" },
        { label: "Điện thoại", path: "phone", type: "text" },
        { label: "Di động", path: "mobile", type: "text" },
        { label: "Email", path: "email", type: "text" },
        { label: "QR Code (URL)", path: "qrCode", type: "image" },
    ],
};

const getDocLabel = (doc: ContentDoc) =>
    String(
        doc.title ||
            doc.name ||
            doc.slug ||
            doc.id ||
            doc.sourceKey ||
            doc._id ||
            "Untitled",
    );

const computePreviewPath = (collection: string, doc?: ContentDoc) => {
    if (!doc) return DEFAULT_PREVIEW[collection] || "/";

    if (collection === "home") {
        return "/";
    }
    if (collection === "pages" && typeof doc.slug === "string") {
        return `/${doc.slug}`;
    }
    if (collection === "news") {
        const slug = doc.slug || doc.id;
        return slug ? `/news/${slug}` : "/news";
    }
    if (collection === "projects") {
        const slug = doc.slug || doc.id;
        return slug ? `/projects/${slug}` : "/projects";
    }
    if (collection === "teamMembers") {
        const id = doc.id || doc._id;
        return id ? `/info?id=${id}` : "/info";
    }

    return DEFAULT_PREVIEW[collection] || "/";
};

const buildAutoRevalidatePaths = (
    collection: string,
    doc: ContentDoc | null,
    fallbackPath: string,
) => {
    const paths = new Set<string>();
    const slug = doc?.slug || doc?.id;

    switch (collection) {
        case "home":
            paths.add("/");
            break;
        case "news":
            paths.add("/");
            paths.add("/news");
            if (slug) paths.add(`/news/${slug}`);
            break;
        case "projects":
            paths.add("/projects");
            if (slug) paths.add(`/projects/${slug}`);
            break;
        case "pages":
            if (typeof doc?.slug === "string") {
                paths.add(`/${doc.slug}`);
            }
            break;
        case "services":
            paths.add("/");
            paths.add("/services");
            break;
        case "fields":
            paths.add("/");
            paths.add("/fields");
            break;
        case "careers":
            paths.add("/careers");
            break;
        case "teamMembers":
            paths.add("/info");
            break;
        case "siteSettings":
            paths.add("/contact");
            break;
        case "navigation":
            paths.add("/");
            break;
        default:
            break;
    }

    if (paths.size === 0 && fallbackPath?.startsWith("/")) {
        paths.add(fallbackPath);
    }

    return Array.from(paths);
};

const parseJson = (text: string) => {
    try {
        return { value: JSON.parse(text) as ContentDoc, error: "" };
    } catch (error) {
        return { value: null, error: (error as Error).message };
    }
};

const normalizePath = (path: string) =>
    path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);

const isIndex = (key: string) => String(Number(key)) === key;

const isRecord = (value: unknown): value is Record<string, unknown> =>
    Boolean(value) && typeof value === "object" && !Array.isArray(value);

const cloneDoc = (doc: ContentDoc) => {
    if (typeof structuredClone === "function") {
        return structuredClone(doc) as ContentDoc;
    }
    return JSON.parse(JSON.stringify(doc)) as ContentDoc;
};

const getByPath = (obj: Record<string, unknown>, path: string) => {
    const parts = normalizePath(path);
    let current: unknown = obj;
    for (const key of parts) {
        if (current == null) return undefined;
        if (Array.isArray(current) && isIndex(key)) {
            current = current[Number(key)];
            continue;
        }
        if (typeof current === "object") {
            current = (current as Record<string, unknown>)[key];
            continue;
        }
        return undefined;
    }
    return current;
};

const setByPath = (obj: Record<string, unknown>, path: string, value: unknown) => {
    const parts = normalizePath(path);
    if (parts.length === 0) return;

    let current: Record<string, unknown> | unknown[] = obj;
    for (let i = 0; i < parts.length - 1; i += 1) {
        const key = parts[i];
        const nextKey = parts[i + 1];
        const wantsArray = isIndex(nextKey);

        if (Array.isArray(current) && isIndex(key)) {
            const index = Number(key);
            if (
                typeof current[index] !== "object" ||
                current[index] === null
            ) {
                current[index] = wantsArray ? [] : {};
            }
            current = current[index] as Record<string, unknown>;
        } else {
            if (
                typeof (current as Record<string, unknown>)[key] !== "object" ||
                (current as Record<string, unknown>)[key] === null
            ) {
                (current as Record<string, unknown>)[key] = wantsArray ? [] : {};
            }
            current = (current as Record<string, unknown>)[key] as
                | Record<string, unknown>
                | unknown[];
        }
    }

    const lastKey = parts[parts.length - 1];
    if (Array.isArray(current) && isIndex(lastKey)) {
        current[Number(lastKey)] = value;
        return;
    }
    (current as Record<string, unknown>)[lastKey] = value;
};

const removeByPath = (obj: Record<string, unknown>, path: string) => {
    const parts = normalizePath(path);
    if (parts.length === 0) return;

    let current: Record<string, unknown> | unknown[] = obj;
    for (let i = 0; i < parts.length - 1; i += 1) {
        const key = parts[i];
        if (Array.isArray(current) && isIndex(key)) {
            current = current[Number(key)] as Record<string, unknown> | unknown[];
            continue;
        }
        current = (current as Record<string, unknown>)[key] as
            | Record<string, unknown>
            | unknown[];
    }

    const lastKey = parts[parts.length - 1];
    if (Array.isArray(current) && isIndex(lastKey)) {
        current.splice(Number(lastKey), 1);
        return;
    }
    if (typeof current === "object" && current !== null) {
        delete (current as Record<string, unknown>)[lastKey];
    }
};

const formatBytes = (bytes: number) => {
    if (!Number.isFinite(bytes)) return "";
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(
        units.length - 1,
        Math.floor(Math.log(bytes) / Math.log(1024)),
    );
    const value = bytes / 1024 ** index;
    return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
};

const formatListValue = (value: unknown) => {
    if (Array.isArray(value)) {
        return value.join("\n");
    }
    if (typeof value === "string") return value;
    return "";
};

const parseListValue = (value: string) =>
    value
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean);

const slugify = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

const formatDateVN = (date = new Date()) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
};

const pickDocTitle = (doc: ContentDoc) => {
    const rawName = (doc as Record<string, unknown>).name;
    const nameRecord = isRecord(rawName) ? rawName : null;
    const nameVi =
        nameRecord && typeof nameRecord.vi === "string"
            ? nameRecord.vi
            : "";
    const nameEn =
        nameRecord && typeof nameRecord.en === "string"
            ? nameRecord.en
            : "";
    return String(
        doc.title ||
            nameVi ||
            nameEn ||
            doc.slug ||
            doc.id ||
            doc.sourceKey ||
            "Chưa đặt tiêu đề",
    );
};

const pickDocSummary = (doc: ContentDoc) => {
    const rawPosition = (doc as Record<string, unknown>).position;
    const posRecord = isRecord(rawPosition) ? rawPosition : null;
    const posVi =
        posRecord && typeof posRecord.vi === "string" ? posRecord.vi : "";
    const posEn =
        posRecord && typeof posRecord.en === "string" ? posRecord.en : "";
    return String(
        doc.excerpt ||
            doc.description ||
            doc.subtitle ||
            posVi ||
            posEn ||
            "",
    );
};

const pickDocImage = (doc: ContentDoc) => {
    const candidates = [doc.image, doc.icon, doc.qrCode];
    const value = candidates.find(
        (item) => typeof item === "string" && item.length > 0,
    );
    if (typeof value !== "string") return "";
    if (value.startsWith("http")) return value;
    if (value.startsWith("uploads/")) return ""; // Don't try to display uploads/ paths directly
    if (value.startsWith("/")) return value;
    return "";
};

const createEmptyValue = (sample: unknown): unknown => {
    if (typeof sample === "string") return "";
    if (typeof sample === "number") return 0;
    if (typeof sample === "boolean") return false;
    if (Array.isArray(sample)) return [];
    if (isRecord(sample)) {
        const next: Record<string, unknown> = {};
        Object.entries(sample).forEach(([key, value]) => {
            next[key] = createEmptyValue(value);
        });
        return next;
    }
    return "";
};

const createValueByType = (type: FieldType): unknown => {
    switch (type) {
        case "number":
            return 0;
        case "boolean":
            return false;
        case "object":
            return {};
        case "array":
            return [];
        case "string":
        default:
            return "";
    }
};

const deriveSlugFromPreview = (previewPath: string) => {
    if (!previewPath) return "";
    const base = previewPath.split("?")[0]?.trim() || "";
    const cleaned = base.replace(/^\/+/, "").replace(/\/+$/, "");
    return cleaned || "home";
};

const isSupabasePathValue = (value: string) =>
    value.startsWith("uploads/") || value.startsWith("supabase://");

const normalizeSupabasePath = (value: string) =>
    value.startsWith("supabase://") ? value.replace("supabase://", "") : value;

const extractSupabasePathFromUrl = (value: string) => {
    try {
        const url = new URL(value);
        if (!url.hostname.includes("supabase.co")) return null;
        const match = url.pathname.match(
            /\/storage\/v1\/(?:object|render\/image)\/(?:sign|public)\/[^/]+\/(.+)/,
        );
        return match ? match[1] : null;
    } catch {
        return null;
    }
};

const getReplacePath = (value: unknown) => {
    if (typeof value !== "string") return null;
    if (value.startsWith("uploads/")) return value;
    if (value.startsWith("supabase://")) return normalizeSupabasePath(value);
    if (value.startsWith("http://") || value.startsWith("https://")) {
        return extractSupabasePathFromUrl(value);
    }
    return null;
};

const getDocKey = (doc: ContentDoc | null) => {
    if (!doc) return "";
    const key = doc.slug || doc.id || doc.sourceKey || doc._id;
    return key ? String(key) : "";
};

const normalizeDocMediaPaths = (value: unknown): { value: unknown; changed: boolean } => {
    if (typeof value === "string") {
        const path = getReplacePath(value);
        if (path && path !== value) {
            return { value: path, changed: true };
        }
        return { value, changed: false };
    }

    if (Array.isArray(value)) {
        let changed = false;
        const next = value.map((entry) => {
            const normalized = normalizeDocMediaPaths(entry);
            if (normalized.changed) changed = true;
            return normalized.value;
        });
        return { value: next, changed };
    }

    if (value && typeof value === "object") {
        let changed = false;
        const next: Record<string, unknown> = {};
        Object.entries(value as Record<string, unknown>).forEach(([key, entry]) => {
            const normalized = normalizeDocMediaPaths(entry);
            if (normalized.changed) changed = true;
            next[key] = normalized.value;
        });
        return { value: next, changed };
    }

    return { value, changed: false };
};

type InlineAddFieldProps = {
    parentPath: string;
    disabled?: boolean;
    onAdd: (parentPath: string, name: string, type: FieldType) => void;
};

const InlineAddField = ({ parentPath, disabled, onAdd }: InlineAddFieldProps) => {
    const [name, setName] = useState("");
    const [type, setType] = useState<FieldType>("string");
    const label = parentPath ? parentPath : "root";

    return (
        <div className="mt-3 rounded-md border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
                Thêm trường vào {label}
            </p>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
                <input
                    type="text"
                    name="fieldName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tên trường"
                    aria-label="Tên trường"
                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs"
                />
                <select
                    name="fieldType"
                    value={type}
                    onChange={(e) => setType(e.target.value as FieldType)}
                    aria-label="Loại trường"
                    title="Loại trường"
                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs"
                >
                    <option value="string">Chuỗi</option>
                    <option value="number">Số</option>
                    <option value="boolean">Đúng/Sai</option>
                    <option value="object">Đối tượng</option>
                    <option value="array">Mảng</option>
                </select>
                <button
                    type="button"
                    onClick={() => {
                        if (!name.trim()) return;
                        onAdd(parentPath, name.trim(), type);
                        setName("");
                    }}
                    disabled={disabled || !name.trim()}
                    className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Thêm
                </button>
            </div>
        </div>
    );
};

export default function LiveEditorClient() {
    const [adminKey, setAdminKey] = useState("");
    const [collection, setCollection] = useState(COLLECTIONS[0].value);
    const [quickArea, setQuickArea] = useState(QUICK_AREAS[0]?.id || "home");
    const [pendingDocKey, setPendingDocKey] = useState("");
    const [docs, setDocs] = useState<ContentDoc[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [docState, setDocState] = useState<ContentDoc | null>(null);
    const [editorText, setEditorText] = useState("{}");
    const [editorError, setEditorError] = useState("");
    const [showJson, setShowJson] = useState(false);
    const [previewPath, setPreviewPath] = useState(DEFAULT_PREVIEW.pages);
    const [previewNonce, setPreviewNonce] = useState(0);
    const [loadingDocs, setLoadingDocs] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [draftEnabled, setDraftEnabled] = useState(false);
    const [draftBusy, setDraftBusy] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [imagePath, setImagePath] = useState("image");
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadOverwrite, setUploadOverwrite] = useState(false);
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [mediaQuery, setMediaQuery] = useState("");
    const [revalidatePaths, setRevalidatePaths] = useState("/");
    const [revalidateTags, setRevalidateTags] = useState("");
    const [revalidateBusy, setRevalidateBusy] = useState(false);
    const [newFieldParent, setNewFieldParent] = useState("");
    const [newFieldName, setNewFieldName] = useState("");
    const [newFieldType, setNewFieldType] = useState<FieldType>("string");
    const [signedPreviewUrl, setSignedPreviewUrl] = useState<string | null>(null);
    const [migrateBusy, setMigrateBusy] = useState(false);
    const [selectedPath, setSelectedPath] = useState("");
    const [htmlDraft, setHtmlDraft] = useState("");
    const [contentTextMode, setContentTextMode] = useState(false);
    const [contentCachedHtml, setContentCachedHtml] = useState("");
    const htmlEditorRef = useRef<HTMLDivElement | null>(null);

    const getDragImageUrl = (event: React.DragEvent<HTMLElement>) => {
        const url =
            event.dataTransfer.getData("text/plain") ||
            event.dataTransfer.getData("text/uri-list");
        return url?.trim();
    };

    const insertHtmlAtCursor = (html: string) => {
        const editor = htmlEditorRef.current;
        if (!editor) return;

        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            editor.focus();
            return;
        }

        const range = sel.getRangeAt(0);
        range.deleteContents();

        const container = document.createElement("div");
        container.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node: ChildNode | null;
        while ((node = container.firstChild)) {
            frag.appendChild(node);
        }

        range.insertNode(frag);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);

        // Sync state
        setHtmlDraft(editor.innerHTML);
    };

    const handleDropIntoHtmlEditor = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const url = getDragImageUrl(event);
        if (!url) return;
        insertHtmlAtCursor(`<img src="${url}" alt="" />`);
    };

    const insertTextAtCursor = (
        textarea: HTMLTextAreaElement,
        text: string,
    ): string => {
        const start = textarea.selectionStart ?? 0;
        const end = textarea.selectionEnd ?? 0;
        const value = textarea.value;
        const next = value.slice(0, start) + text + value.slice(end);
        const cursor = start + text.length;
        textarea.value = next;
        textarea.selectionStart = textarea.selectionEnd = cursor;
        return next;
    };

    const handleDropIntoTextarea = (
        event: React.DragEvent<HTMLTextAreaElement>,
        path: string,
    ) => {
        event.preventDefault();
        const url = getDragImageUrl(event);
        if (!url) return;

        const nextValue = insertTextAtCursor(
            event.currentTarget,
            `<img src="${url}" alt="" />`,
        );
        applyDocUpdate((draft) => {
            setByPath(draft, path, nextValue);
        });
    };

    const [homeBlockType, setHomeBlockType] = useState(
        HOME_BLOCK_OPTIONS[0].type,
    );
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [docDragIndex, setDocDragIndex] = useState<number | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [newsUrl, setNewsUrl] = useState("");
    const [newsImporting, setNewsImporting] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    useEffect(() => {
        const cachedKey = window.localStorage.getItem("adminKey");
        if (cachedKey) setAdminKey(cachedKey);
    }, []);

    useEffect(() => {
        if (!adminKey) return;
        window.localStorage.setItem("adminKey", adminKey);
    }, [adminKey]);

    const syncDraftStatus = useCallback(async () => {
        try {
            const res = await fetch(
                `/api/content?collection=${encodeURIComponent(collection)}&limit=1`,
                { cache: "no-store" },
            );
            const json = (await res.json()) as { draft?: boolean };
            if (typeof json?.draft === "boolean") {
                setDraftEnabled(json.draft);
            }
        } catch {
            // ignore
        }
    }, [collection]);

    const iframeSrc = useMemo(() => {
        if (typeof window === "undefined") {
            // Server-side: return relative URL to avoid hydration mismatch
            const joiner = previewPath.includes("?") ? "&" : "?";
            return `${previewPath}${joiner}preview=${previewNonce}&live=1`;
        }
        try {
            const url = new URL(previewPath, window.location.origin);
            url.searchParams.set("preview", String(previewNonce));
            url.searchParams.set("live", "1");
            return url.toString();
        } catch {
            const joiner = previewPath.includes("?") ? "&" : "?";
            return `${previewPath}${joiner}preview=${previewNonce}&live=1`;
        }
    }, [previewPath, previewNonce]);

    const loadDocs = async () => {
        if (!adminKey) return;
        setLoadingDocs(true);
        setStatusMessage("");

        try {
            const res = await fetch(
                `/api/admin/content?collection=${encodeURIComponent(collection)}`,
                {
                    headers: { "x-admin-key": adminKey },
                    cache: "no-store",
                },
            );
            const json = (await res.json()) as { data?: ContentDoc[]; error?: string };
            if (!res.ok) {
                throw new Error(json.error || "Không thể tải nội dung.");
            }
            const items = Array.isArray(json.data) ? json.data : [];
            const sortByOrder = (docs: ContentDoc[]) =>
                [...docs].sort((a, b) => {
                    const orderA = Number((a as Record<string, unknown>).order);
                    const orderB = Number((b as Record<string, unknown>).order);
                    const hasA = Number.isFinite(orderA);
                    const hasB = Number.isFinite(orderB);
                    if (hasA || hasB) {
                        if (hasA && hasB) return orderA - orderB;
                        if (hasA) return -1;
                        return 1;
                    }
                    return 0;
                });
            const sortedItems = sortByOrder(items);
            setDocs(sortedItems);
            if (sortedItems.length > 0) {
                const first = sortedItems[0];
                setSelectedIndex(0);
                setDocState(first);
                setEditorText(JSON.stringify(first, null, 2));
                setPreviewPath(computePreviewPath(collection, first));
                setIsDirty(false);
            } else {
                setSelectedIndex(-1);
                setDocState({});
                setEditorText("{}");
                setPreviewPath(DEFAULT_PREVIEW[collection] || "/");
                setIsDirty(false);
            }
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setLoadingDocs(false);
        }
    };

    const loadMedia = async () => {
        if (!adminKey) return;
        setMediaLoading(true);
        setStatusMessage("");
        try {
            const res = await fetch("/api/admin/media", {
                headers: { "x-admin-key": adminKey },
                cache: "no-store",
            });
            const json = (await res.json()) as {
                data?: MediaItem[];
                error?: string;
            };
            if (!res.ok) {
                throw new Error(json.error || "Không thể tải thư viện ảnh.");
            }
            const items = Array.isArray(json.data) ? json.data : [];
            setMediaItems(items);
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setMediaLoading(false);
        }
    };

    useEffect(() => {
        loadDocs();
        if (adminKey) {
            loadMedia();
        }
        syncDraftStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collection, adminKey, syncDraftStatus]);

    const handleSelectDoc = useCallback(
        (index: number) => {
            if (isDirty) {
                const ok = window.confirm(
                    "Bạn đang có thay đổi chưa lưu. Tiếp tục sẽ mất dữ liệu. Bạn muốn tiếp tục?",
                );
                if (!ok) return;
            }
            const doc = docs[index];
            if (!doc) return;
            setSelectedIndex(index);
            setDocState(doc);
            setEditorText(JSON.stringify(doc, null, 2));
            setPreviewPath(computePreviewPath(collection, doc));
            setEditorError("");
            setIsDirty(false);
        },
        [collection, docs, isDirty],
    );

    const selectDocByKey = useCallback(
        (docKey: string) => {
            if (!docKey) return false;
            const target = String(docKey);
            const index = docs.findIndex((doc) => {
                const candidates = [
                    getDocKey(doc),
                    (doc as Record<string, unknown>).key,
                ]
                    .filter(Boolean)
                    .map((value) => String(value));
                return candidates.includes(target);
            });
            if (index >= 0) {
                handleSelectDoc(index);
                return true;
            }
            return false;
        },
        [docs, handleSelectDoc],
    );

    const handleSelectArea = useCallback(
        (areaId: string) => {
            if (isDirty) {
                const ok = window.confirm(
                    "Bạn đang có thay đổi chưa lưu. Tiếp tục sẽ mất dữ liệu. Bạn muốn tiếp tục?",
                );
                if (!ok) return;
            }
            const area = QUICK_AREAS.find((item) => item.id === areaId);
            if (!area) return;
            setQuickArea(areaId);
            if (area.collection !== collection) {
                setCollection(area.collection);
            }
            if (area.preview) {
                setPreviewPath(area.preview);
            }
            setPendingDocKey(area.docKey ? String(area.docKey) : "");
            setIsDirty(false);
        },
        [collection, isDirty],
    );

    useEffect(() => {
        if (!pendingDocKey) return;
        if (selectDocByKey(pendingDocKey)) {
            setPendingDocKey("");
        }
    }, [docs, pendingDocKey, selectDocByKey]);

    const applyDocUpdate = useCallback((updater: (draft: ContentDoc) => void) => {
        let nextDoc: ContentDoc | null = null;
        setDocState((prev) => {
            const base = prev ?? {};
            const next = cloneDoc(base);
            updater(next);
            nextDoc = next;
            return next;
        });
        if (nextDoc) {
            setEditorText(JSON.stringify(nextDoc, null, 2));
        }
        setEditorError("");
        setIsDirty(true);
    }, []);

    const isSimpleCollection = useMemo(
        () => SIMPLE_COLLECTIONS.has(collection),
        [collection],
    );
    const allowDelete = useMemo(
        () => SIMPLE_COLLECTIONS.has(collection),
        [collection],
    );
    const simpleFields = useMemo(
        () => SIMPLE_FIELDS[collection] || [],
        [collection],
    );
    const collectionLabel = useMemo(
        () =>
            COLLECTIONS.find((item) => item.value === collection)?.label ||
            collection,
        [collection],
    );

    const buildNewDoc = useCallback((): ContentDoc => {
        const baseStatus = draftEnabled ? "draft" : "published";
        switch (collection) {
            case "home": {
                return {
                    key: "default",
                    hero: {
                        headline: "",
                        subheadline: "",
                    },
                    bannerSlides: [],
                    about: {
                        title: "",
                        heading: "",
                        body: "",
                        stats: [],
                        image: "",
                        imageAlt: "",
                    },
                    clients: {
                        title: "",
                        logos: [],
                    },
                    blocks: HOME_BLOCK_OPTIONS.map((option) => ({
                        id: option.type,
                        type: option.type,
                        label: option.label,
                        visible: true,
                    })),
                    status: baseStatus,
                };
            }
            case "pages": {
                const slug = deriveSlugFromPreview(previewPath);
                if (slug === "about") {
                    return {
                        slug,
                        type: "about",
                        content: {
                            title: "",
                            intro: "",
                            vision: { title: "", body: "" },
                            mission: { title: "", body: [] },
                            coreValuesTitle: "",
                            coreValues: [],
                            cta: {
                                title: "",
                                body: "",
                                buttonText: "",
                                buttonHref: "",
                            },
                        },
                        status: baseStatus,
                    };
                }
                if (slug === "privacy-policy" || slug === "terms-of-use") {
                    return {
                        slug,
                        type: "legal",
                        title: "",
                        contentHtml: "",
                        status: baseStatus,
                    };
                }
                return { slug, status: baseStatus };
            }
            case "news":
                return {
                    title: "",
                    slug: "",
                    date: formatDateVN(),
                    category: "",
                    excerpt: "",
                    author: "",
                    image: "",
                    content: "",
                    views: "",
                    isPopular: false,
                    status: baseStatus,
                };
            case "projects":
                return {
                    title: "",
                    description: "",
                    year: "",
                    image: "",
                    tech: [],
                    fullDescription: "",
                    challenge: "",
                    solution: "",
                    results: [],
                    gallery: [],
                    status: baseStatus,
                };
            case "services":
                return {
                    title: "",
                    subtitle: "",
                    description: "",
                    icon: "",
                    status: baseStatus,
                };
            case "fields":
                return {
                    title: "",
                    description: "",
                    icon: "",
                    features: [],
                    status: baseStatus,
                };
            case "careers":
                return {
                    title: "",
                    description: "",
                    tags: [],
                    icon: "",
                    salary: "",
                    location: "",
                    type: "",
                    urgent: false,
                    status: baseStatus,
                };
            case "teamMembers":
                return {
                    name: { vi: "", en: "" },
                    position: { vi: "", en: "" },
                    phone: "",
                    mobile: "",
                    email: "",
                    qrCode: "",
                    status: baseStatus,
                };
            default:
                return { status: baseStatus };
        }
    }, [collection, draftEnabled, previewPath]);

    const handleCreateNew = () => {
        if (isDirty) {
            const ok = window.confirm(
                "Bạn đang có thay đổi chưa lưu. Tạo mới sẽ làm mất dữ liệu hiện tại. Bạn muốn tiếp tục?",
            );
            if (!ok) return;
        }
        const nextDoc = buildNewDoc();
        setSelectedIndex(-1);
        setDocState(nextDoc);
        setEditorText(JSON.stringify(nextDoc, null, 2));
        setEditorError("");
        setPreviewPath(computePreviewPath(collection, nextDoc));
        setStatusMessage(
            "Đang tạo mới. Nhập nội dung rồi bấm Lưu để thêm vào danh sách.",
        );
        setIsDirty(false);
    };

    const handleSimpleFieldChange = (
        field: SimpleField,
        value: string | boolean,
    ) => {
        applyDocUpdate((draft) => {
            let nextValue: unknown = value;
            if (field.type === "list" && typeof value === "string") {
                nextValue = parseListValue(value);
            }
            setByPath(draft, field.path, nextValue);
        });
    };

    const handleGenerateSlug = () => {
        if (!docState) return;
        const titleValue = getByPath(docState, "title");
        if (typeof titleValue !== "string" || !titleValue.trim()) return;
        const nextSlug = slugify(titleValue);
        if (!nextSlug) return;
        applyDocUpdate((draft) => {
            setByPath(draft, "slug", nextSlug);
        });
    };

    const handleImportNewsUrl = async () => {
        if (!adminKey) {
            setStatusMessage("Vui lòng nhập Admin Key.");
            return;
        }
        const url = newsUrl.trim();
        if (!url) {
            setStatusMessage("Vui lòng nhập URL cần lấy dữ liệu.");
            return;
        }
        setNewsImporting(true);
        setStatusMessage("");
        try {
            const res = await fetch("/api/admin/ingest-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({ url }),
            });
            const json = (await res.json()) as {
                title?: string;
                description?: string;
                image?: string;
                content?: string;
                canonical?: string;
                error?: string;
            };
            if (!res.ok) {
                throw new Error(json.error || "Không thể lấy dữ liệu từ URL.");
            }
            applyDocUpdate((draft) => {
                if (json.title) {
                    setByPath(draft, "title", json.title);
                    const currentSlug = getByPath(draft, "slug");
                    if (!currentSlug) {
                        setByPath(draft, "slug", slugify(json.title));
                    }
                }
                if (json.description) {
                    setByPath(draft, "excerpt", json.description);
                }
                if (json.image) {
                    setByPath(draft, "image", json.image);
                }
                if (json.content) {
                    setByPath(draft, "content", json.content);
                }
                if (json.canonical || url) {
                    setByPath(draft, "sourceUrl", json.canonical || url);
                }
            });
            setStatusMessage("Đã lấy dữ liệu từ URL.");
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setNewsImporting(false);
        }
    };

    const handler = useCallback(
        (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            const payload = event.data as {
                type?: string;
                path?: string;
                value?: string;
                docKey?: string;
            };
            if (!payload || !payload.type) return;
            if (payload.type === "live-select-doc" && payload.docKey) {
                selectDocByKey(payload.docKey);
                return;
            }
            if (payload.type === "live-select" && payload.path) {
                setSelectedPath(payload.path);
                return;
            }
            if (payload.type === "live-select-image" && payload.path) {
                setSelectedPath(payload.path);
                setImagePath(payload.path);
                if (docState) {
                    const currentValue = getByPath(docState, payload.path);
                    if (typeof currentValue === "string") {
                        setImageUrl(currentValue);
                    }
                }
                setTimeout(() => {
                    uploadInputRef.current?.click();
                }, 0);
                return;
            }
            if (payload.type === "live-edit" && payload.path) {
                applyDocUpdate((draft) => {
                    setByPath(
                        draft,
                        payload.path as string,
                        payload.value ?? "",
                    );
                });
            }
        },
        [applyDocUpdate, docState, selectDocByKey],
    );

    useEffect(() => {
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [handler]);

    const handleSave = async () => {
        setSaving(true);
        setStatusMessage("");

        if (!docState) {
            setStatusMessage("Không có nội dung để lưu.");
            setSaving(false);
            return;
        }

        try {
            const normalized = normalizeDocMediaPaths(docState);
            let payloadDoc = normalized.value as ContentDoc;
            if (normalized.changed) {
                setDocState(payloadDoc);
                setEditorText(JSON.stringify(payloadDoc, null, 2));
            }

            if (collection === "home") {
                if (!payloadDoc.key) {
                    payloadDoc = { ...payloadDoc, key: "default" };
                    setDocState(payloadDoc);
                    setEditorText(JSON.stringify(payloadDoc, null, 2));
                }
            }

            if (collection === "pages") {
                const next = { ...payloadDoc };
                let changed = false;
                if (!next.slug || typeof next.slug !== "string") {
                    const derived = deriveSlugFromPreview(previewPath);
                    if (derived) {
                        next.slug = derived;
                        changed = true;
                    }
                }
                if (!next.type && typeof next.slug === "string") {
                    if (next.slug === "about") {
                        next.type = "about";
                        changed = true;
                    } else if (
                        next.slug === "privacy-policy" ||
                        next.slug === "terms-of-use"
                    ) {
                        next.type = "legal";
                        changed = true;
                    } else if (next.slug === "home") {
                        next.type = "home";
                        changed = true;
                    }
                }
                if (changed) {
                    payloadDoc = next;
                    setDocState(payloadDoc);
                    setEditorText(JSON.stringify(payloadDoc, null, 2));
                }
            }

            if (collection === "news" || collection === "projects") {
                const next = { ...payloadDoc } as Record<string, unknown>;
                let changed = false;
                const title =
                    typeof next.title === "string" ? next.title.trim() : "";
                if (!next.slug && title) {
                    next.slug = slugify(title);
                    changed = true;
                }
                if (next.slug && !next.id) {
                    next.id = next.slug;
                    changed = true;
                }
                if (changed) {
                    payloadDoc = next as ContentDoc;
                    setDocState(payloadDoc);
                    setEditorText(JSON.stringify(payloadDoc, null, 2));
                }
            }

            const nextStatus = draftEnabled ? "draft" : "published";
            if ((payloadDoc as Record<string, unknown>).status !== nextStatus) {
                payloadDoc = { ...payloadDoc, status: nextStatus };
                setDocState(payloadDoc);
                setEditorText(JSON.stringify(payloadDoc, null, 2));
            }

            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({
                    collection,
                    doc: payloadDoc,
                }),
            });

            const json = (await res.json()) as { data?: ContentDoc; error?: string };
            if (!res.ok) {
                throw new Error(json.error || "Không thể lưu nội dung.");
            }

            const savedDoc = json.data;
            if (savedDoc) {
                setDocState(savedDoc);
                setEditorText(JSON.stringify(savedDoc, null, 2));
                setPreviewPath(computePreviewPath(collection, savedDoc));
                setDocs((prev) => {
                    const next = [...prev];
                    if (selectedIndex >= 0) {
                        next[selectedIndex] = savedDoc;
                        return next;
                    }
                    return [savedDoc, ...next];
                });
                if (selectedIndex === -1) {
                    setSelectedIndex(0);
                }
            }

            let revalidateMessage = "";
            if (!draftEnabled && adminKey) {
                const targetDoc = (savedDoc || payloadDoc) as ContentDoc;
                const fallback = computePreviewPath(collection, targetDoc);
                const paths = buildAutoRevalidatePaths(
                    collection,
                    targetDoc,
                    fallback,
                );
                if (paths.length > 0) {
                    try {
                        const res = await fetch("/api/revalidate", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-admin-key": adminKey,
                            },
                            body: JSON.stringify({ paths }),
                        });
                        const json = (await res.json()) as { error?: string };
                        if (!res.ok) {
                            throw new Error(json.error || "Làm mới thất bại");
                        }
                        revalidateMessage = ` Đã làm mới: ${paths.join(" ")}`;
                    } catch (error) {
                        revalidateMessage = ` Làm mới thất bại: ${
                            (error as Error).message
                        }`;
                    }
                }
            }

            setPreviewNonce((value) => value + 1);
            setStatusMessage(`Đã lưu thành công.${revalidateMessage}`);
            setIsDirty(false);
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteDoc = async () => {
        if (!adminKey) {
            setStatusMessage("Vui lòng nhập Admin Key.");
            return;
        }
        if (!docState || selectedIndex < 0) {
            setStatusMessage("Vui lòng chọn nội dung cần xóa.");
            return;
        }
        if (!window.confirm("Bạn có chắc chắn muốn xóa nội dung này?")) {
            return;
        }

        setDeleting(true);
        setStatusMessage("");
        try {
            const res = await fetch("/api/admin/content", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({
                    collection,
                    doc: docState,
                }),
            });
            const json = (await res.json()) as { error?: string; deleted?: number };
            if (!res.ok) {
                throw new Error(json.error || "Không thể xóa nội dung.");
            }

            const nextDocs = docs.filter((_, index) => index !== selectedIndex);
            setDocs(nextDocs);
            if (nextDocs.length > 0) {
                setSelectedIndex(0);
                setDocState(nextDocs[0]);
                setEditorText(JSON.stringify(nextDocs[0], null, 2));
                setPreviewPath(computePreviewPath(collection, nextDocs[0]));
            } else {
                setSelectedIndex(-1);
                setDocState({});
                setEditorText("{}");
                setPreviewPath(DEFAULT_PREVIEW[collection] || "/");
            }
            setPreviewNonce((value) => value + 1);
            setStatusMessage("Đã xóa nội dung.");
            setIsDirty(false);
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setDeleting(false);
        }
    };

    const handleEnableDraft = async () => {
        setDraftBusy(true);
        setStatusMessage("");
        try {
            await fetch(`/api/draft?redirect=/admin/live`, {
                headers: { "x-admin-key": adminKey },
                credentials: "include",
                redirect: "manual",
            });
            await syncDraftStatus();
            setPreviewNonce((value) => value + 1);
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setDraftBusy(false);
        }
    };

    const handleDisableDraft = async () => {
        setDraftBusy(true);
        setStatusMessage("");
        try {
            await fetch(`/api/draft?disable=1`, {
                headers: { "x-admin-key": adminKey },
                credentials: "include",
            });
            await syncDraftStatus();
            setPreviewNonce((value) => value + 1);
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setDraftBusy(false);
        }
    };

    const handleApplyJson = () => {
        const parsed = parseJson(editorText);
        if (!parsed.value) {
            setEditorError(parsed.error);
            return;
        }
        setDocState(parsed.value);
        setEditorError("");
        setIsDirty(true);
    };

    const applyHtmlDraft = () => {
        if (!selectedPath) return;
        applyDocUpdate((draft) => {
            setByPath(draft, selectedPath, htmlDraft);
        });
        setPreviewNonce((value) => value + 1);
    };

    const runHtmlCommand = (command: string, value?: string) => {
        const editor = htmlEditorRef.current;
        if (!editor) return;
        editor.focus();
        document.execCommand(command, false, value);
        setHtmlDraft(editor.innerHTML);
    };

    const handleApplyImageUrl = (override?: string) => {
        const nextUrl = (override ?? imageUrl).trim();
        if (!nextUrl) return;
        applyDocUpdate((draft) => {
            setByPath(draft, imagePath, nextUrl);
        });
        setImageUrl(nextUrl);
        setPreviewNonce((value) => value + 1);
    };

    const handleApplyMedia = (payload: { url: string; path?: string }) => {
        const nextUrl = payload.url.trim();
        if (!nextUrl) return;
        const valueToStore = payload.path ? payload.path : nextUrl;
        applyDocUpdate((draft) => {
            setByPath(draft, imagePath, valueToStore);
        });
        setImageUrl(nextUrl);
        setPreviewNonce((value) => value + 1);
    };

    const triggerUploadForPath = (path: string) => {
        if (!path) return;
        if (!adminKey) {
            setStatusMessage("Vui lòng nhập Admin Key.");
            return;
        }
        setImagePath(path);
        setSelectedPath(path);
        uploadInputRef.current?.click();
    };

    const moveArrayItem = (path: string, from: number, to: number) => {
        if (from === to) return;
        applyDocUpdate((draft) => {
            const list = getByPath(draft, path);
            if (!Array.isArray(list)) return;
            if (from < 0 || from >= list.length) return;
            if (to < 0 || to >= list.length) return;
            const [item] = list.splice(from, 1);
            list.splice(to, 0, item);
        });
    };

    const persistDocsOrder = useCallback(
        async (orderedDocs: ContentDoc[]) => {
            if (!adminKey) return;
            const updates = orderedDocs
                .map((doc, index) => {
                    const order = index;
                    if (doc.order === order) return null;
                    return { ...doc, order };
                })
                .filter(Boolean) as ContentDoc[];
            if (updates.length === 0) return;

            await Promise.all(
                updates.map((doc) =>
                    fetch("/api/admin/content", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-admin-key": adminKey,
                        },
                        body: JSON.stringify({ collection, doc }),
                    }),
                ),
            );

            setDocs((prev) =>
                prev.map((doc, index) => ({
                    ...doc,
                    order: index,
                })),
            );
        },
        [adminKey, collection],
    );

    const reorderDocs = useCallback(
        async (from: number, to: number) => {
            if (from === to) return;
            let reordered: ContentDoc[] = [];
            setDocs((prev) => {
                const next = [...prev];
                const [item] = next.splice(from, 1);
                next.splice(to, 0, item);
                reordered = next;
                return next;
            });
            setSelectedIndex((prev) => {
                if (prev === from) return to;
                if (from < to) {
                    // Shift left when moving item right
                    if (prev > from && prev <= to) return prev - 1;
                } else if (from > to) {
                    // Shift right when moving item left
                    if (prev >= to && prev < from) return prev + 1;
                }
                return prev;
            });
            await persistDocsOrder(reordered);
        },
        [persistDocsOrder],
    );

    const toggleHomeBlockVisibility = (index: number) => {
        applyDocUpdate((draft) => {
            const list = getByPath(draft, "blocks");
            if (!Array.isArray(list)) return;
            const block = list[index] as Record<string, unknown> | undefined;
            if (!block) return;
            block.visible = block.visible === false;
        });
    };

    const removeHomeBlock = (index: number) => {
        applyDocUpdate((draft) => {
            const list = getByPath(draft, "blocks");
            if (!Array.isArray(list)) return;
            list.splice(index, 1);
        });
    };

    const addHomeBlock = () => {
        if (!homeBlockType) return;
        applyDocUpdate((draft) => {
            const list = getByPath(draft, "blocks");
            const nextBlock = {
                id: `${homeBlockType}-${Date.now()}`,
                type: homeBlockType,
                label:
                    HOME_BLOCK_OPTIONS.find((item) => item.type === homeBlockType)
                        ?.label || homeBlockType,
                visible: true,
            };
            if (Array.isArray(list)) {
                list.push(nextBlock);
            } else {
                setByPath(draft, "blocks", [nextBlock]);
            }
        });
    };

    type UploadResponseSingle = {
        url?: string;
        path?: string;
        error?: string;
    };

    type UploadResponseMulti = {
        results?: UploadResponseSingle[];
    };

    const handleUpload = async (fileOrFiles: File | File[]) => {
        const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
        if (files.length === 0) return;

        const tooLarge = files.find((file) => file.size > 2 * 1024 * 1024);
        if (tooLarge) {
            setStatusMessage("Có file vượt quá 2MB. Vui lòng chọn ảnh nhỏ hơn.");
            return;
        }

        setUploading(true);
        setStatusMessage("");

        try {
            const uploaded: Array<{ url: string; path?: string }> = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("collection", collection);
                formData.append("docKey", getDocKey(docState));
                formData.append("fieldPath", imagePath);

                const replacePath = uploadOverwrite ? getReplacePath(currentImageValue) : null;
                if (replacePath) {
                    formData.append("replacePath", replacePath);
                }
                if (uploadOverwrite) {
                    formData.append("useStablePath", "1");
                }

                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    headers: { "x-admin-key": adminKey },
                    body: formData,
                });

                const json = (await res.json()) as UploadResponseSingle | UploadResponseMulti;
                const isMultiResponse = (value: unknown): value is UploadResponseMulti => {
                    if (typeof value !== "object" || value === null) return false;
                    const record = value as Record<string, unknown>;
                    return Array.isArray(record.results);
                };

                const results: UploadResponseSingle[] = isMultiResponse(json)
                    ? json.results ?? []
                    : [json];

                const errors = results
                    .map((item) => item.error)
                    .filter(Boolean)
                    .join("; ");

                if (!res.ok || !results.some((item) => item.url)) {
                    throw new Error(errors || "Upload failed");
                }

                for (const item of results) {
                    if (item.url) {
                        uploaded.push({ url: item.url, path: item.path });
                    }
                }
            }

            if (uploaded.length > 0) {
                handleApplyMedia(uploaded[0]);
            }
            loadMedia();

            if (uploaded.length > 1) {
                setStatusMessage(`Đã tải lên ${uploaded.length} ảnh.`);
            }
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setUploading(false);
        }
    };

    const addFieldAt = (parentPath: string, name: string, type: FieldType) => {
        const cleanName = name.trim();
        if (!cleanName) {
            setStatusMessage("Cần nhập tên trường.");
            return;
        }
        const parent = parentPath.trim().replace(/\.$/, "");
        const fullPath = parent ? `${parent}.${cleanName}` : cleanName;
        const nextValue = createValueByType(type);
        applyDocUpdate((draft) => {
            setByPath(draft, fullPath, nextValue);
        });
        setStatusMessage(`Đã thêm trường: ${fullPath}`);
    };

    const handleAddField = () => {
        addFieldAt(newFieldParent, newFieldName, newFieldType);
        setNewFieldName("");
    };

    const handleRemoveField = (path: string) => {
        applyDocUpdate((draft) => {
            removeByPath(draft, path);
        });
    };

    const handleAddArrayItem = (path: string, sample: unknown) => {
        const item = createEmptyValue(sample);
        applyDocUpdate((draft) => {
            const current = getByPath(draft, path);
            if (Array.isArray(current)) {
                current.push(item);
            } else {
                setByPath(draft, path, [item]);
            }
        });
    };

    const handleRemoveArrayItem = (path: string, index: number) => {
        applyDocUpdate((draft) => {
            removeByPath(draft, `${path}[${index}]`);
        });
    };

    const handleRevalidate = async () => {
        if (!adminKey) return;
        setRevalidateBusy(true);
        setStatusMessage("");
        const paths = revalidatePaths
            .split(/[,\s]+/)
            .map((item) => item.trim())
            .filter(Boolean);
        const tags = revalidateTags
            .split(/[,\s]+/)
            .map((item) => item.trim())
            .filter(Boolean);

        if (paths.length === 0 && tags.length === 0) {
            setStatusMessage("Vui lòng nhập ít nhất một đường dẫn hoặc tag.");
            setRevalidateBusy(false);
            return;
        }

        try {
            const res = await fetch("/api/revalidate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({ paths, tags }),
            });
            const json = (await res.json()) as { error?: string };
            if (!res.ok) {
                throw new Error(json.error || "Làm mới thất bại");
            }
            setStatusMessage("Đã gửi yêu cầu làm mới cache.");
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setRevalidateBusy(false);
        }
    };

    const handleMigrateMedia = async (allCollections: boolean) => {
        if (!adminKey) return;
        setMigrateBusy(true);
        setStatusMessage("");
        try {
            const res = await fetch("/api/admin/migrate-media", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify(
                    allCollections ? { all: true } : { collection },
                ),
            });
            const json = (await res.json()) as {
                results?: { collection: string; scanned: number; updated: number }[];
                error?: string;
            };
            if (!res.ok) {
                throw new Error(json.error || "Migration failed");
            }
            const summary = (json.results || [])
                .map(
                    (item) =>
                        `${item.collection}: ${item.updated}/${item.scanned}`,
                )
                .join(" | ");
            setStatusMessage(
                summary
                    ? `Normalize done. ${summary}`
                    : "Normalize done.",
            );
        } catch (error) {
            setStatusMessage((error as Error).message);
        } finally {
            setMigrateBusy(false);
        }
    };

    const filteredMedia = useMemo(() => {
        const query = mediaQuery.trim().toLowerCase();
        if (!query) return mediaItems;
        return mediaItems.filter((item) =>
            item.name.toLowerCase().includes(query),
        );
    }, [mediaItems, mediaQuery]);

    const renderPrimitiveField = (
        value: unknown,
        path: string,
        label: string,
    ) => {
        if (typeof value === "boolean") {
            return (
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                            applyDocUpdate((draft) => {
                                setByPath(draft, path, e.target.checked);
                            })
                        }
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary-500"
                    />
                    <span className="text-sm text-slate-200">{label}</span>
                </label>
            );
        }

        if (typeof value === "number") {
            return (
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{label}</span>
                        <button
                            type="button"
                            onClick={() => handleRemoveField(path)}
                            className="text-[11px] text-slate-500 hover:text-slate-300"
                        >
                            Xóa
                        </button>
                    </div>
                    <input
                        type="number"
                        value={Number.isFinite(value) ? value : 0}
                        onChange={(e) =>
                            applyDocUpdate((draft) => {
                                const nextValue = Number(e.target.value);
                                setByPath(
                                    draft,
                                    path,
                                    Number.isFinite(nextValue) ? nextValue : 0,
                                );
                            })
                        }
                        aria-label={label}
                        title={label}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                    />
                </div>
            );
        }

        const stringValue = value == null ? "" : String(value);
        const multiline =
            stringValue.length > 120 ||
            stringValue.includes("\n") ||
            stringValue.includes("<");

        return (
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{label}</span>
                    <button
                        type="button"
                        onClick={() => handleRemoveField(path)}
                        className="text-[11px] text-slate-500 hover:text-slate-300"
                    >
                        Xóa
                    </button>
                </div>
                {multiline ? (
                    <textarea
                        value={stringValue}
                        onChange={(e) =>
                            applyDocUpdate((draft) => {
                                setByPath(draft, path, e.target.value);
                            })
                        }
                        onDragOver={(event) => {
                            event.preventDefault();
                            event.dataTransfer.dropEffect = "copy";
                        }}
                        onDrop={(event) => handleDropIntoTextarea(event, path)}
                        aria-label={label}
                        title={label}
                        className="min-h-[120px] w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                    />
                ) : (
                    <input
                        type="text"
                        value={stringValue}
                        onChange={(e) =>
                            applyDocUpdate((draft) => {
                                setByPath(draft, path, e.target.value);
                            })
                        }
                        aria-label={label}
                        title={label}
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                    />
                )}
            </div>
        );
    };

    const renderField = (
        value: unknown,
        path: string,
        label: string,
        depth: number,
    ) => {
        if (depth > 6) {
            return (
                <p className="text-xs text-slate-500">
                    Depth limit reached.
                </p>
            );
        }

        if (Array.isArray(value)) {
            return (
                <div className="rounded-md border border-slate-800 bg-slate-950 p-3">
                    <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            {label} ({value.length})
                        </p>
                        <button
                            type="button"
                            onClick={() =>
                                handleAddArrayItem(
                                    path,
                                    value.length > 0 ? value[value.length - 1] : "",
                                )
                            }
                            className="text-xs text-slate-300 hover:text-white"
                        >
                            Thêm mục
                        </button>
                    </div>
                    <div className="mt-3 space-y-3">
                        {value.length === 0 && (
                            <p className="text-xs text-slate-500">
                                Empty list.
                            </p>
                        )}
                        {value.map((item, index) => (
                            <div
                                key={`${path}-${index}`}
                                className="rounded-md border border-slate-800 bg-slate-900 p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-400">
                                        Item {index + 1}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveArrayItem(path, index)
                                        }
                                        className="text-xs text-slate-400 hover:text-white"
                                    >
                                        Xóa
                                    </button>
                                </div>
                                <div className="mt-2">
                                    {renderField(
                                        item,
                                        `${path}[${index}]`,
                                        `Item ${index + 1}`,
                                        depth + 1,
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (isRecord(value)) {
            const entries = Object.entries(value);
            return (
                <div className="rounded-md border border-slate-800 bg-slate-950 p-3">
                    <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            {label || "Đối tượng"}
                        </p>
                    </div>
                    <InlineAddField
                        parentPath={path}
                        disabled={!docState}
                        onAdd={addFieldAt}
                    />
                    <div className="mt-3 space-y-3">
                        {entries.length === 0 && (
                            <p className="text-xs text-slate-500">
                                Empty object.
                            </p>
                        )}
                        {entries.map(([key, entryValue]) => (
                            <div key={`${path}-${key}`}>
                                {renderField(
                                    entryValue,
                                    path ? `${path}.${key}` : key,
                                    key,
                                    depth + 1,
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return renderPrimitiveField(value, path, label);
    };

    const currentImageValue =
        docState && imagePath ? getByPath(docState, imagePath) : undefined;
    const selectedValue =
        selectedPath && docState ? getByPath(docState, selectedPath) : undefined;
    const homeBlocks =
        collection === "home" && docState ? getByPath(docState, "blocks") : null;
    const blockList = Array.isArray(homeBlocks) ? homeBlocks : [];
    const isHtmlField =
        selectedPath.toLowerCase().endsWith("contenthtml") ||
        selectedPath.toLowerCase().includes("contenthtml");

    useEffect(() => {
        if (!isHtmlField || typeof selectedValue !== "string") return;
        setHtmlDraft(selectedValue);
    }, [isHtmlField, selectedValue]);

    useEffect(() => {
        if (collection !== "pages" || !docState) return;
        const slug = typeof docState.slug === "string" ? docState.slug : "";
        const type =
            typeof docState.type === "string"
                ? docState.type
                : slug === "about"
                  ? "about"
                  : slug === "privacy-policy" || slug === "terms-of-use"
                    ? "legal"
                    : "";
        if (type !== "legal") return;
        const htmlValue =
            typeof getByPath(docState, "contentHtml") === "string"
                ? (getByPath(docState, "contentHtml") as string)
                : "";
        setHtmlDraft(htmlValue);
    }, [collection, docState]);

    useEffect(() => {
        const resolvePreview = async () => {
            if (!adminKey) {
                setSignedPreviewUrl(null);
                return;
            }
            if (typeof currentImageValue !== "string") {
                setSignedPreviewUrl(null);
                return;
            }
            if (!isSupabasePathValue(currentImageValue)) {
                setSignedPreviewUrl(currentImageValue);
                return;
            }

            const normalized = normalizeSupabasePath(currentImageValue);
            const known = mediaItems.find((item) => item.path === normalized);
            if (known?.url) {
                setSignedPreviewUrl(known.url);
                return;
            }

            try {
                const res = await fetch(
                    `/api/admin/sign?path=${encodeURIComponent(normalized)}`,
                    {
                        headers: { "x-admin-key": adminKey },
                        cache: "no-store",
                    },
                );
                const json = (await res.json()) as { url?: string; error?: string };
                if (!res.ok || !json.url) {
                    setSignedPreviewUrl(null);
                    return;
                }
                setSignedPreviewUrl(json.url);
            } catch {
                setSignedPreviewUrl(null);
            }
        };

        resolvePreview();
    }, [adminKey, currentImageValue, mediaItems]);

    const renderSimpleFields = (fields: SimpleField[]) => {
        if (!fields.length) {
            return (
                <p className="text-xs text-slate-500">
                    Chưa có trường nào để hiển thị.
                </p>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-3">
                {fields.map((field) => {
                    const rawValue = docState
                        ? getByPath(docState, field.path)
                        : "";
                    const value =
                        field.type === "list"
                            ? formatListValue(rawValue)
                            : field.type === "checkbox"
                              ? Boolean(rawValue)
                              : rawValue ?? "";

                    if (field.type === "checkbox") {
                        return (
                            <label
                                key={field.path}
                                className="flex items-center gap-3 text-sm text-slate-200"
                            >
                                <input
                                    type="checkbox"
                                    checked={Boolean(value)}
                                    onChange={(e) =>
                                        handleSimpleFieldChange(
                                            field,
                                            e.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-900"
                                />
                                {field.label}
                            </label>
                        );
                    }

                    if (field.type === "textarea" || field.type === "list") {
                        const isContentField = field.path === "content";
                        const currentValue = String(value);

                        return (
                            <label
                                key={field.path}
                                className="space-y-1 text-xs text-slate-400"
                            >
                                <div className="flex items-center justify-between">
                                    <span>{field.label}</span>
                                    {isContentField && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!contentTextMode) {
                                                    // Switching to text mode: cache HTML and convert to text
                                                    setContentCachedHtml(currentValue);
                                                    handleSimpleFieldChange(
                                                        field,
                                                        htmlToText(currentValue),
                                                    );
                                                } else {
                                                    // Switching back to HTML mode: restore cached HTML if available
                                                    handleSimpleFieldChange(
                                                        field,
                                                        contentCachedHtml ||
                                                            textToHtml(currentValue),
                                                    );
                                                }
                                                setContentTextMode((v) => !v);
                                            }}
                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                        >
                                            {contentTextMode ? "Xem HTML" : "Xem text"}
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={currentValue}
                                    rows={field.rows || (field.type === "list" ? 4 : 3)}
                                    onChange={(e) =>
                                        handleSimpleFieldChange(
                                            field,
                                            e.target.value,
                                        )
                                    }
                                    placeholder={field.placeholder}
                                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                                />
                                {field.type === "list" && (
                                    <span className="text-[11px] text-slate-500">
                                        Mỗi dòng là một mục.
                                    </span>
                                )}
                            </label>
                        );
                    }

                    if (field.type === "image") {
                        return (
                            <label
                                key={field.path}
                                className="space-y-1 text-xs text-slate-400"
                            >
                                <span>{field.label}</span>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-2">
                                        <input
                                            type="text"
                                            value={String(value)}
                                            onChange={(e) =>
                                                handleSimpleFieldChange(
                                                    field,
                                                    e.target.value,
                                                )
                                            }
                                            onFocus={() =>
                                                setImagePath(field.path)
                                            }
                                            placeholder={
                                                field.placeholder ||
                                                "Dán URL hoặc uploads/..."
                                            }
                                            className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                triggerUploadForPath(field.path)
                                            }
                                            className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500"
                                        >
                                            Tải ảnh
                                        </button>
                                    </div>
                                    <span className="text-[11px] text-slate-500">
                                        Hỗ trợ URL hoặc upload ảnh mới.
                                    </span>
                                </div>
                            </label>
                        );
                    }

                    if (field.type === "video") {
                        return (
                            <label
                                key={field.path}
                                className="space-y-1 text-xs text-slate-400"
                            >
                                <span>{field.label}</span>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        value={String(value)}
                                        onChange={(e) =>
                                            handleSimpleFieldChange(
                                                field,
                                                e.target.value,
                                            )
                                        }
                                        placeholder={
                                            field.placeholder ||
                                            "Dán URL video (YouTube, Vimeo, MP4, etc.)"
                                        }
                                        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                                    />
                                    <span className="text-[11px] text-slate-500">
                                        Hỗ trợ YouTube, Vimeo, MP4, WebM, và các URL video khác.
                                    </span>
                                </div>
                            </label>
                        );
                    }

                    return (
                        <label
                            key={field.path}
                            className="space-y-1 text-xs text-slate-400"
                        >
                            <span>{field.label}</span>
                            <div className="flex flex-wrap gap-2">
                                <input
                                    type="text"
                                    value={String(value)}
                                    onChange={(e) =>
                                        handleSimpleFieldChange(
                                            field,
                                            e.target.value,
                                        )
                                    }
                                    placeholder={field.placeholder}
                                    className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                                />
                                {collection === "news" &&
                                    field.path === "slug" && (
                                        <button
                                            type="button"
                                            onClick={handleGenerateSlug}
                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                        >
                                            Tạo slug
                                        </button>
                                    )}
                            </div>
                        </label>
                    );
                })}
            </div>
        );
    };

    const renderSectionCard = (
        title: string,
        children: ReactNode,
        helper?: string,
    ) => (
        <div className="space-y-2 rounded-md border border-slate-800 bg-slate-900 p-3">
            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    {title}
                </p>
                {helper && (
                    <p className="text-[11px] text-slate-500">{helper}</p>
                )}
            </div>
            {children}
        </div>
    );

    const renderObjectArrayEditor = ({
        title,
        path,
        fields,
        emptyItem,
        helper,
    }: ArrayEditorConfig) => {
        const list = docState ? getByPath(docState, path) : null;
        const items = Array.isArray(list) ? list : [];

        return (
            <div className="space-y-2 rounded-md border border-slate-800 bg-slate-900 p-3">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            {title}
                        </p>
                        {helper && (
                            <p className="text-[11px] text-slate-500">
                                {helper}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => handleAddArrayItem(path, emptyItem)}
                        className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                    >
                        + Thêm
                    </button>
                </div>
                {items.length === 0 && (
                    <p className="text-xs text-slate-500">
                        Chưa có dữ liệu.
                    </p>
                )}
                <div className="space-y-3">
                    {items.map((_, index) => {
                        const itemFields = fields.map((field) => ({
                            ...field,
                            path: `${path}[${index}].${field.path}`,
                        }));
                        return (
                            <div
                                key={`${path}-${index}`}
                                className="rounded-md border border-slate-800 bg-slate-950 p-3"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs text-slate-400">
                                        {title} #{index + 1}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                moveArrayItem(
                                                    path,
                                                    index,
                                                    index - 1,
                                                )
                                            }
                                            disabled={index === 0}
                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Lên
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                moveArrayItem(
                                                    path,
                                                    index,
                                                    index + 1,
                                                )
                                            }
                                            disabled={index === items.length - 1}
                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Xuống
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveArrayItem(
                                                    path,
                                                    index,
                                                )
                                            }
                                            className="rounded-md border border-rose-500/60 px-2 py-1 text-[11px] text-rose-100 hover:border-rose-400"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {renderSimpleFields(itemFields)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderHomeEditor = () => {
        if (collection !== "home") return null;
        if (!docState) {
            return renderSectionCard(
                "Trang chủ",
                <p className="text-xs text-slate-500">
                    Chưa có dữ liệu trang chủ.
                </p>,
            );
        }

        const heroFields: SimpleField[] = [
            { label: "Tiêu đề chính", path: "hero.headline", type: "text" },
            {
                label: "Mô tả ngắn",
                path: "hero.subheadline",
                type: "textarea",
                rows: 2,
            },
        ];
        const aboutFields: SimpleField[] = [
            { label: "Tiêu đề", path: "about.title", type: "text" },
            { label: "Tiêu đề phụ", path: "about.heading", type: "text" },
            {
                label: "Nội dung",
                path: "about.body",
                type: "textarea",
                rows: 4,
            },
            { label: "Ảnh", path: "about.image", type: "image" },
            { label: "Mô tả ảnh", path: "about.imageAlt", type: "text" },
        ];
        const clientFields: SimpleField[] = [
            { label: "Tiêu đề", path: "clients.title", type: "text" },
        ];

        return (
            <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Trang chủ
                </p>
                <div className="space-y-3">
                    {renderSectionCard("Hero", renderSimpleFields(heroFields))}
                    {renderObjectArrayEditor({
                        title: "Banner",
                        path: "bannerSlides",
                        helper: "Các slide banner ở đầu trang.",
                        emptyItem: {
                            id: "",
                            image: "",
                            alt: "",
                            title: "",
                            description: "",
                        },
                        fields: [
                            { label: "Ảnh", path: "image", type: "image" },
                            { label: "Tiêu đề", path: "title", type: "text" },
                            {
                                label: "Mô tả",
                                path: "description",
                                type: "textarea",
                                rows: 2,
                            },
                            { label: "Alt ảnh", path: "alt", type: "text" },
                        ],
                    })}
                    {renderSectionCard(
                        "Giới thiệu",
                        renderSimpleFields(aboutFields),
                    )}
                    {renderObjectArrayEditor({
                        title: "Thông số nổi bật",
                        path: "about.stats",
                        helper: "Ví dụ: 20+ dự án, 15+ chuyên gia.",
                        emptyItem: { value: "", label: "" },
                        fields: [
                            { label: "Giá trị", path: "value", type: "text" },
                            { label: "Nhãn", path: "label", type: "text" },
                        ],
                    })}
                    {renderSectionCard(
                        "Khách hàng",
                        renderSimpleFields(clientFields),
                    )}
                    {renderObjectArrayEditor({
                        title: "Logo khách hàng",
                        path: "clients.logos",
                        emptyItem: {
                            id: "",
                            image: "",
                            alt: "",
                        },
                        fields: [
                            { label: "Ảnh", path: "image", type: "image" },
                            { label: "Alt ảnh", path: "alt", type: "text" },
                        ],
                    })}
                    <div className="space-y-2 rounded-md border border-slate-800 bg-slate-900 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Bố cục trang chủ
                                </p>
                                <p className="text-[11px] text-slate-500">
                                    Bật/tắt và sắp xếp các khu vực.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <select
                                    value={homeBlockType}
                                    onChange={(event) =>
                                        setHomeBlockType(event.target.value)
                                    }
                                    aria-label="Chọn khu vực trang chủ"
                                    title="Chọn khu vực trang chủ"
                                    className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs"
                                >
                                    {HOME_BLOCK_OPTIONS.map((option) => (
                                        <option
                                            key={option.type}
                                            value={option.type}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addHomeBlock}
                                    className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                >
                                    + Thêm khu vực
                                </button>
                            </div>
                        </div>
                        {blockList.length === 0 && (
                            <p className="text-xs text-slate-500">
                                Chưa có khu vực nào.
                            </p>
                        )}
                        <div className="space-y-2">
                            {blockList.map((block, index) => {
                                const label =
                                    typeof (block as Record<string, unknown>)
                                        .label === "string"
                                        ? String(
                                              (block as Record<string, unknown>)
                                                  .label,
                                          )
                                        : String(
                                              (block as Record<string, unknown>)
                                                  .type || "Khu vực",
                                          );
                                const visible =
                                    (block as Record<string, unknown>)
                                        .visible !== false;
                                return (
                                    <div
                                        key={`${label}-${index}`}
                                        className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-800 bg-slate-950 p-2"
                                    >
                                        <div>
                                            <p className="text-xs font-semibold text-slate-200">
                                                {label}
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {visible
                                                    ? "Đang hiển thị"
                                                    : "Đang ẩn"}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    moveArrayItem(
                                                        "blocks",
                                                        index,
                                                        index - 1,
                                                    )
                                                }
                                                disabled={index === 0}
                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                Lên
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    moveArrayItem(
                                                        "blocks",
                                                        index,
                                                        index + 1,
                                                    )
                                                }
                                                disabled={
                                                    index === blockList.length - 1
                                                }
                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                Xuống
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleHomeBlockVisibility(index)
                                                }
                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                            >
                                                {visible ? "Ẩn" : "Hiện"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeHomeBlock(index)
                                                }
                                                className="rounded-md border border-rose-500/60 px-2 py-1 text-[11px] text-rose-100 hover:border-rose-400"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderPagesEditor = () => {
        if (collection !== "pages") return null;
        if (!docState) {
            return renderSectionCard(
                "Trang nội dung",
                <p className="text-xs text-slate-500">
                    Chưa có dữ liệu trang.
                </p>,
            );
        }

        const slug = typeof docState.slug === "string" ? docState.slug : "";
        const type =
            typeof docState.type === "string"
                ? docState.type
                : slug === "about"
                  ? "about"
                  : slug === "privacy-policy" || slug === "terms-of-use"
                    ? "legal"
                    : "";

        if (type === "legal") {
            return (
                <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Trang pháp lý
                    </p>
                    {renderSimpleFields([
                        { label: "Tiêu đề", path: "title", type: "text" },
                    ])}
                    <div className="space-y-2 rounded-md border border-slate-800 bg-slate-950 p-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Nội dung bài viết
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => runHtmlCommand("bold")}
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                Đậm
                            </button>
                            <button
                                type="button"
                                onClick={() => runHtmlCommand("italic")}
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                Nghiêng
                            </button>
                            <button
                                type="button"
                                onClick={() => runHtmlCommand("underline")}
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                Gạch chân
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    runHtmlCommand("formatBlock", "h2")
                                }
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                H2
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    runHtmlCommand("formatBlock", "h3")
                                }
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                H3
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    runHtmlCommand("insertUnorderedList")
                                }
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                Danh sách chấm
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    runHtmlCommand("insertOrderedList")
                                }
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                Danh sách số
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const url = window.prompt("URL");
                                    if (url) {
                                        runHtmlCommand("createLink", url);
                                    }
                                }}
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                Liên kết
                            </button>
                            <button
                                type="button"
                                onClick={() => runHtmlCommand("removeFormat")}
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                                Xóa định dạng
                            </button>
                        </div>
                        <div
                            ref={htmlEditorRef}
                            contentEditable
                            suppressContentEditableWarning
                            onDragOver={(event) => {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = "copy";
                            }}
                            onDrop={handleDropIntoHtmlEditor}
                            onInput={(event) =>
                                setHtmlDraft(
                                    (event.currentTarget as HTMLDivElement)
                                        .innerHTML,
                                )
                            }
                            onBlur={() =>
                                applyDocUpdate((draft) => {
                                    setByPath(draft, "contentHtml", htmlDraft);
                                })
                            }
                            dangerouslySetInnerHTML={{ __html: htmlDraft }}
                            className="min-h-[200px] w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() =>
                                    applyDocUpdate((draft) => {
                                        setByPath(
                                            draft,
                                            "contentHtml",
                                            htmlDraft,
                                        );
                                    })
                                }
                                className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
                            >
                                Áp dụng nội dung
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        const aboutFields: SimpleField[] = [
            { label: "Tiêu đề", path: "content.title", type: "text" },
            {
                label: "Giới thiệu ngắn",
                path: "content.intro",
                type: "textarea",
                rows: 3,
            },
        ];
        const visionFields: SimpleField[] = [
            { label: "Tiêu đề", path: "content.vision.title", type: "text" },
            {
                label: "Nội dung",
                path: "content.vision.body",
                type: "textarea",
                rows: 4,
            },
        ];
        const missionFields: SimpleField[] = [
            { label: "Tiêu đề", path: "content.mission.title", type: "text" },
            {
                label: "Nội dung (mỗi dòng 1 ý)",
                path: "content.mission.body",
                type: "list",
                rows: 4,
            },
        ];
        const coreValuesTitleFields: SimpleField[] = [
            {
                label: "Tiêu đề",
                path: "content.coreValuesTitle",
                type: "text",
            },
        ];
        const ctaFields: SimpleField[] = [
            { label: "Tiêu đề", path: "content.cta.title", type: "text" },
            {
                label: "Nội dung",
                path: "content.cta.body",
                type: "textarea",
                rows: 3,
            },
            {
                label: "Nhãn nút",
                path: "content.cta.buttonText",
                type: "text",
            },
            {
                label: "Link nút",
                path: "content.cta.buttonHref",
                type: "text",
            },
        ];

        return (
            <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Trang giới thiệu
                </p>
                <div className="space-y-3">
                    {renderSectionCard(
                        "Giới thiệu",
                        renderSimpleFields(aboutFields),
                    )}
                    {renderSectionCard(
                        "Tầm nhìn",
                        renderSimpleFields(visionFields),
                    )}
                    {renderSectionCard(
                        "Sứ mệnh",
                        renderSimpleFields(missionFields),
                    )}
                    {renderSectionCard(
                        "Giá trị cốt lõi",
                        renderSimpleFields(coreValuesTitleFields),
                    )}
                    {renderObjectArrayEditor({
                        title: "Danh sách giá trị cốt lõi",
                        path: "content.coreValues",
                        emptyItem: { title: "", body: "" },
                        fields: [
                            { label: "Tiêu đề", path: "title", type: "text" },
                            {
                                label: "Nội dung",
                                path: "body",
                                type: "textarea",
                                rows: 3,
                            },
                        ],
                    })}
                    {renderSectionCard("CTA", renderSimpleFields(ctaFields))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <input
                type="file"
                accept="image/*"
                multiple
                ref={uploadInputRef}
                aria-label="Tải ảnh"
                onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) handleUpload(files);
                    if (e.target) e.target.value = "";
                }}
                className="hidden"
            />
            <div className="border-b border-slate-800 bg-slate-900">
                <div className="container mx-auto px-4 py-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-semibold">
                            Quản trị nội dung
                        </h1>
                        <p className="text-sm text-slate-400">
                            Chỉnh sửa nội dung nhanh, xem preview bên phải.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <input
                            type="password"
                            placeholder="Mã quản trị"
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                            aria-label="Mã quản trị"
                            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                        />
                        <button
                            type="button"
                            onClick={loadDocs}
                            disabled={!adminKey || loadingDocs}
                            className="rounded-md bg-slate-200 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loadingDocs ? "Đang tải..." : "Làm mới"}
                        </button>
                        <button
                            type="button"
                            onClick={draftEnabled ? handleDisableDraft : handleEnableDraft}
                            disabled={!adminKey || draftBusy}
                            className="rounded-md border border-slate-600 px-3 py-2 text-sm font-medium text-slate-100 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {draftEnabled ? "Tắt bản nháp" : "Bật bản nháp"}
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!adminKey || saving}
                            className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? "Đang lưu..." : "Lưu"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="border-r border-slate-900 bg-slate-950">
                    <div className="p-4 flex flex-col gap-5">
                        <div className="space-y-2 rounded-md border border-slate-800 bg-slate-900 p-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Khu vực nội dung
                                </p>
                                <span className="text-[11px] text-slate-500">
                                    Chọn để chỉnh sửa
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                {QUICK_AREAS.map((area) => (
                                    <button
                                        key={area.id}
                                        type="button"
                                        onClick={() => handleSelectArea(area.id)}
                                        className={`rounded-md border px-2 py-2 text-xs transition ${
                                            quickArea === area.id
                                                ? "border-primary-500 bg-slate-800 text-white"
                                                : "border-slate-800 text-slate-300 hover:border-slate-600"
                                        }`}
                                    >
                                        {area.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Danh sách {collectionLabel}
                                    </p>
                                    {isSimpleCollection && (
                                        <button
                                            type="button"
                                            onClick={handleCreateNew}
                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                        >
                                            + Thêm
                                        </button>
                                    )}
                                </div>
                                {collection === "news" && (
                                    <p className="text-[11px] text-slate-500">
                                        Kéo thả để sắp xếp thứ tự tin tức.
                                    </p>
                                )}
                                <div className="rounded-md border border-slate-800 bg-slate-900">
                                    {docs.length === 0 && (
                                        <p className="p-3 text-sm text-slate-500">
                                            Chưa có dữ liệu.
                                        </p>
                                    )}
                                    {isSimpleCollection ? (
                                        <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
                                            {docs.map((doc, index) => {
                                                const title = pickDocTitle(doc);
                                                const summary = pickDocSummary(doc);
                                                const image = pickDocImage(doc);
                                                const isActive =
                                                    selectedIndex === index;
                                                return (
                                                    <button
                                                        key={`${getDocLabel(doc)}-${index}`}
                                                        type="button"
                                                        draggable={collection === "news"}
                                                        onDragStart={() =>
                                                            setDocDragIndex(index)
                                                        }
                                                        onDragOver={(event) => {
                                                            if (collection !== "news") return;
                                                            event.preventDefault();
                                                            event.dataTransfer.dropEffect =
                                                                "move";
                                                        }}
                                                        onDrop={(event) => {
                                                            event.preventDefault();
                                                            if (
                                                                collection !== "news" ||
                                                                docDragIndex == null
                                                            )
                                                                return;
                                                            const targetIndex = index;
                                                            if (docDragIndex === targetIndex) {
                                                                setDocDragIndex(null);
                                                                return;
                                                            }
                                                            reorderDocs(docDragIndex, targetIndex);
                                                            setDocDragIndex(null);
                                                        }}
                                                        onDragEnd={() =>
                                                            setDocDragIndex(null)
                                                        }
                                                        onClick={() =>
                                                            handleSelectDoc(index)
                                                        }
                                                        className={`rounded-md border px-3 py-2 text-left text-xs transition ${
                                                            isActive
                                                                ? "border-primary-500 bg-slate-800 text-white"
                                                                : "border-slate-800 text-slate-300 hover:border-slate-600"
                                                        } ${
                                                            docDragIndex === index
                                                                ? "border-primary-500 bg-slate-800/60"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="flex gap-2">
                                                            <div className="relative h-12 w-12 overflow-hidden rounded-md border border-slate-800 bg-slate-950">
                                                                {image ? (
                                                                    <Image
                                                                        src={image}
                                                                        alt={title}
                                                                        fill
                                                                        className="object-cover"
                                                                        unoptimized
                                                                    />
                                                                ) : (
                                                                    <span className="flex h-full w-full items-center justify-center text-lg">
                                                                        📰
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-sm font-semibold text-slate-100">
                                                                    {title}
                                                                </p>
                                                                {summary && (
                                                                    <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">
                                                                        {summary}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        docs.map((doc, index) => (
                                            <button
                                                key={`${getDocLabel(doc)}-${index}`}
                                                type="button"
                                                onClick={() =>
                                                    handleSelectDoc(index)
                                                }
                                                className={`block w-full px-3 py-2 text-left text-sm transition ${
                                                    selectedIndex === index
                                                        ? "bg-slate-800 text-white"
                                                        : "text-slate-300 hover:bg-slate-800"
                                                }`}
                                            >
                                                {getDocLabel(doc)}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Đường dẫn xem trước
                                </p>
                                <input
                                    type="text"
                                    value={previewPath}
                                    onChange={(e) =>
                                        setPreviewPath(e.target.value)
                                    }
                                    aria-label="Đường dẫn xem trước"
                                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        window.open(previewPath, "_blank")
                                    }
                                    className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
                                >
                                    Mở xem trước
                                </button>
                            </div>
                        </div>

                        {isSimpleCollection && (
                            <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Biểu mẫu nhanh
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {allowDelete && selectedIndex >= 0 && (
                                            <button
                                                type="button"
                                                onClick={handleDeleteDoc}
                                                disabled={deleting}
                                                className="rounded-md border border-rose-500/60 px-2 py-1 text-[11px] text-rose-100 hover:border-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {deleting ? "Đang xóa..." : "Xóa"}
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={handleCreateNew}
                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                        >
                                            + Thêm mới
                                        </button>
                                    </div>
                                </div>

                                {collection === "news" && (
                                    <div className="space-y-2 rounded-md border border-slate-800 bg-slate-950 p-3">
                                        <p className="text-xs uppercase tracking-wide text-slate-500">
                                            Lấy dữ liệu từ URL
                                        </p>
                                        <div className="flex flex-col gap-2 md:flex-row">
                                            <input
                                                type="text"
                                                value={newsUrl}
                                                onChange={(e) =>
                                                    setNewsUrl(e.target.value)
                                                }
                                                placeholder="Dán URL bài viết cần lấy thông tin"
                                                aria-label="URL bài viết cần lấy thông tin"
                                                className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleImportNewsUrl}
                                                disabled={
                                                    !adminKey || newsImporting
                                                }
                                                className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {newsImporting
                                                    ? "Đang lấy..."
                                                    : "Lấy thông tin"}
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-slate-500">
                                            Hệ thống sẽ lấy tiêu đề, mô tả,
                                            ảnh đại diện và tạo slug tự động.
                                        </p>
                                    </div>
                                )}

                                {renderSimpleFields(simpleFields)}
                            </div>
                        )}

                        {renderHomeEditor()}
                        {renderPagesEditor()}

                        <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Nâng cao
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowAdvanced((prev) => !prev)}
                                className="text-xs text-slate-300 hover:text-white"
                            >
                                {showAdvanced ? "Ẩn nâng cao" : "Hiện nâng cao"}
                            </button>
                        </div>

                        {showAdvanced && (
                            <>
                                <div className="space-y-2 rounded-md border border-slate-800 bg-slate-900 p-3">
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Danh mục nâng cao
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <select
                                            value={collection}
                                            onChange={(e) =>
                                                setCollection(e.target.value)
                                            }
                                            aria-label="Chọn danh mục nâng cao"
                                            title="Chọn danh mục nâng cao"
                                            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                                        >
                                            {COLLECTIONS.map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={handleCreateNew}
                                            className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
                                        >
                                            + Tạo mới
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Chỉnh sửa chi tiết
                                </p>
                            </div>
                            <div className="rounded-md border border-slate-800 bg-slate-900 p-3">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Trường đang chọn
                                </p>
                                {selectedPath ? (
                                    <div className="mt-2 space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-xs text-slate-300">
                                                {selectedPath}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setImagePath(selectedPath)
                                                    }
                                                    className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                >
                                                    Dùng làm đường dẫn ảnh
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        try {
                                                            await navigator.clipboard.writeText(
                                                                selectedPath,
                                                            );
                                                            setStatusMessage(
                                                                "Đã sao chép đường dẫn.",
                                                            );
                                                        } catch {
                                                            setStatusMessage(
                                                                "Sao chép thất bại.",
                                                            );
                                                        }
                                                    }}
                                                    className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                >
                                                    Sao chép đường dẫn
                                                </button>
                                            </div>
                                        </div>
                                        {typeof selectedValue === "string" &&
                                            (isHtmlField ? (
                                                <div className="space-y-2">
                                                    <div className="flex flex-wrap gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "bold",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            Đậm
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "italic",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            Nghiêng
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "underline",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            Gạch chân
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "formatBlock",
                                                                    "h2",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            H2
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "formatBlock",
                                                                    "h3",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            H3
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "insertUnorderedList",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            Danh sách chấm
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "insertOrderedList",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            Danh sách số
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const url =
                                                                    window.prompt(
                                                                        "URL",
                                                                    );
                                                                if (url) {
                                                                    runHtmlCommand(
                                                                        "createLink",
                                                                        url,
                                                                    );
                                                                }
                                                            }}
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            Liên kết
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                runHtmlCommand(
                                                                    "removeFormat",
                                                                )
                                                            }
                                                            className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                        >
                                                            Xóa định dạng
                                                        </button>
                                                    </div>
                                                    <div
                                                        ref={htmlEditorRef}
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        role="textbox"
                                                        aria-multiline="true"
                                                        aria-label="Nội dung HTML"
                                                        onInput={(event) =>
                                                            setHtmlDraft(
                                                                (event.currentTarget as HTMLDivElement)
                                                                    .innerHTML,
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            applyHtmlDraft()
                                                        }
                                                        dangerouslySetInnerHTML={{
                                                            __html: htmlDraft,
                                                        }}
                                                        className="min-h-[140px] w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                                                    />
                                                    <div className="flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={applyHtmlDraft}
                                                            className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
                                                        >
                                                            Áp dụng HTML
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <textarea
                                                    value={selectedValue}
                                                    onChange={(e) =>
                                                        applyDocUpdate(
                                                            (draft) => {
                                                                setByPath(
                                                                    draft,
                                                                    selectedPath,
                                                                    e.target.value,
                                                                );
                                                            },
                                                        )
                                                    }
                                                    aria-label={
                                                        selectedPath || "Giá trị trường"
                                                    }
                                                    title={selectedPath || "Giá trị trường"}
                                                    className="min-h-[80px] w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                                                />
                                            ))}
                                        {typeof selectedValue === "number" && (
                                            <input
                                                type="number"
                                                value={selectedValue}
                                                onChange={(e) =>
                                                    applyDocUpdate((draft) => {
                                                        const nextValue = Number(
                                                            e.target.value,
                                                        );
                                                        setByPath(
                                                            draft,
                                                            selectedPath,
                                                            Number.isFinite(
                                                                nextValue,
                                                            )
                                                                ? nextValue
                                                                : 0,
                                                        );
                                                    })
                                                }
                                                aria-label={
                                                    selectedPath || "Giá trị trường"
                                                }
                                                title={selectedPath || "Giá trị trường"}
                                                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                                            />
                                        )}
                                        {typeof selectedValue === "boolean" && (
                                            <label className="flex items-center gap-2 text-sm text-slate-200">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedValue}
                                                    onChange={(e) =>
                                                        applyDocUpdate((draft) => {
                                                            setByPath(
                                                                draft,
                                                                selectedPath,
                                                                e.target.checked,
                                                            );
                                                        })
                                                    }
                                                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-primary-500"
                                                />
                                                Bật/Tắt
                                            </label>
                                        )}
                                        {selectedValue != null &&
                                            typeof selectedValue !== "string" &&
                                            typeof selectedValue !== "number" &&
                                            typeof selectedValue !== "boolean" && (
                                                <pre className="max-h-32 overflow-auto rounded-md border border-slate-800 bg-slate-950 p-2 text-xs text-slate-300">
                                                    {JSON.stringify(
                                                        selectedValue,
                                                        null,
                                                        2,
                                                    )}
                                                </pre>
                                            )}
                                    </div>
                                ) : (
                                    <p className="mt-2 text-xs text-slate-500">
                                        Bấm vào nội dung ở preview để chọn.
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                                <input
                                    type="text"
                                    value={newFieldParent}
                                    onChange={(e) => setNewFieldParent(e.target.value)}
                                    placeholder="Đường dẫn cha (tuỳ chọn)"
                                    aria-label="Đường dẫn cha"
                                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs"
                                />
                                <input
                                    type="text"
                                    value={newFieldName}
                                    onChange={(e) => setNewFieldName(e.target.value)}
                                    placeholder="Tên trường"
                                    aria-label="Tên trường"
                                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs"
                                />
                                <select
                                    value={newFieldType}
                                    onChange={(e) =>
                                        setNewFieldType(e.target.value as FieldType)
                                    }
                                    aria-label="Loại trường mới"
                                    title="Loại trường mới"
                                    className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs"
                                >
                                    <option value="string">Chuỗi</option>
                                    <option value="number">Số</option>
                                    <option value="boolean">Đúng/Sai</option>
                                    <option value="object">Đối tượng</option>
                                    <option value="array">Mảng</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={handleAddField}
                                    disabled={!docState}
                                    className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Thêm
                                </button>
                            </div>
                            <p className="text-xs text-slate-500">
                                Ví dụ: hero, sections[0], data.items
                            </p>
                        <div className="space-y-3">
                            {docState ? (
                                renderField(docState, "", "Tài liệu", 0)
                            ) : (
                                <p className="text-sm text-slate-500">
                                    Chọn tài liệu để chỉnh sửa.
                                </p>
                            )}
                        </div>
                    </div>

                        {collection === "home" && (
                            <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Bố cục trang chủ
                                    </p>
                                    <span className="text-[11px] text-slate-500">
                                        Drag to reorder
                                    </span>
                                </div>
                                {blockList.length === 0 ? (
                                    <p className="text-xs text-slate-500">
                                        No blocks yet.
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {blockList.map((block, index) => {
                                            const record = block as Record<
                                                string,
                                                unknown
                                            >;
                                            const type =
                                                typeof record.type === "string"
                                                    ? record.type
                                                    : "unknown";
                                            const label =
                                                typeof record.label === "string"
                                                    ? record.label
                                                    : type;
                                            const visible =
                                                record.visible !== false;

                                            return (
                                                <div
                                                    key={`${type}-${index}`}
                                                    draggable
                                                    onDragStart={() =>
                                                        setDragIndex(index)
                                                    }
                                                    onDragOver={(event) => {
                                                        event.preventDefault();
                                                        event.dataTransfer.dropEffect =
                                                            "move";
                                                    }}
                                                    onDrop={(event) => {
                                                        event.preventDefault();
                                                        if (dragIndex == null)
                                                            return;
                                                        moveArrayItem(
                                                            "blocks",
                                                            dragIndex,
                                                            index,
                                                        );
                                                        setDragIndex(null);
                                                    }}
                                                    onDragEnd={() =>
                                                        setDragIndex(null)
                                                    }
                                                    className={`rounded-md border p-3 transition ${
                                                        dragIndex === index
                                                            ? "border-primary-500 bg-slate-800/70"
                                                            : "border-slate-800 bg-slate-950"
                                                    }`}
                                                >
                                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-100">
                                                                {label}
                                                            </p>
                                                            <p className="text-[11px] text-slate-500">
                                                                {type}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    moveArrayItem(
                                                                        "blocks",
                                                                        index,
                                                                        index - 1,
                                                                    )
                                                                }
                                                                disabled={
                                                                    index === 0
                                                                }
                                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                                            >
                                                                Up
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    moveArrayItem(
                                                                        "blocks",
                                                                        index,
                                                                        index + 1,
                                                                    )
                                                                }
                                                                disabled={
                                                                    index ===
                                                                    blockList.length -
                                                                        1
                                                                }
                                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                                            >
                                                                Down
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleHomeBlockVisibility(
                                                                        index,
                                                                    )
                                                                }
                                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                                            >
                                                                {visible
                                                                    ? "Hide"
                                                                    : "Show"}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeHomeBlock(
                                                                        index,
                                                                    )
                                                                }
                                                                className="rounded-md border border-rose-500/60 px-2 py-1 text-[11px] text-rose-100 hover:border-rose-400"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <select
                                        value={homeBlockType}
                                        onChange={(event) =>
                                            setHomeBlockType(event.target.value)
                                        }
                                        aria-label="Chọn khu vực trang chủ"
                                        title="Chọn khu vực trang chủ"
                                        className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
                                    >
                                        {HOME_BLOCK_OPTIONS.map((option) => (
                                            <option
                                                key={option.type}
                                                value={option.type}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={addHomeBlock}
                                        className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500"
                                    >
                                        Thêm khu vực
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Công cụ ảnh
                            </p>
                            <input
                                type="text"
                                value={imagePath}
                                onChange={(e) => setImagePath(e.target.value)}
                                placeholder="Đường dẫn field (vd: image, hero.image, items[0].image)"
                                aria-label="Đường dẫn field ảnh"
                                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
                            />
                            <div className="flex flex-col gap-2 md:flex-row">
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Dán URL ảnh"
                                    aria-label="URL ảnh"
                                    className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleApplyImageUrl()}
                                    className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500"
                                >
                                    Áp dụng URL
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => uploadInputRef.current?.click()}
                                className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500"
                            >
                                Chọn ảnh từ máy
                            </button>
                            <label className="flex items-center gap-2 text-xs text-slate-400">
                                <input
                                    type="checkbox"
                                    checked={uploadOverwrite}
                                    onChange={(e) => setUploadOverwrite(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                                />
                                Ghi đè ảnh hiện tại
                            </label>
                            {uploading && (
                                <p className="text-xs text-slate-400">
                                    Đang tải ảnh...
                                </p>
                            )}
                            {typeof currentImageValue === "string" && (
                                <div className="space-y-2">
                                    <p className="text-xs text-slate-500">
                                        Ảnh hiện tại theo đường dẫn
                                    </p>
                                    <div className="relative overflow-hidden rounded-md border border-slate-800">
                                        {signedPreviewUrl ? (
                                            <Image
                                                src={signedPreviewUrl}
                                                alt="Current"
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex h-32 items-center justify-center text-xs text-slate-500">
                                                Không thể xem trước
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            <p className="text-xs text-slate-500">
                                Upload sẽ lưu vào Supabase Storage (ổn định
                                khi deploy). Giới hạn 2MB/ảnh.
                            </p>
                        </div>

                        <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Thư viện ảnh
                                </p>
                                <button
                                    type="button"
                                    onClick={loadMedia}
                                    disabled={!adminKey || mediaLoading}
                                    className="text-xs text-slate-300 hover:text-white disabled:opacity-60"
                                >
                                    {mediaLoading ? "Đang tải..." : "Làm mới"}
                                </button>
                            </div>
                            <input
                                type="text"
                                value={mediaQuery}
                                onChange={(e) => setMediaQuery(e.target.value)}
                                placeholder="Tìm ảnh"
                                aria-label="Tìm ảnh trong thư viện"
                                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
                            />
                            {filteredMedia.length === 0 && (
                                <p className="text-xs text-slate-500">
                                    Không có ảnh.
                                </p>
                            )}
                            <div className="text-[11px] text-slate-500">
                                Kéo ảnh từ đây và thả vào ô nội dung (HTML) để chèn vào vị trí mong muốn.
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {filteredMedia.map((item) => (
                                    <div
                                        key={item.name}
                                        draggable
                                        onDragStart={(event) => {
                                            const url = item.url;
                                            event.dataTransfer.setData(
                                                "text/plain",
                                                url,
                                            );
                                            event.dataTransfer.setData(
                                                "text/uri-list",
                                                url,
                                            );
                                        }}
                                        className="rounded-md border border-slate-800 bg-slate-950 p-2"
                                    >
                                        <div className="relative aspect-video overflow-hidden rounded-sm border border-slate-800 bg-slate-900">
                                            <Image
                                                src={item.url}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        <p className="mt-2 truncate text-xs text-slate-200">
                                            {item.name}
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            {formatBytes(item.size)} •{" "}
                                            {new Date(item.updatedAt).toLocaleString()}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleApplyMedia({
                                                        url: item.url,
                                                        path: item.path,
                                                    })
                                                }
                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                            >
                                                Dùng
                                            </button>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (!item.path) return;
                                                    try {
                                                        await navigator.clipboard.writeText(
                                                            item.path,
                                                        );
                                                        setStatusMessage(
                                                            "Đã sao chép path.",
                                                        );
                                                    } catch {
                                                        setStatusMessage(
                                                            "Sao chép thất bại.",
                                                        );
                                                    }
                                                }}
                                                disabled={!item.path}
                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                Sao chép Path
                                            </button>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        await navigator.clipboard.writeText(
                                                            item.url,
                                                        );
                                                        setStatusMessage(
                                                            "Đã sao chép URL.",
                                                        );
                                                    } catch {
                                                        setStatusMessage(
                                                            "Sao chép thất bại.",
                                                        );
                                                    }
                                                }}
                                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                                            >
                                                Sao chép URL
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Chuẩn hóa đường dẫn ảnh
                            </p>
                            <p className="text-xs text-slate-500">
                                Chuyển signed URL trong DB về dạng uploads/...
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleMigrateMedia(false)}
                                    disabled={!adminKey || migrateBusy}
                                    className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {migrateBusy
                                        ? "Đang chuẩn hóa..."
                                        : "Chuẩn hóa collection hiện tại"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleMigrateMedia(true)}
                                    disabled={!adminKey || migrateBusy}
                                    className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {migrateBusy
                                        ? "Đang chuẩn hóa..."
                                        : "Chuẩn hóa tất cả collection"}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 rounded-md border border-slate-800 bg-slate-900 p-3">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Làm mới cache
                            </p>
                            <input
                                type="text"
                                value={revalidatePaths}
                                onChange={(e) => setRevalidatePaths(e.target.value)}
                                placeholder="/about /projects /news/slug"
                                aria-label="Đường dẫn cần làm mới"
                                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
                            />
                            <input
                                type="text"
                                value={revalidateTags}
                                onChange={(e) => setRevalidateTags(e.target.value)}
                                placeholder="tag-a tag-b (tuỳ chọn)"
                                aria-label="Tag cần làm mới"
                                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
                            />
                            <button
                                type="button"
                                onClick={handleRevalidate}
                                disabled={!adminKey || revalidateBusy}
                                className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {revalidateBusy ? "Đang làm mới..." : "Làm mới"}
                            </button>
                        </div>

                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => setShowJson((prev) => !prev)}
                                className="text-xs text-slate-400 hover:text-white"
                            >
                                {showJson
                                    ? "Ẩn JSON nâng cao"
                                    : "Hiện JSON nâng cao"}
                            </button>
                            {showJson && (
                                <div className="space-y-2">
                                    <textarea
                                        value={editorText}
                                        onChange={(e) =>
                                            setEditorText(e.target.value)
                                        }
                                        aria-label="Chỉnh sửa JSON nâng cao"
                                        className="min-h-[320px] w-full rounded-md border border-slate-700 bg-slate-900 p-3 font-mono text-xs text-slate-100"
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={handleApplyJson}
                                            className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500"
                                        >
                                            Áp dụng JSON
                                        </button>
                                        {editorError && (
                                            <p className="text-xs text-red-400">
                                                {editorError}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                            </>
                        )}

                        {statusMessage && (
                            <p className="text-sm text-slate-400">{statusMessage}</p>
                        )}
                    </div>
                </div>

                <div className="bg-white">
                    <iframe
                        key={iframeSrc}
                        src={iframeSrc}
                        className="h-[calc(100vh-72px)] w-full border-none"
                        title="Live Preview"
                    />
                </div>
            </div>
        </div>
    );
}
