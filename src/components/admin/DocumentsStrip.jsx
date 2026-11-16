import React, { useState } from "react";
import {
    Check,
    Download,
    Eye,
    FileText,
    Image as ImageIcon,
    X,
} from "lucide-react";
import StatusPill from "./StatusPill";
import DocumentLightbox from "./DocumentLightbox";
import ConfirmDialog from "./ConfirmDialog";

const DOC_LABEL = {
    mechanic_certification: "Mechanic certification",
    government_id: "Government ID",
    profile_photo: "Profile photo",
    business_license: "Business license",
};

const formatBytes = (bytes) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
};

export default function DocumentsStrip({ documents = [], actions }) {
    const [lightbox, setLightbox] = useState(null);
    const [rejectTarget, setRejectTarget] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const confirmReject = async () => {
        if (!rejectTarget) return;
        await actions.reject.mutateAsync({
            documentId: rejectTarget.id,
            reason: rejectReason.trim() || "Not acceptable",
        });
        setRejectTarget(null);
        setRejectReason("");
    };

    return (
        <div className="admin-card p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Documents
                    </h2>
                    <p className="text-xs text-[#64748b]">
                        {documents.length} file
                        {documents.length === 1 ? "" : "s"} uploaded
                    </p>
                </div>
            </div>

            {documents.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-[#e8ecf3] bg-[#fafbfd] p-8 text-center">
                    <FileText size={20} className="mx-auto text-[#94a3b8]" />
                    <p className="mt-2 text-sm font-medium text-[#0f172a]">
                        No documents uploaded yet
                    </p>
                    <p className="mt-0.5 text-xs text-[#64748b]">
                        Required documents will appear here once the provider
                        uploads them.
                    </p>
                </div>
            ) : (
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {documents.map((doc) => {
                        const isImage = (doc.mimeType || "").startsWith(
                            "image/",
                        );
                        return (
                            <li
                                key={doc.id}
                                className="group overflow-hidden rounded-xl border border-[#e8ecf3] bg-white"
                            >
                                {/* Preview */}
                                <button
                                    type="button"
                                    onClick={() => setLightbox(doc)}
                                    className="relative flex h-32 w-full items-center justify-center overflow-hidden bg-[#f6f7fb]"
                                >
                                    {isImage ? (
                                        <img
                                            src={doc.fileUrl}
                                            alt={doc.fileName}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <FileText
                                            size={28}
                                            className="text-[#94a3b8]"
                                        />
                                    )}
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0b1b3a] shadow">
                                            <Eye size={12} /> Preview
                                        </span>
                                    </span>
                                </button>

                                {/* Meta */}
                                <div className="p-3.5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-[#0f172a]">
                                                {DOC_LABEL[doc.documentType] ||
                                                    doc.documentType}
                                            </p>
                                            <p className="truncate text-[11px] text-[#64748b]">
                                                {doc.fileName} •{" "}
                                                {formatBytes(doc.fileSize)}
                                            </p>
                                        </div>
                                        <StatusPill status={doc.status} />
                                    </div>

                                    {doc.rejectionReason && (
                                        <p className="mt-2 rounded-lg bg-red-50 px-2 py-1.5 text-[11px] text-red-600">
                                            {doc.rejectionReason}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    {doc.status === "pending" && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    actions.verify.mutate(
                                                        doc.id,
                                                    )
                                                }
                                                disabled={
                                                    actions.verify.isPending
                                                }
                                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                            >
                                                <Check size={12} /> Verify
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setRejectTarget(doc)
                                                }
                                                disabled={
                                                    actions.reject.isPending
                                                }
                                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                            >
                                                <X size={12} /> Reject
                                            </button>
                                        </div>
                                    )}

                                    {doc.status === "verified" && (
                                        <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                                            <Check size={12} /> Verified
                                        </p>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <DocumentLightbox
                open={Boolean(lightbox)}
                document={lightbox}
                onClose={() => setLightbox(null)}
            />

            <ConfirmDialog
                open={Boolean(rejectTarget)}
                title="Reject this document?"
                description={`${DOC_LABEL[rejectTarget?.documentType] || "This document"} will be marked rejected. The provider will need to re-upload.`}
                confirmLabel="Reject document"
                tone="danger"
                busy={actions.reject.isPending}
                onCancel={() => {
                    setRejectTarget(null);
                    setRejectReason("");
                }}
                onConfirm={confirmReject}
            >
                <label className="block">
                    <span className="text-xs font-medium text-[#334155]">
                        Reason (min 5 characters)
                    </span>
                    <textarea
                        rows={3}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#e8ecf3] bg-white px-3 py-2 text-sm text-[#0f172a] focus:border-[#0b1b3a] focus:outline-none focus:ring-2 focus:ring-[#0b1b3a]/10"
                        placeholder="e.g. Document is blurry — please upload a clearer image"
                    />
                </label>
            </ConfirmDialog>
        </div>
    );
}
