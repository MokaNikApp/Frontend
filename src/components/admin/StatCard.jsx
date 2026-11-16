import React from "react";

export default function StatCard({
    label,
    value,
    icon,
    delta,
    hint,
    tone = "default",
}) {
    const tones = {
        default: {
            ring: "ring-[#e8ecf3]",
            pill: "bg-[#0b1b3a] text-[#c9a24b]",
        },
        warning: {
            ring: "ring-amber-100",
            pill: "bg-amber-50 text-amber-700",
        },
        success: {
            ring: "ring-emerald-100",
            pill: "bg-emerald-50 text-emerald-700",
        },
        danger: {
            ring: "ring-red-100",
            pill: "bg-red-50 text-red-600",
        },
    };
    const t = tones[tone] || tones.default;

    return (
        <div
            className={`admin-card p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_40px_-20px_rgba(15,23,42,0.25)] ring-1 ${t.ring}`}
        >
            <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
                    {label}
                </p>
                <div className={`rounded-xl p-2 ${t.pill}`}>{icon}</div>
            </div>
            <p className="mt-3 text-[26px] font-semibold tracking-tight text-[#0f172a] tabular-nums">
                {value}
            </p>
            {(delta || hint) && (
                <div className="mt-1 flex items-center gap-2">
                    {delta && (
                        <span
                            className={`text-[11px] font-semibold ${
                                delta > 0 ? "text-emerald-600" : "text-red-500"
                            }`}
                        >
                            {delta > 0 ? "+" : ""}
                            {delta}%
                        </span>
                    )}
                    {hint && (
                        <span className="text-[11px] text-[#94a3b8]">
                            {hint}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
