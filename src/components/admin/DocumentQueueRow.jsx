import React from "react";
import { Link } from "react-router-dom";
import { Check, Eye, FileText, X } from "lucide-react";
import StatusPill from "./StatusPill";

const DOC_LABEL = {
    mechanic_certification: "Mechanic certification",
    government_id: "Government ID",
    profile_photo: "Profile photo",
    business_license: "Business license",
};

const formatBytes = (b) => {
    if (!b) return "";
    const kb = b / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
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

export default function DocumentQueueRow({
    document,
    onPreview,
    onVerify,
    onReject,
    busy,
}) {
    const isImage = (document.mimeType || "").startsWith("image/");
    const isPending = document.status === "pending";
    const providerUser = document.provider?.user || {};
    const providerName =
        `${providerUser.firstName || ""} ${providerUser.lastName || ""}`.trim() ||
        "Unknown provider";

    return (
        <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 hover:bg-[#fbfcfe] transition-colors">
            {/* Thumbnail */}
            <button
                type="button"
                onClick={() => onPreview(document)}
                className="group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f6f7fb] ring-1 ring-[#e8ecf3]"
            >
                {isImage ? (
                    <img
                        src={document.fileUrl}
                        alt={document.fileName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <FileText size={20} className="text-[#94a3b8]" />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
                    <Eye size={14} className="text-white" />
                </span>
            </button>

            {/* Meta */}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-[#0f172a]">
                        {DOC_LABEL[document.documentType] ||
                            document.documentType}
                    </p>
                    <StatusPill status={document.status} />
                </div>
                <p className="mt-0.5 truncate text-xs text-[#64748b]">
                    {document.fileName} • {formatBytes(document.fileSize)} •{" "}
                    uploaded {relative(document.createdAt)}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-[#64748b]">
                    <span>From</span>
                    {document.provider?.id ? (
                        <Link
                            to={`/admin/providers/${document.provider.id}`}
                            className="font-medium text-[#0b1b3a] hover:underline truncate max-w-[220px]"
                        >
                            {providerName}
                        </Link>
                    ) : (
                        <span className="font-medium text-[#0f172a]">
                            {providerName}
                        </span>
                    )}
                    {providerUser.email && (
                        <>
                            <span className="text-[#cbd5e1]">•</span>
                            <span className="truncate max-w-[220px]">
                                {providerUser.email}
                            </span>
                        </>
                    )}
                </div>
                {document.rejectionReason && (
                    <p className="mt-2 rounded-lg bg-red-50 px-2.5 py-1.5 text-[11px] text-red-600">
                        {document.rejectionReason}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:shrink-0">
                <button
                    onClick={() => onPreview(document)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f8fafc]"
                >
                    <Eye size={12} /> Preview
                </button>

                {isPending && (
                    <>
                        <button
                            onClick={() => onVerify(document)}
                            disabled={busy}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            <Check size={12} /> Verify
                        </button>
                        <button
                            onClick={() => onReject(document)}
                            disabled={busy}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                            <X size={12} /> Reject
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}
