import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    FileCheck2,
    Inbox,
    Sparkles,
} from "lucide-react";
import DocumentFilterBar from "../../components/admin/DocumentFilterBar";
import DocumentQueueRow from "../../components/admin/DocumentQueueRow";
import DocumentLightbox from "../../components/admin/DocumentLightbox";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import {
    useAdminDocuments,
    useDocumentQueueActions,
    usePendingDocumentCount,
} from "../../hooks/admin/useAdminDocuments";

export default function AdminDocuments() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => ({
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 20),
            search: searchParams.get("search") || undefined,
            status: searchParams.get("status") || "pending",
            documentType: searchParams.get("documentType") || undefined,
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
        useAdminDocuments(filters);
    const countQuery = usePendingDocumentCount();
    const { verify, reject } = useDocumentQueueActions();

    const [lightbox, setLightbox] = useState(null);
    const [rejectTarget, setRejectTarget] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const rows = data?.rows || [];
    const total = data?.total || 0;
    const page = data?.page || filters.page;
    const limit = data?.limit || filters.limit;
    const totalPages = data?.totalPages || 1;

    const pendingCount =
        typeof countQuery.data === "number"
            ? countQuery.data
            : (countQuery.data?.count ?? countQuery.data?.total ?? 0);

    const confirmReject = async () => {
        if (!rejectTarget) return;
        await reject.mutateAsync({
            id: rejectTarget.id,
            reason: rejectReason.trim() || "Not acceptable",
        });
        setRejectTarget(null);
        setRejectReason("");
    };

    return (
        <div className="space-y-5">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                            Documents
                        </p>
                        <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                            Verify provider documents
                        </h1>
                        <p className="mt-1 text-sm text-slate-300">
                            Every file providers upload lands here. Oldest
                            pending first.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
                            <Inbox size={14} className="text-[#c9a24b]" />
                            <span className="text-slate-300">Pending</span>
                            <span className="font-semibold text-white tabular-nums">
                                {pendingCount}
                            </span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
                            <FileCheck2 size={14} className="text-[#c9a24b]" />
                            <span className="text-slate-300">Viewing</span>
                            <span className="font-semibold text-white tabular-nums">
                                {total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter bar */}
            <DocumentFilterBar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
            />

            {/* List */}
            {isLoading ? (
                <div className="admin-card overflow-hidden">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 px-4 py-4 border-b border-[#eef1f7] last:border-b-0"
                        >
                            <div className="admin-skeleton h-16 w-16 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <div className="admin-skeleton h-3.5 w-48" />
                                <div className="admin-skeleton h-3 w-72" />
                                <div className="admin-skeleton h-3 w-56" />
                            </div>
                            <div className="admin-skeleton h-8 w-24 rounded-lg" />
                            <div className="admin-skeleton h-8 w-24 rounded-lg" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <div className="admin-card p-8 text-center">
                    <p className="text-sm font-medium text-[#0f172a]">
                        Couldn't load the document queue.
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
                    <CheckCircle2
                        size={28}
                        className="mx-auto text-emerald-500"
                    />
                    <p className="mt-3 text-sm font-semibold text-[#0f172a]">
                        {filters.status === "pending" && !filters.search
                            ? "All caught up — nothing to review."
                            : "No documents match this filter."}
                    </p>
                    <p className="mt-1 text-xs text-[#64748b]">
                        {filters.status === "pending" && !filters.search
                            ? "New provider uploads will appear here automatically."
                            : "Try a different status or clear the search."}
                    </p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`admin-card overflow-hidden ${isFetching ? "opacity-60 transition-opacity" : ""}`}
                >
                    <ul className="divide-y divide-[#eef1f7]">
                        {rows.map((doc) => (
                            <DocumentQueueRow
                                key={doc.id}
                                document={doc}
                                busy={verify.isPending || reject.isPending}
                                onPreview={setLightbox}
                                onVerify={(d) => verify.mutate(d.id)}
                                onReject={(d) => {
                                    setRejectTarget(d);
                                    setRejectReason("");
                                }}
                            />
                        ))}
                    </ul>

                    {/* Pagination */}
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e8ecf3] bg-[#fafbfd] px-5 py-3 md:flex-row">
                        <p className="text-xs text-[#64748b]">
                            Showing{" "}
                            <span className="font-medium text-[#0f172a]">
                                {total === 0 ? 0 : (page - 1) * limit + 1}–
                                {Math.min(page * limit, total)}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-[#0f172a]">
                                {total}
                            </span>
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

            {/* Lightbox */}
            <DocumentLightbox
                open={Boolean(lightbox)}
                document={lightbox}
                onClose={() => setLightbox(null)}
            />

            {/* Reject confirm */}
            <ConfirmDialog
                open={Boolean(rejectTarget)}
                title="Reject this document?"
                description={
                    rejectTarget
                        ? `${rejectTarget.fileName} will be marked rejected. The provider will need to re-upload.`
                        : ""
                }
                confirmLabel="Reject document"
                tone="danger"
                busy={reject.isPending}
                onCancel={() => {
                    setRejectTarget(null);
                    setRejectReason("");
                }}
                onConfirm={confirmReject}
            >
                <label className="block">
                    <span className="text-xs font-medium text-[#334155]">
                        Reason (min 5 characters)
                    </span>
                    <textarea
                        rows={3}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#e8ecf3] bg-white px-3 py-2 text-sm text-[#0f172a] focus:border-[#0b1b3a] focus:outline-none focus:ring-2 focus:ring-[#0b1b3a]/10"
                        placeholder="e.g. Document is blurry — please upload a clearer image"
                    />
                </label>
            </ConfirmDialog>
        </div>
    );
}
