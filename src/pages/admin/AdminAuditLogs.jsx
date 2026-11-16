import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ScrollText, Sparkles } from "lucide-react";
import AuditLogFilterBar from "../../components/admin/AuditLogFilterBar";
import AuditLogRow from "../../components/admin/AuditLogRow";
import AuditLogDrawer from "../../components/admin/AuditLogDrawer";
import AuditSummaryBar from "../../components/admin/AuditSummaryBar";
import {
    useAdminAuditLogs,
    summarize,
} from "../../hooks/admin/useAdminAuditLogs";
import { getRangeLabel } from "../../utils/pagination";

import DocumentLightbox from "../../components/admin/DocumentLightbox";

export default function AdminAuditLogs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [openLog, setOpenLog] = useState(null);
    const [previewDoc, setPreviewDoc] = useState(null);

    const filters = useMemo(
        () => ({
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 20),
            search: searchParams.get("search") || undefined,
            actorRole: searchParams.get("actorRole") || undefined,
            targetType: searchParams.get("targetType") || undefined,
            targetId: searchParams.get("targetId") || undefined,
            action: searchParams.get("action") || undefined,
            sortBy: searchParams.get("sortBy") || "createdAt",
            sortOrder: searchParams.get("sortOrder") || "DESC",
        }),
        [searchParams],
    );

    const setFilters = (patch) => {
        const next = new URLSearchParams(searchParams);
        Object.entries(patch).forEach(([k, v]) => {
            if (v === undefined || v === "" || v === null) next.delete(k);
            else next.set(k, String(v));
        });
        setSearchParams(next, { replace: true });
    };

    const resetFilters = () =>
        setSearchParams(new URLSearchParams(), { replace: true });

    const { data, isLoading, isError, refetch, isFetching } =
        useAdminAuditLogs(filters);

    const rows = data?.rows || [];
    const total = data?.total || 0;
    const page = data?.page || filters.page;
    const limit = data?.limit || filters.limit;
    const totalPages = data?.totalPages || 1;
    const range = getRangeLabel({ page, limit, total });
    const summary = summarize(rows, total);

    const openDocumentPreview = (log) => {
        const m = log.metadata || {};
        if (!m.fileUrl) return;
        setPreviewDoc({
            id: log.targetId,
            documentType: m.documentType,
            fileName: m.fileName || "Document",
            fileUrl: m.fileUrl,
            mimeType: m.mimeType,
        });
    };

    return (
        <div className="space-y-5">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                            Audit logs
                        </p>
                        <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                            Every action, fully traceable
                        </h1>
                        <p className="mt-1 text-sm text-slate-300">
                            Approvals, rejections, status changes, recorded
                            forever.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
                            <ScrollText size={14} className="text-[#c9a24b]" />
                            <span className="text-slate-300">
                                Total entries
                            </span>
                            <span className="font-semibold text-white tabular-nums">
                                {total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <AuditSummaryBar summary={summary} />

            {/* Filters */}
            <AuditLogFilterBar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
            />

            {/* List */}
            {isLoading ? (
                <div className="admin-card overflow-hidden">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-3 px-5 py-4 border-b border-[#eef1f7] last:border-b-0"
                        >
                            <div className="admin-skeleton h-9 w-9 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="admin-skeleton h-3.5 w-64" />
                                <div className="admin-skeleton h-3 w-48" />
                            </div>
                            <div className="admin-skeleton h-3 w-16" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <div className="admin-card p-8 text-center">
                    <p className="text-sm font-medium text-[#0f172a]">
                        Couldn't load audit logs.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                    >
                        Try again
                    </button>
                </div>
            ) : rows.length === 0 ? (
                <div className="admin-card p-10 text-center">
                    <ScrollText size={28} className="mx-auto text-[#94a3b8]" />
                    <p className="mt-3 text-sm font-semibold text-[#0f172a]">
                        No audit entries match this filter.
                    </p>
                    <p className="mt-1 text-xs text-[#64748b]">
                        Actions like approvals and suspensions will appear here.
                    </p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`admin-card overflow-hidden ${
                        isFetching ? "opacity-60 transition-opacity" : ""
                    }`}
                >
                    <ul className="divide-y divide-[#eef1f7]">
                        {rows.map((log) => (
                            <AuditLogRow
                                key={log.id}
                                log={log}
                                onOpen={setOpenLog}
                                onPreviewDocument={openDocumentPreview}
                            />
                        ))}
                    </ul>

                    <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e8ecf3] bg-[#fafbfd] px-5 py-3 md:flex-row">
                        <p className="text-xs text-[#64748b]">
                            {range.total === 0 ? (
                                "No results"
                            ) : (
                                <>
                                    Showing{" "}
                                    <span className="font-medium text-[#0f172a] tabular-nums">
                                        {range.from.toLocaleString()}–
                                        {range.to.toLocaleString()}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium text-[#0f172a] tabular-nums">
                                        {range.total.toLocaleString()}
                                    </span>
                                </>
                            )}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setFilters({ page: page - 1 })}
                                disabled={page <= 1}
                                className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f6f7fb] disabled:opacity-40"
                            >
                                <ChevronLeft size={14} /> Prev
                            </button>
                            <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#0f172a] ring-1 ring-[#e8ecf3] tabular-nums">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setFilters({ page: page + 1 })}
                                disabled={page >= totalPages}
                                className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f6f7fb] disabled:opacity-40"
                            >
                                Next <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Drawer */}
            <AuditLogDrawer
                log={openLog}
                onClose={() => setOpenLog(null)}
                onPreviewDocument={openDocumentPreview}
            />

            <DocumentLightbox
                open={Boolean(previewDoc)}
                document={previewDoc}
                onClose={() => setPreviewDoc(null)}
            />
        </div>
    );
}
