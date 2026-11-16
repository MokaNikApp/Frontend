import React from "react";
import { motion } from "framer-motion";
import { Ban, CheckCircle2, Clock, Calendar, Pause } from "lucide-react";

export default function AuditSummaryBar({ summary }) {
    if (!summary) return null;

    const items = [
        {
            label: "Today",
            value: summary.todayCount ?? 0,
            hint: "Actions since midnight",
            icon: <Clock size={16} />,
            tone: "default",
        },
        {
            label: "This week",
            value: summary.weekCount ?? 0,
            hint: "Rolling 7-day activity",
            icon: <Calendar size={16} />,
            tone: "default",
        },
        {
            label: "Approvals",
            value: summary.approvals ?? 0,
            hint: "Providers & documents",
            icon: <CheckCircle2 size={16} />,
            tone: "success",
        },
        {
            label: "Rejections",
            value: summary.rejections ?? 0,
            hint: "Applications turned down",
            icon: <Ban size={16} />,
            tone: "danger",
        },
        {
            label: "Suspensions",
            value: summary.suspensions ?? 0,
            hint: "Accounts paused",
            icon: <Pause size={16} />,
            tone: "warning",
        },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04 } },
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
            {items.map((it) => (
                <motion.div
                    key={it.label}
                    variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <SummaryCard {...it} />
                </motion.div>
            ))}
        </motion.div>
    );
}

function SummaryCard({ label, value, hint, icon, tone = "default" }) {
    const tones = {
        default: {
            ring: "ring-[#e8ecf3]",
            pill: "bg-[#0b1b3a] text-[#c9a24b]",
            value: "text-[#0f172a]",
        },
        success: {
            ring: "ring-emerald-100",
            pill: "bg-emerald-50 text-emerald-700",
            value: "text-emerald-700",
        },
        warning: {
            ring: "ring-amber-100",
            pill: "bg-amber-50 text-amber-700",
            value: "text-amber-700",
        },
        danger: {
            ring: "ring-red-100",
            pill: "bg-red-50 text-red-600",
            value: "text-red-600",
        },
    };
    const t = tones[tone] || tones.default;

    return (
        <div
            className={`admin-card p-5 ring-1 ${t.ring} transition-transform duration-200 hover:-translate-y-0.5`}
        >
            <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#64748b]">
                    {label}
                </p>
                <div className={`rounded-xl p-2 ${t.pill}`}>{icon}</div>
            </div>
            <p
                className={`mt-3 text-[24px] font-semibold tracking-tight tabular-nums leading-tight ${t.value}`}
            >
                {Number(value).toLocaleString()}
            </p>
            {hint && (
                <p className="mt-1.5 text-[11px] text-[#64748b]">{hint}</p>
            )}
        </div>
    );
}
