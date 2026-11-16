import React, { useMemo } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import ChartTooltip from "./ChartTooltip";

const formatDay = (v) => {
    if (!v) return "";
    const d = new Date(v);
    if (isNaN(d.getTime())) return String(v);
    return d.toLocaleDateString("en-NG", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
};

export default function DualActivityChart({ data = [] }) {
    const summary = useMemo(() => {
        if (data.length < 2) return { total: 0, change: 0 };
        const total = data.reduce((s, d) => s + (d.totalBookings || 0), 0);
        const half = Math.floor(data.length / 2);
        const firstHalf = data
            .slice(0, half)
            .reduce((s, d) => s + (d.totalBookings || 0), 0);
        const secondHalf = data
            .slice(half)
            .reduce((s, d) => s + (d.totalBookings || 0), 0);
        const change =
            firstHalf > 0
                ? Math.round(((secondHalf - firstHalf) / firstHalf) * 100)
                : secondHalf > 0
                  ? 100
                  : 0;
        return { total, change };
    }, [data]);

    return (
        <div>
            <div className="mb-3 flex items-end justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Booking activity
                    </h2>
                    <p className="text-xs text-[#64748b]">
                        Daily count over the last 30 days
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-semibold tabular-nums text-[#0f172a]">
                        {summary.total}
                    </p>
                    <p
                        className={`text-[11px] font-semibold tabular-nums ${
                            summary.change >= 0
                                ? "text-emerald-600"
                                : "text-red-500"
                        }`}
                    >
                        {summary.change >= 0 ? "+" : ""}
                        {summary.change}% vs first half
                    </p>
                </div>
            </div>

            <div className="h-[240px]">
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="dashFill"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#0b1b3a"
                                    stopOpacity={0.35}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#0b1b3a"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#eef1f7"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={formatDay}
                            interval="preserveStartEnd"
                            minTickGap={24}
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            content={<ChartTooltip />}
                            cursor={{
                                stroke: "#c9a24b",
                                strokeDasharray: "4 4",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalBookings"
                            name="bookings"
                            stroke="#0b1b3a"
                            strokeWidth={2.2}
                            fill="url(#dashFill)"
                            dot={false}
                            activeDot={{
                                r: 4,
                                fill: "#c9a24b",
                                stroke: "#0b1b3a",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
