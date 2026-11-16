import React, { useMemo, useState } from "react";
import { Wrench, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProviderFilterBar from "../../components/admin/ProviderFilterBar";
import ProvidersTable, {
    ProvidersTableSkeleton,
} from "../../components/admin/ProvidersTable";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import {
    useAdminProviders,
    useProviderActions,
} from "../../hooks/admin/useAdminProviders";

export default function AdminProviders() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read filters from URL so state is shareable / bookmarkable
    const filters = useMemo(
        () => ({
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 20),
            search: searchParams.get("search") || undefined,
            verificationStatus:
                searchParams.get("verificationStatus") || undefined,
            isApproved:
                searchParams.get("isApproved") === null
                    ? undefined
                    : searchParams.get("isApproved") === "true",
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

    const resetFilters = () => {
        setSearchParams(new URLSearchParams(), { replace: true });
    };

    const { data, isLoading, isError, refetch, isFetching } =
        useAdminProviders(filters);
    const { approve, updateStatus } = useProviderActions();

    // Confirm modal state
    const [confirm, setConfirm] = useState(null);
    // confirm = { type: 'approve' | 'status', provider, status? }

    const rows = data?.rows || [];
    const total = data?.total || 0;
    const page = data?.page || filters.page;
    const limit = data?.limit || filters.limit;
    const totalPages = data?.totalPages || 1;

    const onSort = (field) => {
        if (filters.sortBy === field) {
            setFilters({
                sortOrder: filters.sortOrder === "ASC" ? "DESC" : "ASC",
            });
        } else {
            setFilters({ sortBy: field, sortOrder: "DESC" });
        }
    };

    const executeApprove = async () => {
        if (!confirm?.provider) return;
        await approve.mutateAsync(confirm.provider.id);
        setConfirm(null);
    };

    const executeStatus = async () => {
        if (!confirm?.provider || !confirm?.status) return;
        await updateStatus.mutateAsync({
            providerId: confirm.provider.id,
            status: confirm.status,
            reason: confirm.reason,
        });
        setConfirm(null);
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
                            Providers
                        </p>
                        <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                            Approve, review and monitor providers
                        </h1>
                        <p className="mt-1 text-sm text-slate-300">
                            Filter by verification status, approve vetted
                            mechanics, and keep the marketplace healthy.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <StatChip
                            icon={<Wrench size={14} />}
                            label="Total"
                            value={total}
                        />
                        <StatChip
                            icon={<Users size={14} />}
                            label="Page"
                            value={`${page}/${totalPages}`}
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <ProviderFilterBar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
            />

            {/* Table */}
            {isLoading ? (
                <ProvidersTableSkeleton />
            ) : isError ? (
                <div className="admin-card p-8 text-center">
                    <p className="text-sm font-medium text-[#0f172a]">
                        Couldn't load providers.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                    >
                        Try again <ArrowUpRight size={12} />
                    </button>
                </div>
            ) : (
                <div
                    className={
                        isFetching ? "opacity-60 transition-opacity" : ""
                    }
                >
                    <ProvidersTable
                        rows={rows}
                        sortBy={filters.sortBy}
                        sortOrder={filters.sortOrder}
                        onSort={onSort}
                        onApprove={(provider) =>
                            setConfirm({ type: "approve", provider })
                        }
                        onStatus={(provider, status) =>
                            setConfirm({ type: "status", provider, status })
                        }
                        page={page}
                        totalPages={totalPages}
                        total={total}
                        limit={limit}
                        onPageChange={(p) => setFilters({ page: p })}
                    />
                </div>
            )}

            {/* Approve confirm */}
            <ConfirmDialog
                open={confirm?.type === "approve"}
                title="Approve this provider?"
                description={`${
                    confirm?.provider?.user?.firstName || "This provider"
                } will be allowed to accept jobs immediately.`}
                confirmLabel="Yes, approve"
                tone="success"
                busy={approve.isPending}
                onCancel={() => setConfirm(null)}
                onConfirm={executeApprove}
            />

            {/* Suspend/reactivate confirm */}
            <ConfirmDialog
                open={confirm?.type === "status"}
                title={
                    confirm?.status === "suspended"
                        ? "Suspend this provider?"
                        : "Reactivate this provider?"
                }
                description={
                    confirm?.status === "suspended"
                        ? "They will not be able to accept new jobs while suspended."
                        : "They will be able to accept jobs again."
                }
                confirmLabel={
                    confirm?.status === "suspended" ? "Suspend" : "Reactivate"
                }
                tone={confirm?.status === "suspended" ? "danger" : "success"}
                busy={updateStatus.isPending}
                onCancel={() => setConfirm(null)}
                onConfirm={executeStatus}
            >
                {confirm?.status === "suspended" && (
                    <label className="block">
                        <span className="text-xs font-medium text-[#334155]">
                            Reason (optional, recorded in audit log)
                        </span>
                        <textarea
                            rows={3}
                            value={confirm?.reason || ""}
                            onChange={(e) =>
                                setConfirm((c) => ({
                                    ...c,
                                    reason: e.target.value,
                                }))
                            }
                            className="mt-1 w-full rounded-lg border border-[#e8ecf3] bg-white px-3 py-2 text-sm text-[#0f172a] focus:border-[#0b1b3a] focus:outline-none focus:ring-2 focus:ring-[#0b1b3a]/10"
                            placeholder="e.g. Repeated customer complaints"
                        />
                    </label>
                )}
            </ConfirmDialog>
        </div>
    );
}

function StatChip({ icon, label, value }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
            <span className="text-[#c9a24b]">{icon}</span>
            <span className="text-slate-300">{label}</span>
            <span className="font-semibold text-white tabular-nums">
                {value}
            </span>
        </div>
    );
}
