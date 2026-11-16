import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = {
    PENDING: "#c9a24b",
    ACCEPTED: "#3b82f6",
    EN_ROUTE: "#8b5cf6",
    IN_PROGRESS: "#0ea5e9",
    COMPLETED: "#10b981",
    PAID: "#059669",
    CANCELLED: "#ef4444",
    REJECTED: "#dc2626",
};

const LABELS = {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    EN_ROUTE: "En route",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    PAID: "Paid",
    CANCELLED: "Cancelled",
    REJECTED: "Rejected",
};

export default function JobStatusDonut({ counts = {}, total = 0 }) {
    const data = Object.entries(counts)
        .filter(([, v]) => v > 0)
        .map(([key, value]) => ({
            key,
            name: LABELS[key] || key,
            value,
            color: COLORS[key] || "#94a3b8",
        }));

    if (data.length === 0) {
        return (
            <div className="flex h-[220px] items-center justify-center text-xs text-[#94a3b8]">
                No jobs yet
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative h-[190px] w-full">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={58}
                            outerRadius={82}
                            paddingAngle={2}
                            stroke="white"
                            strokeWidth={2}
                        >
                            {data.map((d) => (
                                <Cell key={d.key} fill={d.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                        Total
                    </p>
                    <p className="text-2xl font-semibold tabular-nums text-[#0f172a]">
                        {total}
                    </p>
                </div>
            </div>
            <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                {data.map((d) => (
                    <li key={d.key} className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: d.color }}
                        />
                        <span className="truncate text-[#334155]">
                            {d.name}
                        </span>
                        <span className="ml-auto font-semibold tabular-nums text-[#0f172a]">
                            {d.value}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
