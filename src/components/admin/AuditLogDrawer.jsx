import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowUpRight,
    CalendarCheck,
    Eye,
    FileText,
    Hash,
    MapPin,
    User,
    UserCog,
    Wrench,
    X,
    CreditCard,
} from "lucide-react";
import AuditActionNode, { parseAction } from "./AuditActionNode";

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

export default function AuditLogDrawer({ log, onClose, onPreviewDocument }) {
    useEffect(() => {
        if (!log) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [log, onClose]);

    if (!log) return null;

    const actorName =
        log.actorName ||
        `${log.actor?.firstName || ""} ${log.actor?.lastName || ""}`.trim() ||
        "Unknown actor";
    const TargetIcon = TARGET_ICON[log.targetType] || FileText;
    const targetLink =
        log.targetType && log.targetId && TARGET_PATH[log.targetType]
            ? TARGET_PATH[log.targetType](log.targetId)
            : null;

    const parsed = parseAction(log.action);
    const documentMeta = log.metadata || {};
    const canPreviewDocument =
        log.targetType === "document" &&
        typeof onPreviewDocument === "function" &&
        (documentMeta.fileUrl || documentMeta.mimeType);
    const providerOfDocumentLink = documentMeta.providerId
        ? `/admin/providers/${documentMeta.providerId}`
        : null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div
                    className="absolute inset-0 bg-[#0b1b3a]/40 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.aside
                    className="relative flex h-full w-full max-w-lg flex-col overflow-hidden bg-white shadow-2xl"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    {/* Header */}
                    <div className="flex items-start gap-3 border-b border-[#e8ecf3] px-5 py-4">
                        <AuditActionNode action={log.action} size="lg" />
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                Audit entry
                            </p>
                            <p className="mt-0.5 truncate text-sm font-semibold text-[#0f172a]">
                                {actorName} {parsed.verb} {log.targetType}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#64748b]">
                                {log.createdAt
                                    ? new Date(log.createdAt).toLocaleString()
                                    : ""}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f6f7fb]"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                        {/* Document preview block */}
                        {log.targetType === "document" && (
                            <div className="rounded-xl border border-[#e8ecf3] bg-[#fafbfd] p-4">
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    Document
                                </p>
                                {documentMeta.documentType && (
                                    <p className="text-sm font-semibold capitalize text-[#0f172a]">
                                        {documentMeta.documentType.replace(
                                            /_/g,
                                            " ",
                                        )}
                                    </p>
                                )}
                                {documentMeta.fileName && (
                                    <p className="text-xs text-[#64748b]">
                                        {documentMeta.fileName}
                                    </p>
                                )}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {canPreviewDocument && (
                                        <button
                                            onClick={() =>
                                                onPreviewDocument(log)
                                            }
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b1b3a] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#122551]"
                                        >
                                            <Eye size={12} /> Preview document
                                        </button>
                                    )}
                                    {providerOfDocumentLink && (
                                        <Link
                                            to={providerOfDocumentLink}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e8ecf3] bg-white px-3 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f8fafc]"
                                        >
                                            <Wrench size={12} /> Open provider
                                        </Link>
                                    )}
                                    {!canPreviewDocument &&
                                        !providerOfDocumentLink && (
                                            <p className="text-[11px] italic text-[#94a3b8]">
                                                No document file attached to
                                                this log entry.
                                            </p>
                                        )}
                                </div>
                            </div>
                        )}

                        {/* Actor */}
                        <Section title="Actor">
                            <Field label="Name" value={actorName} />
                            <Field
                                label="Role"
                                value={log.actorRole}
                                capitalize
                            />
                            <Field label="Email" value={log.actorEmail} />
                            <Field label="Actor ID" value={log.actorId} mono />
                        </Section>

                        {/* Target */}
                        <Section title="Target">
                            <Field
                                label="Type"
                                value={log.targetType}
                                capitalize
                            />
                            <Field label="ID" value={log.targetId} mono />
                            {targetLink && (
                                <Link
                                    to={targetLink}
                                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#0b1b3a] hover:underline"
                                >
                                    Open {log.targetType}{" "}
                                    <ArrowUpRight size={11} />
                                </Link>
                            )}
                        </Section>

                        {/* Context */}
                        <Section title="Context">
                            <Field
                                label="Timestamp"
                                value={
                                    log.createdAt
                                        ? new Date(
                                              log.createdAt,
                                          ).toLocaleString()
                                        : null
                                }
                            />
                            <Field
                                label="IP address"
                                value={log.ipAddress?.replace("::ffff:", "")}
                                mono
                            />
                            <Field label="Log ID" value={log.id} mono />
                        </Section>

                        {/* Reason callout */}
                        {log.metadata?.reason && (
                            <div className="rounded-xl border-l-4 border-amber-300 bg-amber-50 p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                                    Reason
                                </p>
                                <p className="mt-1 text-sm text-[#0f172a]">
                                    “{log.metadata.reason}”
                                </p>
                            </div>
                        )}

                        {/* Metadata */}
                        {log.metadata &&
                            Object.keys(log.metadata).length > 0 && (
                                <div>
                                    <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                        <Hash size={12} /> Metadata
                                    </h3>
                                    <pre className="max-h-80 overflow-auto rounded-xl bg-[#0b1b3a] p-4 text-[11px] leading-relaxed text-[#e6d6a8] font-mono whitespace-pre-wrap">
                                        {JSON.stringify(log.metadata, null, 2)}
                                    </pre>
                                </div>
                            )}
                    </div>
                </motion.aside>
            </motion.div>
        </AnimatePresence>
    );
}

function Section({ title, children }) {
    return (
        <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                {title}
            </h3>
            <dl className="space-y-2">{children}</dl>
        </div>
    );
}

function Field({ label, value, mono, capitalize }) {
    const has =
        value !== null && value !== undefined && String(value).trim() !== "";
    return (
        <div className="flex items-start justify-between gap-3">
            <dt className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-[#94a3b8]">
                {label}
            </dt>
            <dd
                className={`text-right text-xs break-all ${
                    has ? "text-[#0f172a]" : "text-[#94a3b8] italic"
                } ${mono ? "font-mono" : ""} ${capitalize ? "capitalize" : ""}`}
            >
                {has ? value : "—"}
            </dd>
        </div>
    );
}
