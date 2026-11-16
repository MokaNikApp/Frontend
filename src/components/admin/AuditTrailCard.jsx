import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";

const relative = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return "just now";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 30) return `${day}d ago`;
    return new Date(date).toLocaleDateString();
};

export default function AuditTrailCard({ items = [], loading = false }) {
    return (
        <div className="admin-card p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Audit trail
                    </h2>
                    <p className="text-xs text-[#64748b]">
                        Recent admin actions on this provider.
                    </p>
                </div>
                <Link
                    to="/admin/audit-logs"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#0b1b3a] hover:gap-2 transition-all"
                >
                    All logs <ArrowUpRight size={12} />
                </Link>
            </div>

            {loading ? (
                <ul className="mt-4 space-y-2">
                    {[0, 1, 2].map((i) => (
                        <li
                            key={i}
                            className="admin-skeleton h-10 rounded-lg"
                        />
                    ))}
                </ul>
            ) : items.length === 0 ? (
                <p className="mt-4 rounded-lg border border-dashed border-[#e8ecf3] bg-[#fafbfd] p-4 text-center text-xs text-[#64748b]">
                    No actions recorded yet.
                </p>
            ) : (
                <ol className="mt-4 space-y-3">
                    {items.map((log) => (
                        <li key={log.id} className="flex gap-3">
                            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f7ecd2] text-[#8a6c22]">
                                <Clock size={10} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-[#0f172a]">
                                    <span className="font-medium">
                                        {log.action}
                                    </span>
                                </p>
                                <p className="text-[11px] text-[#64748b]">
                                    {log.admin || "Admin"} •{" "}
                                    {relative(log.createdAt)}
                                </p>
                                {log.metadata?.reason && (
                                    <p className="mt-0.5 text-[11px] text-[#64748b] italic">
                                        "{log.metadata.reason}"
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}
