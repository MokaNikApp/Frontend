import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Briefcase,
    CheckCircle2,
    Wallet,
    Wrench,
    ArrowUpRight,
    Sparkles,
    ClipboardCheck,
    FileCheck2,
    TrendingUp,
    Coins,
    Banknote,
} from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import DualActivityChart from "../../components/admin/DualActivityChart";
import JobStatusDonut from "../../components/admin/JobStatusDonut";
import {
    useAdminDashboard,
    useRecentJobs,
    useJobStatusDistribution,
    usePaymentsOverview,
    usePendingDocumentCount,
} from "../../hooks/admin/useAdminDashboard";

const naira = (n) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(n || 0);

const initials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

const statusTone = (status = "") => {
    const s = status.toLowerCase();
    if (s.includes("complete") || s.includes("paid") || s.includes("success"))
        return "bg-emerald-50 text-emerald-700 ring-emerald-100";
    if (s.includes("progress") || s.includes("accept") || s.includes("route"))
        return "bg-blue-50 text-blue-700 ring-blue-100";
    if (s.includes("pend") || s.includes("review"))
        return "bg-amber-50 text-amber-700 ring-amber-100";
    if (s.includes("reject") || s.includes("cancel") || s.includes("fail"))
        return "bg-red-50 text-red-600 ring-red-100";
    return "bg-slate-50 text-slate-600 ring-slate-100";
};

const TIPS = [
    {
        label: "Quick win",
        body: "Verify documents before approving providers. Every verified doc is one less pending application in your inbox.",
    },
    {
        label: "Heads up",
        body: "Rejected providers can re-apply. If you see a familiar name, check the audit log first, the rejection reason tells you what to expect.",
    },
];

