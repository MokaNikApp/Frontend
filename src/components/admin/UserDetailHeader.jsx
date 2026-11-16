import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    Mail,
    MapPin,
    Pause,
    Phone,
    Play,
    Settings2,
    ShieldCheck,
    UserX,
} from "lucide-react";
import StatusPill from "./StatusPill";

const initial = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

const rolePillClass = (role = "") => {
    const r = role.toLowerCase();
    if (r === "admin" || r === "auditor")
        return "bg-[#f7ecd2] text-[#8a6c22] ring-[#f0dcae]";
    if (r === "provider" || r === "mechanic")
        return "bg-blue-50 text-blue-700 ring-blue-100";
    return "bg-slate-50 text-slate-600 ring-slate-100";
};

export default function UserDetailHeader({
    user,
    onChangeStatus,
    onChangeRole,
    statusPending,
}) {
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const isSuspended = (user.status || "").toLowerCase() === "suspended";
    const isDeactivated = (user.status || "").toLowerCase() === "deactivated";

    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
            <div className="absolute inset-0 admin-hero-grid opacity-60" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />

            <div className="relative">
                <Link
                    to="/admin/users"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-300 hover:text-white transition-colors"
                >
                    <ArrowLeft size={12} /> Back to users
                </Link>

                <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4 min-w-0">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c9a24b] to-[#a37e2d] text-[#0b1b3a] text-lg font-bold shadow-lg shadow-black/20">
                            {initial(name) || "?"}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-2xl font-semibold tracking-tight truncate">
                                {name || "Unnamed user"}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1 ${rolePillClass(user.role)}`}
                                >
                                    {user.role}
                                </span>
                                <StatusPill status={user.status} />
                                {user.isVerified && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                                        <ShieldCheck size={11} /> Verified
                                    </span>
                                )}
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                                {user.email && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <Mail
                                            size={12}
                                            className="text-[#c9a24b]"
                                        />
                                        {user.email}
                                    </span>
                                )}
                                {user.phoneNumber && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <Phone
                                            size={12}
                                            className="text-[#c9a24b]"
                                        />
                                        {user.phoneNumber}
                                    </span>
                                )}
                                {(user.city || user.state) && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin
                                            size={12}
                                            className="text-[#c9a24b]"
                                        />
                                        {[user.city, user.state]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </span>
                                )}
                                {user.createdAt && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <Calendar
                                            size={12}
                                            className="text-[#c9a24b]"
                                        />
                                        Joined{" "}
                                        {new Date(
                                            user.createdAt,
                                        ).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {!isSuspended ? (
                            <button
                                onClick={() => onChangeStatus("suspended")}
                                disabled={statusPending}
                                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 disabled:opacity-50"
                            >
                                <Pause size={14} /> Suspend
                            </button>
                        ) : (
                            <button
                                onClick={() => onChangeStatus("active")}
                                disabled={statusPending}
                                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 disabled:opacity-50"
                            >
                                <Play size={14} /> Reactivate
                            </button>
                        )}

                        {!isDeactivated && (
                            <button
                                onClick={() => onChangeStatus("deactivated")}
                                disabled={statusPending}
                                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 disabled:opacity-50"
                            >
                                <UserX size={14} /> Deactivate
                            </button>
                        )}

                        <button
                            onClick={onChangeRole}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#c9a24b] px-4 py-2 text-xs font-semibold text-[#0b1b3a] shadow-lg shadow-black/20 hover:bg-[#d9b563]"
                        >
                            <Settings2 size={14} /> Change role
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
