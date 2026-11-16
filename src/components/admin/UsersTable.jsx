import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    MailCheck,
    MoreHorizontal,
    Pause,
    Play,
    ShieldCheck,
    UserX,
} from "lucide-react";
import StatusPill from "./StatusPill";
import { getRangeLabel } from "../../utils/pagination";

const initial = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

function SortHeader({ label, field, sortBy, sortOrder, onSort }) {
    const active = sortBy === field;
    return (
        <button
            onClick={() => onSort(field)}
            className={`group inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                active
                    ? "text-[#0b1b3a]"
                    : "text-[#64748b] hover:text-[#0f172a]"
            }`}
        >
            {label}
            <ArrowUpDown
                size={11}
                className={active && sortOrder === "DESC" ? "rotate-180" : ""}
            />
        </button>
    );
}

function ActionsMenu({ user, onChangeStatus }) {
    const [open, setOpen] = useState(false);
    const isSuspended = (user.status || "").toLowerCase() === "suspended";
    const isDeactivated = (user.status || "").toLowerCase() === "deactivated";

    return (
        <div className="relative flex justify-end">
            <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f6f7fb] hover:text-[#0f172a]"
                aria-label="Actions"
            >
                <MoreHorizontal size={16} />
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-20"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-[#e8ecf3] bg-white p-1 shadow-xl">
                        <Link
                            to={`/admin/users/${user.id}`}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#0f172a] hover:bg-[#f6f7fb]"
                        >
                            <Eye size={14} /> View details
                        </Link>
                        {!isSuspended ? (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onChangeStatus(user, "suspended");
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <Pause size={14} /> Suspend
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onChangeStatus(user, "active");
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50"
                            >
                                <Play size={14} /> Reactivate
                            </button>
                        )}
                        {!isDeactivated && (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onChangeStatus(user, "deactivated");
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#64748b] hover:bg-[#f6f7fb]"
                            >
                                <UserX size={14} /> Deactivate
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export function UsersTableSkeleton() {
    return (
        <div className="admin-card overflow-hidden">
            <div className="h-[52px] border-b border-[#e8ecf3] bg-[#fafbfd]" />
            <div className="divide-y divide-[#eef1f7]">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4">
                        <div className="admin-skeleton h-9 w-9 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <div className="admin-skeleton h-3.5 w-40" />
                            <div className="admin-skeleton h-3 w-56" />
                        </div>
                        <div className="admin-skeleton h-6 w-20 rounded-full" />
                        <div className="admin-skeleton h-6 w-16 rounded-full" />
                        <div className="admin-skeleton h-8 w-8 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function UsersTable({
    rows,
    sortBy,
    sortOrder,
    onSort,
    onChangeStatus,
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
                                <SortHeader
                                    label="User"
                                    field="createdAt"
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    onSort={onSort}
                                />
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Role
                                </span>
                            </th>
                            <th className="px-5 py-3">
                                <SortHeader
                                    label="Status"
                                    field="status"
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    onSort={onSort}
                                />
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Verified
                                </span>
                            </th>
                            <th className="px-5 py-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Joined
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
                                    colSpan={6}
                                    className="px-5 py-16 text-center"
                                >
                                    <p className="text-sm font-medium text-[#0f172a]">
                                        No users match this filter
                                    </p>
                                    <p className="mt-1 text-xs text-[#64748b]">
                                        Try a different role or clear the
                                        search.
                                    </p>
                                </td>
                            </tr>
                        )}

                        {rows.map((u) => {
                            const name =
                                `${u.firstName || ""} ${u.lastName || ""}`.trim();
                            return (
                                <tr
                                    key={u.id}
                                    className="group transition-colors hover:bg-[#fbfcfe]"
                                >
                                    <td className="px-5 py-3.5">
                                        <Link
                                            to={`/admin/users/${u.id}`}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0b1b3a] to-[#122551] text-[11px] font-semibold text-[#e6d6a8]">
                                                {initial(name) || "?"}
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block truncate text-sm font-medium text-[#0f172a] group-hover:text-[#0b1b3a]">
                                                    {name || "—"}
                                                </span>
                                                <span className="block truncate text-xs text-[#64748b]">
                                                    {u.email ||
                                                        u.phoneNumber ||
                                                        "—"}
                                                </span>
                                            </span>
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f6f7fb] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#334155] ring-1 ring-[#e8ecf3]">
                                            {u.role || "—"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <StatusPill status={u.status} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {u.isVerified ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                                                <ShieldCheck size={13} />{" "}
                                                Verified
                                            </span>
                                        ) : u.isEmailVerified ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                                                <MailCheck size={13} /> Email
                                                only
                                            </span>
                                        ) : (
                                            <span className="text-xs text-[#94a3b8]">
                                                —
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <p className="text-sm tabular-nums text-[#0f172a]">
                                            {u.createdAt
                                                ? new Date(
                                                      u.createdAt,
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <ActionsMenu
                                            user={u}
                                            onChangeStatus={onChangeStatus}
                                        />
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
