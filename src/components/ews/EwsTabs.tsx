"use client";

import { useMemo, useState, type ReactNode } from "react";

export type EwsTab = {
    id: string;
    label: string;
    icon?: ReactNode;
    content: ReactNode;
};

export default function EwsTabs({ tabs }: { tabs: EwsTab[] }) {
    const validTabs = useMemo(() => tabs.filter((tab) => tab.id), [tabs]);
    const [activeId, setActiveId] = useState(validTabs[0]?.id || "");

    if (validTabs.length === 0) return null;

    return (
        <div>
            <div className="flex flex-wrap gap-3">
                {validTabs.map((tab) => {
                    const isActive = tab.id === activeId;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveId(tab.id)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                                isActive
                                    ? "bg-amber-400 text-slate-900 shadow"
                                    : "bg-slate-700/50 text-slate-200 hover:bg-slate-700"
                            }`}
                        >
                            {tab.icon ? <span>{tab.icon}</span> : null}
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
            <div className="mt-6">
                {validTabs.find((tab) => tab.id === activeId)?.content}
            </div>
        </div>
    );
}