export default function AdminDashboard() {
    const dashboard = useAdminDashboard();
    const recentJobs = useRecentJobs(5);
    const jobDist = useJobStatusDistribution();
    const payments = usePaymentsOverview();
    const pendingDocs = usePendingDocumentCount();
    const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

    const isLoading =
        dashboard.isLoading ||
        recentJobs.isLoading ||
        jobDist.isLoading ||
        payments.isLoading;
    const isError = dashboard.isError || !dashboard.data;

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-40 admin-skeleton rounded-2xl" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-28 admin-skeleton rounded-2xl"
                        />
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="h-80 admin-skeleton rounded-2xl lg:col-span-2" />
                    <div className="h-80 admin-skeleton rounded-2xl" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="admin-card p-6">
                <p className="text-sm font-medium text-[#0f172a]">
                    Couldn't load the dashboard.
                </p>
                <button
                    onClick={() => dashboard.refetch()}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                >
                    Try again
                </button>
            </div>
        );
    }

    const { metrics, platformActivity, newMechanics } = dashboard.data;
    const jobs = recentJobs.data || [];
    const dist = jobDist.data || { counts: {}, total: 0 };
    const pay = payments.data || {};
    const docCount = pendingDocs.data ?? 0;

    const pendingProviders = newMechanics.filter(
        (m) => m.verificationStatus === "in_review",
    ).length;
    const rejectedProviders = newMechanics.filter(
        (m) => m.verificationStatus === "rejected",
    ).length;

    return (
        <div className="space-y-6 md:space-y-8">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-7 md:px-8 md:py-9 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                            Overview
                        </p>
                        <h1 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                            Welcome back to Mokanik
                        </h1>
                        <p className="mt-1 text-sm text-slate-300">
                            {pendingProviders > 0
                                ? `${pendingProviders} provider${
                                      pendingProviders === 1 ? "" : "s"
                                  } awaiting review, ${docCount} document${
                                      docCount === 1 ? "" : "s"
                                  } pending verification.`
                                : `Everything's up to date. ${docCount} document${
                                      docCount === 1 ? "" : "s"
                                  } to verify.`}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            to="/admin/providers?verificationStatus=in_review"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#c9a24b] px-4 py-2.5 text-sm font-semibold text-[#0b1b3a] shadow-lg shadow-black/20 hover:bg-[#d9b563] transition-colors"
                        >
                            <ClipboardCheck size={16} />
                            Review providers
                            <ArrowUpRight size={16} />
                        </Link>
                        <Link
                            to="/admin/documents"
                            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                        >
                            <FileCheck2 size={16} />
                            Documents
                        </Link>
                    </div>
                </div>
            </div>

            {/* KPI ROW — jobs-centric */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.05 } },
                }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
                {[
                    {
                        label: "Active jobs",
                        value: metrics.activeServices,
                        icon: <Briefcase size={16} />,
                        tone: "warning",
                    },
                    {
                        label: "Completed jobs",
                        value: dist.counts?.COMPLETED ?? 0,
                        icon: <CheckCircle2 size={16} />,
                        tone: "success",
                    },
                    {
                        label: "Revenue (30d)",
                        value: naira(pay.totalRevenue ?? metrics.totalRevenue),
                        icon: <Wallet size={16} />,
                        tone: "success",
                    },
                    {
                        label: "New mechanics",
                        value: newMechanics.length,
                        icon: <Wrench size={16} />,
                        hint: "Latest signups",
                    },
                ].map((c) => (
                    <motion.div
                        key={c.label}
                        variants={{
                            hidden: { opacity: 0, y: 8 },
                            show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <StatCard {...c} />
                    </motion.div>
                ))}
            </motion.div>

            {/* CHART + DONUT */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="admin-card p-5 lg:col-span-2">
                    <DualActivityChart data={platformActivity} />
                </div>
                <div className="admin-card p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-[#0f172a]">
                                Job status
                            </h2>
                            <p className="text-xs text-[#64748b]">
                                Distribution across all statuses
                            </p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <JobStatusDonut
                            counts={dist.counts}
                            total={dist.total}
                        />
                    </div>
                </div>
            </div>

            {/* MONEY + ATTENTION */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Financial summary */}
                <div className="admin-card p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-[#0f172a]">
                                Financial summary
                            </h2>
                            <p className="text-xs text-[#64748b]">
                                Platform economics at a glance
                            </p>
                        </div>
                        <Link
                            to="/admin/payments"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#0b1b3a] hover:gap-2 transition-all"
                        >
                            Payments <ArrowUpRight size={12} />
                        </Link>
                    </div>

                    <div className="mt-4 space-y-3">
                        <MoneyRow
                            icon={<Coins size={14} />}
                            label="Total revenue"
                            value={naira(pay.totalRevenue ?? 0)}
                            tone="default"
                        />
                        <MoneyRow
                            icon={<Banknote size={14} />}
                            label="Paid to providers"
                            value={naira(pay.totalProviderAmount ?? 0)}
                            tone="amber"
                        />
                        <MoneyRow
                            icon={<TrendingUp size={14} />}
                            label="Platform net"
                            value={naira(
                                (pay.totalRevenue ?? 0) -
                                    (pay.totalProviderAmount ?? 0),
                            )}
                            tone="emerald"
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <SmallStat
                            label="Successful"
                            value={pay.successfulTransactions ?? 0}
                        />
                        <SmallStat
                            label="Pending"
                            value={pay.pendingTransactions ?? 0}
                        />
                    </div>
                </div>

                {/* Needs attention */}
                <div className="admin-card p-5">
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Needs attention
                    </h2>
                    <p className="text-xs text-[#64748b]">
                        A quick pulse on what's waiting on you.
                    </p>

                    <ul className="mt-4 space-y-2">
                        <AttentionRow
                            label="Providers awaiting review"
                            value={pendingProviders}
                            to="/admin/providers?verificationStatus=in_review"
                        />
                        <AttentionRow
                            label="Documents to verify"
                            value={docCount}
                            to="/admin/documents"
                        />
                        <AttentionRow
                            label="Rejected providers"
                            value={rejectedProviders}
                            to="/admin/providers?verificationStatus=rejected"
                        />
                    </ul>

                    <div className="mt-5 rounded-xl bg-[#f6f7fb] p-3 ring-1 ring-[#e8ecf3]">
                        <p className="text-[11px] font-semibold tracking-wider uppercase text-[#64748b]">
                            {tip.label}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#334155]">
                            {tip.body}
                        </p>
                    </div>
                </div>
            </div>

            {/* LISTS */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ListCard
                    title="Recent jobs"
                    to="/admin/jobs"
                    items={jobs}
                    empty="No jobs yet."
                    renderItem={(j) => (
                        <>
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0b1b3a] to-[#122551] text-[10px] font-semibold text-[#e6d6a8]">
                                    <Briefcase size={14} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-[#0f172a] truncate">
                                        {j.title || "Untitled job"}
                                    </p>
                                    <p className="text-xs text-[#64748b] truncate">
                                        {j.user?.firstName} {j.user?.lastName} ·{" "}
                                        {naira(Number(j.totalAmount) / 100)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Pill className={statusTone(j.status)}>
                                    {j.status?.replace(/_/g, " ").toLowerCase()}
                                </Pill>
                                <p className="text-[11px] text-[#94a3b8]">
                                    {j.createdAt
                                        ? new Date(
                                              j.createdAt,
                                          ).toLocaleDateString()
                                        : ""}
                                </p>
                            </div>
                        </>
                    )}
                />

                <ListCard
                    title="New mechanics"
                    to="/admin/providers"
                    items={newMechanics}
                    empty="No mechanics yet."
                    renderItem={(m) => (
                        <>
                            <div className="flex items-center gap-3 min-w-0">
                                <Avatar name={m.name} />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-[#0f172a] truncate">
                                        {m.name}
                                    </p>
                                    <p className="text-xs text-[#64748b] truncate">
                                        {m.specialty || "—"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Pill
                                    className={statusTone(m.verificationStatus)}
                                >
                                    {m.verificationStatus}
                                </Pill>
                                <p className="text-[11px] text-[#94a3b8]">
                                    {m.joinedAt
                                        ? new Date(
                                              m.joinedAt,
                                          ).toLocaleDateString()
                                        : ""}
                                </p>
                            </div>
                        </>
                    )}
                />
            </div>
        </div>
    );
}

/* ---------- tiny subcomponents ---------- */

function MoneyRow({ icon, label, value, tone = "default" }) {
    const toneClass = {
        default: "text-[#0f172a]",
        emerald: "text-emerald-700",
        amber: "text-amber-700",
    }[tone];
    const iconClass = {
        default: "bg-[#f6f7fb] text-[#334155]",
        emerald: "bg-emerald-50 text-emerald-700",
        amber: "bg-amber-50 text-amber-700",
    }[tone];

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}
                >
                    {icon}
                </span>
                <span className="text-sm text-[#334155]">{label}</span>
            </div>
            <span className={`text-sm font-semibold tabular-nums ${toneClass}`}>
                {value}
            </span>
        </div>
    );
}

function SmallStat({ label, value }) {
    return (
        <div className="rounded-lg bg-[#f6f7fb] px-3 py-2 ring-1 ring-[#e8ecf3]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
                {label}
            </p>
            <p className="text-base font-semibold tabular-nums text-[#0f172a]">
                {value}
            </p>
        </div>
    );
}

function AttentionRow({ label, value, to, hint }) {
    return (
        <li>
            <Link
                to={to}
                className="flex items-center justify-between rounded-xl border border-[#e8ecf3] bg-white px-3 py-2.5 hover:bg-[#f8fafc] transition-colors"
            >
                <div>
                    <p className="text-sm font-medium text-[#0f172a]">
                        {label}
                    </p>
                    {hint && (
                        <p className="text-[11px] text-[#94a3b8]">{hint}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#f7ecd2] px-2.5 py-0.5 text-xs font-semibold text-[#8a6c22] tabular-nums">
                        {value}
                    </span>
                    <ArrowUpRight size={14} className="text-[#64748b]" />
                </div>
            </Link>
        </li>
    );
}

function ListCard({ title, to, items, renderItem, empty }) {
    return (
        <div className="admin-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8ecf3]">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    {title}
                </h2>
                <Link
                    to={to}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#0b1b3a] hover:gap-2 transition-all"
                >
                    View all <ArrowUpRight size={12} />
                </Link>
            </div>
            <ul className="divide-y divide-[#eef1f7]">
                {items.length === 0 && (
                    <li className="px-5 py-6 text-sm text-[#64748b]">
                        {empty}
                    </li>
                )}
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between px-5 py-3.5 gap-4"
                    >
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Pill({ children, className = "" }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 capitalize ${className}`}
        >
            {children}
        </span>
    );
}

function Avatar({ name }) {
    return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0b1b3a] to-[#122551] text-[11px] font-semibold text-[#e6d6a8]">
            {initials(name) || "?"}
        </div>
    );
}
