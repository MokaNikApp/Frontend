import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
    CheckCircle2,
    Clock,
    Coins,
    ListChecks,
    Sparkles,
    XCircle,
} from "lucide-react";
import BookingFilterBar from "../../components/admin/BookingFilterBar";
import BookingsTable, {
    BookingsTableSkeleton,
} from "../../components/admin/BookingsTable";
import {
    useAdminBookings,
    useAdminBookingOverview,
} from "../../hooks/admin/useAdminBookings";

const nairaShort = (n) => {
    const v = Number(n) || 0;
    if (v >= 1_000_000) return `₦${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `₦${(v / 1_000).toFixed(0)}k`;
    return `₦${v}`;
};

export default function AdminBookings() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => ({
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 20),
            search: searchParams.get("search") || undefined,
            status: searchParams.get("status") || undefined,
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
        useAdminBookings(filters);
    const overview = useAdminBookingOverview();

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

    return (
        <div className="space-y-5">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                            Bookings
                        </p>
                        <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                            Every booking, at a glance
                        </h1>
                        <p className="mt-1 text-sm text-slate-300">
                            Search, filter, and dig into any booking across
                            Mokanik.
                        </p>
                    </div>

                    {overview.data && (
                        <div className="flex flex-wrap items-center gap-2">
                            <StatChip
                                icon={<ListChecks size={14} />}
                                label="Total"
                                value={overview.data.totalBookings ?? 0}
                            />
                            <StatChip
                                icon={<Clock size={14} />}
                                label="Pending"
                                value={overview.data.pendingBookings ?? 0}
                            />
                            <StatChip
                                icon={<CheckCircle2 size={14} />}
                                label="Completed"
                                value={overview.data.completedBookings ?? 0}
                            />
                            <StatChip
                                icon={<XCircle size={14} />}
                                label="Cancelled"
                                value={overview.data.cancelledBookings ?? 0}
                            />
                            <StatChip
                                icon={<Coins size={14} />}
                                label="Revenue"
                                value={nairaShort(overview.data.totalRevenue)}
                            />
                        </div>
                    )}
                </div>
            </div>

            <BookingFilterBar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
            />

            {isLoading ? (
                <BookingsTableSkeleton />
            ) : isError ? (
                <div className="admin-card p-8 text-center">
                    <p className="text-sm font-medium text-[#0f172a]">
                        Couldn't load bookings.
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
                    <BookingsTable
                        rows={rows}
                        sortBy={filters.sortBy}
                        sortOrder={filters.sortOrder}
                        onSort={onSort}
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
