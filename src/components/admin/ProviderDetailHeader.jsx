import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Check,
    Mail,
    MapPin,
    Pause,
    Phone,
    Play,
    Sparkles,
    Wrench,
} from "lucide-react";
import StatusPill from "./StatusPill";

const initials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

export default function ProviderDetailHeader({
    provider,
    canApprove,
    approveBlockedReason,
    onApprove,
    onStatus,
    approvePending,
}) {
    const user = provider?.user || {};
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const isSuspended = (user.status || "").toLowerCase() === "suspended";

    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
            <div className="absolute inset-0 admin-hero-grid opacity-60" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />

            <div className="relative">
                <Link
                    to="/admin/providers"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-300 hover:text-white transition-colors"
                >
                    <ArrowLeft size={12} />
                    Back to providers
                </Link>

                <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    {/* Identity */}
                    <div className="flex items-start gap-4 min-w-0">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c9a24b] to-[#a37e2d] text-[#0b1b3a] text-lg font-bold shadow-lg shadow-black/20">
                            {initials(name) || "?"}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-2xl font-semibold tracking-tight truncate">
                                {name || "Unnamed provider"}
                            </h1>
                            {provider.workshopName && (
                                <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-slate-300">
                                    <Wrench
                                        size={13}
                                        className="text-[#c9a24b]"
                                    />
                                    {provider.workshopName}
                                </p>
                            )}
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <StatusPill
                                    status={provider.verificationStatus}
                                />
                                <StatusPill
                                    status={
                                        provider.isApproved
                                            ? "approved"
                                            : "unapproved"
                                    }
                                />
                                {isSuspended && (
                                    <StatusPill status="suspended" />
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
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 md:items-end">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onStatus}
                                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition-colors ${
                                    isSuspended
                                        ? "bg-white/10 text-white ring-white/20 hover:bg-white/15"
                                        : "bg-white/10 text-white ring-white/20 hover:bg-white/15"
                                }`}
                            >
                                {isSuspended ? (
                                    <Play size={14} />
                                ) : (
                                    <Pause size={14} />
                                )}
                                {isSuspended ? "Reactivate" : "Suspend"}
                            </button>

                            {!provider.isApproved && (
                                <button
                                    onClick={onApprove}
                                    disabled={!canApprove || approvePending}
                                    title={
                                        !canApprove
                                            ? approveBlockedReason
                                            : undefined
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#c9a24b] px-4 py-2 text-xs font-semibold text-[#0b1b3a] shadow-lg shadow-black/20 transition-colors hover:bg-[#d9b563] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#c9a24b]"
                                >
                                    {approvePending ? (
                                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#0b1b3a]/40 border-t-[#0b1b3a]" />
                                    ) : (
                                        <Check size={14} />
                                    )}
                                    Approve provider
                                </button>
                            )}
                        </div>
                        {!provider.isApproved &&
                            !canApprove &&
                            approveBlockedReason && (
                                <p className="max-w-xs text-right text-[11px] text-amber-200/90">
                                    <Sparkles
                                        size={11}
                                        className="inline mr-1"
                                    />
                                    {approveBlockedReason}
                                </p>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
