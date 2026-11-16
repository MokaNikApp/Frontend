import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import JobFilterBar from "../../components/admin/JobFilterBar";
import JobsTable, { JobsTableSkeleton } from "../../components/admin/JobsTable";
import { useAdminJobs } from "../../hooks/admin/useAdminJobs";

export default function AdminJobs() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => ({
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 20),
            status: searchParams.get("status") || undefined,
            startDate: searchParams.get("startDate") || undefined,
            endDate: searchParams.get("endDate") || undefined,
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
        useAdminJobs(filters);

    const rows = data?.rows || [];
    const total = data?.total || 0;
    const page = data?.page || filters.page;
    const limit = data?.limit || filters.limit;
    const totalPages = data?.totalPages || 1;

    return (
        <div className="space-y-5">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                            Jobs
                        </p>
                        <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                            Live work across the platform
                        </h1>
                        <p className="mt-1 text-sm text-slate-300">
                            Browse and inspect every job, from pending to paid.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
                            <span className="text-slate-300">Total</span>
                            <span className="font-semibold text-white tabular-nums">
                                {total}
                            </span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
                            <span className="text-slate-300">Page</span>
                            <span className="font-semibold text-white tabular-nums">
                                {page}/{totalPages}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <JobFilterBar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
            />

            {isLoading ? (
                <JobsTableSkeleton />
            ) : isError ? (
                <div className="admin-card p-8 text-center">
                    <p className="text-sm font-medium text-[#0f172a]">
                        Couldn't load jobs.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                    >
                        Try again
                    </button>
                </div>
            ) : (
                <div
                    className={
                        isFetching ? "opacity-60 transition-opacity" : ""
                    }
                >
                    <JobsTable
                        rows={rows}
                        page={page}
                        totalPages={totalPages}
                        total={total}
                        limit={limit}
                        onPageChange={(p) => setFilters({ page: p })}
                    />
                </div>
            )}
        </div>
    );
}
