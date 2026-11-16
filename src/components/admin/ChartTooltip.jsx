import React from "react";

const formatDay = (v) => {
    if (!v) return "";
    const d = new Date(v);
    if (isNaN(d.getTime())) return String(v);
    return d.toLocaleDateString("en-NG", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
};

export default function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-[#e8ecf3] bg-white px-3 py-2 shadow-lg">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                {formatDay(label)}
            </p>
            {payload.map((p) => (
                <p
                    key={p.dataKey}
                    className="mt-0.5 text-sm font-semibold text-[#0f172a]"
                >
                    {p.value}{" "}
                    <span className="font-normal text-[#64748b]">{p.name}</span>
                </p>
            ))}
        </div>
    );
}
