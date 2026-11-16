import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowUpRight,
    Ban,
    CalendarCheck,
    CheckCircle2,
    Copy,
    CreditCard,
    Eye,
    FileText,
    Pause,
    User,
    UserCog,
    Wrench,
} from "lucide-react";
import AuditActionNode, { parseAction, actionTone } from "./AuditActionNode";

const initial = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

const TARGET_ICON = {
    provider: Wrench,
    document: FileText,
    user: User,
    booking: CalendarCheck,
    job: Wrench,
    payment: CreditCard,
    admin: UserCog,
};

const TARGET_PATH = {
    provider: (id) => `/admin/providers/${id}`,
    user: (id) => `/admin/users/${id}`,
    booking: (id) => `/admin/bookings/${id}`,
    job: (id) => `/admin/jobs/${id}`,
    payment: (id) => `/admin/payments/${id}`,
};

const relative = (date) => {
    if (!date) return "";
    const sec = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (sec < 60) return "just now";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 30) return `${day}d ago`;
    return new Date(date).toLocaleDateString();
};

export default function AuditLogRow({ log, onOpen, onPreviewDocument }) {
    const actorName =
        log.actorName ||
        `${log.actor?.firstName || ""} ${log.actor?.lastName || ""}`.trim() ||
        "Unknown actor";
    const actorRole = (log.actorRole || "").toLowerCase();
    const TargetIcon = TARGET_ICON[log.targetType] || FileText;
    const targetLink =
        log.targetType && log.targetId && TARGET_PATH[log.targetType]
            ? TARGET_PATH[log.targetType](log.targetId)
            : null;

    const { verb } = parseAction(log.action);
    const tone = actionTone(log.action);

    const targetName =
        log.metadata?.providerName ||
        log.metadata?.userName ||
        log.metadata?.workshopName ||
        log.metadata?.bookingNumber ||
        log.metadata?.jobTitle ||
        null;

    // Document preview: metadata may carry fileUrl (when backend enriches),
    // OR we can jump to the parent provider via metadata.providerId.
    const documentMeta = log.metadata || {};
    const canPreviewDocument =
        log.targetType === "document" &&
        typeof onPreviewDocument === "function" &&
        (documentMeta.fileUrl || documentMeta.mimeType);

    const providerOfDocumentLink = documentMeta.providerId
        ? `/admin/providers/${documentMeta.providerId}`
        : null;

    const copyId = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(log.id);
        } catch {
            /* noop */
        }
    };

    return (
        <li className="group relative flex gap-4 px-5 py-4 hover:bg-[#fbfcfe] transition-colors">
            {/* Timeline rail */}
            <div className="relative flex flex-col items-center">
                <AuditActionNode action={log.action} />
                <span className="mt-2 h-full w-px flex-1 bg-gradient-to-b from-[#e8ecf3] to-transparent" />
            </div>

            {/* Body */}
            <div className="min-w-0 flex-1 pb-2">
                {/* Meta line */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#64748b]">
                    <span className="font-medium text-[#0f172a]">
                        {actorName}
                    </span>
                    {actorRole && (
                        <span className="rounded-full bg-[#f6f7fb] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#334155] ring-1 ring-[#e8ecf3]">
                            {actorRole}
                        </span>
                    )}
                    <span>·</span>
                    <span className="tabular-nums">
                        {relative(log.createdAt)}
                    </span>
                    {log.ipAddress && (
                        <>
                            <span>·</span>
                            <span className="font-mono text-[10px] text-[#94a3b8]">
                                {log.ipAddress.replace("::ffff:", "")}
                            </span>
                        </>
                    )}
                </div>

                {/* Sentence */}
                <p className="mt-1 text-sm leading-relaxed text-[#0f172a]">
                    <span className="font-semibold">
                        {actorName.split(" ")[0]}
                    </span>{" "}
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${tone.pill}`}
                    >
                        {verb}
                    </span>{" "}
                    {log.targetType && (
                        <>
                            <span className="text-[#64748b]">
                                {log.targetType}
                            </span>{" "}
                            {targetLink ? (
                                <Link
                                    to={targetLink}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1 font-medium text-[#0b1b3a] hover:underline"
                                >
                                    {targetName ||
                                        `${log.targetId?.slice(0, 8)}…`}
                                    <ArrowUpRight size={11} />
                                </Link>
                            ) : (
                                <span className="font-medium text-[#0f172a]">
                                    {targetName ||
                                        `${log.targetId?.slice(0, 8) ?? ""}`}
                                </span>
                            )}
                        </>
                    )}
                </p>

                {/* Context: reason / workshop / extra info from metadata */}
                {(log.metadata?.reason || log.metadata?.workshopName) && (
                    <p className="mt-1.5 text-[11px] italic text-[#64748b] truncate">
                        {log.metadata?.reason
                            ? `“${log.metadata.reason}”`
                            : log.metadata?.workshopName}
                    </p>
                )}

                {/* Quick actions — appear on hover or always on mobile */}
                <div className="mt-2 flex flex-wrap items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    {canPreviewDocument && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPreviewDocument(log);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#0b1b3a] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#122551]"
                        >
                            <Eye size={11} /> Preview document
                        </button>
                    )}
                    {log.targetType === "document" &&
                        providerOfDocumentLink &&
                        !canPreviewDocument && (
                            <Link
                                to={providerOfDocumentLink}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1 text-[11px] font-medium text-[#334155] hover:bg-[#f8fafc]"
                            >
                                <TargetIcon size={11} /> Open provider
                            </Link>
                        )}
                    {targetLink && log.targetType !== "document" && (
                        <Link
                            to={targetLink}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1 text-[11px] font-medium text-[#334155] hover:bg-[#f8fafc]"
                        >
                            <TargetIcon size={11} /> Open {log.targetType}
                        </Link>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen(log);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1 text-[11px] font-medium text-[#334155] hover:bg-[#f8fafc]"
                    >
                        <FileText size={11} /> Details
                    </button>
                    <button
                        onClick={copyId}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#e8ecf3] bg-white px-2 py-1 text-[11px] font-medium text-[#64748b] hover:bg-[#f8fafc]"
                        title="Copy log ID"
                    >
                        <Copy size={11} />
                    </button>
                </div>
            </div>
        </li>
    );
}
