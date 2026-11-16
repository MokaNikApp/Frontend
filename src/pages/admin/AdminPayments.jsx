import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Banknote, Clock, Coins, Sparkles, TrendingUp } from "lucide-react";
import PaymentFilterBar from "../../components/admin/PaymentFilterBar";
import PaymentsTable, {
    PaymentsTableSkeleton,
} from "../../components/admin/PaymentsTable";
import {
    useAdminPayments,
    usePaymentsOverview,
} from "../../hooks/admin/useAdminPayments";

const naira = (n) => {
    const v = Number(n) || 0;
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(v);
};

export default function AdminPayments() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => ({
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 20),
            search: searchParams.get("search") || undefined,
            status: searchParams.get("status") || undefined,
            channel: searchParams.get("channel") || undefined,
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
        useAdminPayments(filters);
    const overview = usePaymentsOverview();

    const rows = data?.rows || [];
    const total = data?.total || 0;
    const page = data?.page || filters.page;
    const limit = data?.limit || filters.limit;
    const totalPages = data?.totalPages || 1;

    const pay = overview.data || {};

    return (
        <div className="space-y-5">
            {/* Hero — title only */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                        Payments
                    </p>
                    <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                        Money in, money out
                    </h1>
                    <p className="mt-1 text-sm text-slate-300">
                        Every transaction across the platform, fully auditable.
                    </p>
                </div>
            </div>

            {/* Financial overview — full-width, honest numbers */}
            {overview.data && (
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
                            label: "Total revenue",
                            value: naira(pay.totalRevenue),
                            hint: "Collected from job payments",
                            icon: <Coins size={16} />,
                            tone: "success",
                        },
                        {
                            label: "Paid to providers",
                            value: naira(pay.totalProviderAmount),
                            hint: "Provider share after platform fee",
                            icon: <Banknote size={16} />,
                            tone: "warning",
                        },
                        {
                            label: "Successful transactions",
                            value: (
                                pay.successfulTransactions ?? 0
                            ).toLocaleString(),
                            hint: "Completed job payments",
                            icon: <TrendingUp size={16} />,
                            tone: "default",
                        },
                        {
                            label: "Pending transactions",
                            value: (
                                pay.pendingTransactions ?? 0
                            ).toLocaleString(),
                            hint: "Awaiting confirmation",
                            icon: <Clock size={16} />,
                            tone: "danger",
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
                            <FinanceCard {...c} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <PaymentFilterBar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
            />

            {isLoading ? (
                <PaymentsTableSkeleton />
            ) : isError ? (
                <div className="admin-card p-8 text-center">
                    <p className="text-sm font-medium text-[#0f172a]">
                        Couldn't load payments.
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
                    <PaymentsTable
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

/* ---- Financial stat card ---- */

function FinanceCard({ label, value, hint, icon, tone = "default" }) {
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
                {value}
            </p>
            {hint && (
                <p className="mt-1.5 text-[11px] text-[#64748b]">{hint}</p>
            )}
        </div>
    );
}
