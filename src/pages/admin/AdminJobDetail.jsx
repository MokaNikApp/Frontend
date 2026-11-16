import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, Wallet } from "lucide-react";
import JobDetailPanel from "../../components/admin/JobDetailPanel";
import StatusPill from "../../components/admin/StatusPill";
import { useAdminJob } from "../../hooks/admin/useAdminJob";

const naira = (n) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(Number(n) || 0);

export default function AdminJobDetail() {
    const { id } = useParams();
    const { data: job, isLoading, isError, refetch } = useAdminJob(id);

    // Hard guards — must come BEFORE rendering JobDetailPanel
    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="admin-skeleton h-32 rounded-2xl" />
                <div className="admin-skeleton h-96 rounded-2xl" />
            </div>
        );
    }

    if (isError || !job) {
        return (
            <div className="admin-card p-8 text-center">
                <p className="text-sm font-medium text-[#0f172a]">
                    Couldn't load this job.
                </p>
                <p className="mt-1 text-xs text-[#64748b]">
                    {id ? `Job ID: ${id}` : "No job ID in URL."}
                </p>
                <button
                    onClick={() => refetch()}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                >
                    Try again
                </button>
            </div>
        );
    }

    // Safe from here — job is guaranteed to be a real object
    return (
        <div className="space-y-5">
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative">
                    <Link
                        to="/admin/jobs"
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={12} /> Back to jobs
                    </Link>
                    <div className="mt-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                                Job
                            </p>
                            <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                                {job.title || "Untitled job"}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <StatusPill status={job.status} />
                                <span className="text-[11px] font-mono text-slate-400">
                                    {job.id?.slice(0, 8)}…
                                </span>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
                            <Wallet size={14} className="text-[#c9a24b]" />
                            <span className="text-slate-300">Total</span>
                            <span className="font-semibold text-white tabular-nums">
                                {naira(job.totalAmount)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <JobDetailPanel job={job} />
                </div>
                <div className="space-y-4">
                    <div className="admin-card p-5">
                        <h2 className="text-sm font-semibold text-[#0f172a]">
                            Quick reference
                        </h2>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Status
                                </span>
                                <StatusPill status={job.status} />
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Created
                                </span>
                                <span className="text-xs text-[#0f172a]">
                                    {job.createdAt
                                        ? new Date(
                                              job.createdAt,
                                          ).toLocaleDateString()
                                        : "—"}
                                </span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Updated
                                </span>
                                <span className="text-xs text-[#0f172a]">
                                    {job.updatedAt
                                        ? new Date(
                                              job.updatedAt,
                                          ).toLocaleDateString()
                                        : "—"}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
