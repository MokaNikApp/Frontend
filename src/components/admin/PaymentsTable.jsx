import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import StatusPill from "./StatusPill";
import { getRangeLabel } from "../../utils/pagination";

const naira = (n) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(Number(n) || 0);

const initial = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

export function PaymentsTableSkeleton() {
    return (
        <div className="admin-card overflow-hidden">
            <div className="h-[52px] border-b border-[#e8ecf3] bg-[#fafbfd]" />
            <div className="divide-y divide-[#eef1f7]">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex-1 space-y-2">
                            <div className="admin-skeleton h-3.5 w-48" />
                            <div className="admin-skeleton h-3 w-32" />
                        </div>
                        <div className="admin-skeleton h-3.5 w-40" />
                        <div className="admin-skeleton h-3.5 w-20" />
                        <div className="admin-skeleton h-6 w-20 rounded-full" />
                        <div className="admin-skeleton h-8 w-8 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function PaymentsTable({
    rows,
    page,
    totalPages,
    total,
    limit,
    onPageChange,
}) {
    const range = getRangeLabel({ page, limit, total });

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="admin-card overflow-hidden"
        >
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#fafbfd]">
                        <tr>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Reference
                                </span>
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Payer
                                </span>
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Amount
                                </span>
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Channel
                                </span>
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Status
                                </span>
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Date
                                </span>
                            </th>
                            <th className="px-5 py-3 text-right">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Actions
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eef1f7]">
                        {rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-5 py-16 text-center"
                                >
                                    <p className="text-sm font-medium text-[#0f172a]">
                                        No payments match this filter
                                    </p>
                                    <p className="mt-1 text-xs text-[#64748b]">
                                        Try a different status or clear the
                                        search.
                                    </p>
                                </td>
                            </tr>
                        )}

                        {rows.map((p) => {
                            const payerName = `${p.payer?.firstName || ""} ${
                                p.payer?.lastName || ""
                            }`.trim();
                            const amount =
                                Number(p.totalAmount ?? p.amount ?? 0) / 100;

                            return (
                                <tr
                                    key={p.id}
                                    className="group transition-colors hover:bg-[#fbfcfe]"
                                >
                                    <td className="px-5 py-3.5">
                                        <Link
                                            to={`/admin/payments/${p.id}`}
                                            className="block"
                                        >
                                            <p className="text-sm font-medium text-[#0f172a] group-hover:text-[#0b1b3a] truncate max-w-[220px]">
                                                {p.reference || "—"}
                                            </p>
                                            {p.gatewayTransactionId && (
                                                <p className="text-xs text-[#64748b] font-mono truncate max-w-[220px]">
                                                    {p.gatewayTransactionId}
                                                </p>
                                            )}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0b1b3a] to-[#122551] text-[10px] font-semibold text-[#e6d6a8]">
                                                {initial(payerName) || "?"}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-[#0f172a]">
                                                    {payerName || "—"}
                                                </p>
                                                <p className="truncate text-xs text-[#64748b]">
                                                    {p.payer?.email || "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <p className="text-sm font-semibold tabular-nums text-[#0f172a]">
                                            {naira(amount)}
                                        </p>
                                        <p className="text-[11px] text-[#64748b] uppercase">
                                            {p.currency || "NGN"}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <p className="text-sm text-[#0f172a] capitalize">
                                            {(p.channel || "—").replace(
                                                /_/g,
                                                " ",
                                            )}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <StatusPill status={p.status} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <p className="text-sm tabular-nums text-[#0f172a]">
                                            {p.createdAt
                                                ? new Date(
                                                      p.createdAt,
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </p>
                                        <p className="text-[11px] text-[#64748b]">
                                            {p.createdAt
                                                ? new Date(
                                                      p.createdAt,
                                                  ).toLocaleTimeString([], {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                  })
                                                : ""}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <Link
                                            to={`/admin/payments/${p.id}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f8fafc]"
                                        >
                                            <Eye size={12} /> View
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

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
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f6f7fb] disabled:opacity-40"
                    >
                        <ChevronLeft size={14} /> Prev
                    </button>
                    <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#0f172a] ring-1 ring-[#e8ecf3] tabular-nums">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f6f7fb] disabled:opacity-40"
                    >
                        Next <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
