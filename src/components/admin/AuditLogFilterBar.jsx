import React, { useEffect, useMemo, useState } from "react";
import { RotateCcw, Search, X } from "lucide-react";

const ROLE_TABS = [
    { key: "all", label: "All actors" },
    { key: "admin", label: "Admins" },
    { key: "customer", label: "Customers" },
    { key: "provider", label: "Providers" },
];

const TARGET_TABS = [
    { key: "all", label: "Any target" },
    { key: "provider", label: "Providers" },
    { key: "document", label: "Documents" },
    { key: "user", label: "Users" },
    { key: "booking", label: "Bookings" },
    { key: "job", label: "Jobs" },
    { key: "payment", label: "Payments" },
];

function Segment({ label, value, options, onChange }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                {label}
            </span>
            <div className="inline-flex flex-wrap rounded-xl bg-[#f6f7fb] p-1 ring-1 ring-[#e8ecf3] shadow-inner shadow-black/[0.02]">
                {options.map((opt) => {
                    const active = value === opt.key;
                    return (
                        <button
                            key={opt.key}
                            onClick={() => onChange(opt.key)}
                            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                                active
                                    ? "bg-white text-[#0b1b3a] shadow-[0_1px_2px_rgba(15,23,42,0.08),0_1px_1px_rgba(15,23,42,0.04)] ring-1 ring-[#e8ecf3]"
                                    : "text-[#64748b] hover:text-[#0f172a]"
                            }`}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function AuditLogFilterBar({ filters, onChange, onReset }) {
    const [searchInput, setSearchInput] = useState(filters.search || "");

    useEffect(() => {
        const t = setTimeout(() => {
            if (searchInput !== (filters.search || "")) {
                onChange({ search: searchInput, page: 1 });
            }
        }, 350);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    useEffect(() => {
        setSearchInput(filters.search || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.search]);

    const isDirty = useMemo(
        () =>
            Boolean(
                filters.search ||
                (filters.actorRole && filters.actorRole !== "all") ||
                (filters.targetType && filters.targetType !== "all") ||
                filters.action,
            ),
        [filters],
    );

    return (
        <div className="admin-card p-4 md:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 max-w-xl">
                    <Search
                        size={15}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                    />
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search actor email, name, or target ID…"
                        className="w-full rounded-xl border border-[#e8ecf3] bg-white pl-10 pr-10 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] transition-shadow focus:border-[#0b1b3a] focus:outline-none focus:ring-4 focus:ring-[#0b1b3a]/10"
                    />
                    {searchInput && (
                        <button
                            onClick={() => setSearchInput("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#94a3b8] hover:bg-[#f6f7fb] hover:text-[#0f172a] transition-colors"
                            aria-label="Clear search"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {isDirty && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#f7ecd2] px-2.5 py-1 text-[11px] font-semibold text-[#8a6c22]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]" />
                            Filtered
                        </span>
                    )}
                    <button
                        onClick={onReset}
                        disabled={!isDirty}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#e8ecf3] bg-white px-3 py-2 text-xs font-medium text-[#334155] transition-colors hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RotateCcw size={13} />
                        Reset
                    </button>
                </div>
            </div>

            <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#e8ecf3] to-transparent" />

            <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
                <Segment
                    label="Actor role"
                    value={filters.actorRole || "all"}
                    options={ROLE_TABS}
                    onChange={(key) =>
                        onChange({
                            actorRole: key === "all" ? undefined : key,
                            page: 1,
                        })
                    }
                />
                <Segment
                    label="Target type"
                    value={filters.targetType || "all"}
                    options={TARGET_TABS}
                    onChange={(key) =>
                        onChange({
                            targetType: key === "all" ? undefined : key,
                            page: 1,
                        })
                    }
                />
            </div>
        </div>
    );
}
