import React, { useMemo } from "react";
import { RotateCcw } from "lucide-react";

const STATUS_TABS = [
    { key: "all", label: "All" },
    { key: "PENDING", label: "Pending" },
    { key: "ACCEPTED", label: "Accepted" },
    { key: "EN_ROUTE", label: "En route" },
    { key: "IN_PROGRESS", label: "In progress" },
    { key: "COMPLETED", label: "Completed" },
    { key: "PAID", label: "Paid" },
    { key: "CANCELLED", label: "Cancelled" },
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

export default function JobFilterBar({ filters, onChange, onReset }) {
    const isDirty = useMemo(
        () =>
            Boolean(
                (filters.status && filters.status !== "all") ||
                filters.startDate ||
                filters.endDate,
            ),
        [filters],
    );

    const statusValue = filters.status || "all";

    return (
        <div className="admin-card p-4 md:p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {isDirty && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7ecd2] px-2.5 py-1 text-[11px] font-semibold text-[#8a6c22]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]" />
                            Filtered
                        </span>
                    )}
                </div>
                <button
                    onClick={onReset}
                    disabled={!isDirty}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#e8ecf3] bg-white px-3 py-2 text-xs font-medium text-[#334155] transition-colors hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <RotateCcw size={13} />
                    Reset
                </button>
            </div>

            <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#e8ecf3] to-transparent" />

            <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
                <Segment
                    label="Status"
                    value={statusValue}
                    options={STATUS_TABS}
                    onChange={(key) =>
                        onChange({
                            status: key === "all" ? undefined : key,
                            page: 1,
                        })
                    }
                />

                <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                        Date range
                    </span>
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={filters.startDate || ""}
                            onChange={(e) =>
                                onChange({
                                    startDate: e.target.value || undefined,
                                    page: 1,
                                })
                            }
                            className="rounded-xl border border-[#e8ecf3] bg-white px-3 py-1.5 text-xs text-[#0f172a] focus:border-[#0b1b3a] focus:outline-none focus:ring-4 focus:ring-[#0b1b3a]/10"
                        />
                        <span className="text-xs text-[#94a3b8]">to</span>
                        <input
                            type="date"
                            value={filters.endDate || ""}
                            onChange={(e) =>
                                onChange({
                                    endDate: e.target.value || undefined,
                                    page: 1,
                                })
                            }
                            className="rounded-xl border border-[#e8ecf3] bg-white px-3 py-1.5 text-xs text-[#0f172a] focus:border-[#0b1b3a] focus:outline-none focus:ring-4 focus:ring-[#0b1b3a]/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
