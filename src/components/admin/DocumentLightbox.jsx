import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

export default function DocumentLightbox({ open, document, onClose }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        document?.__handleClose;
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const isImage = (document?.mimeType || "").startsWith("image/");
    const isPdf = (document?.mimeType || "") === "application/pdf";

    return (
        <AnimatePresence>
            {open && document && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        className="absolute inset-0 bg-[#0b1b3a]/70 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-between border-b border-[#e8ecf3] px-5 py-3">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#0f172a]">
                                    {document.fileName}
                                </p>
                                <p className="text-[11px] text-[#64748b] capitalize">
                                    {document.documentType?.replace(/_/g, " ")}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={document.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#e8ecf3] bg-white px-2.5 py-1.5 text-xs font-medium text-[#334155] hover:bg-[#f8fafc]"
                                >
                                    <Download size={13} />
                                    Open
                                </a>
                                <button
                                    onClick={onClose}
                                    className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f6f7fb]"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto bg-[#f6f7fb] p-4">
                            {isImage ? (
                                <img
                                    src={document.fileUrl}
                                    alt={document.fileName}
                                    className="mx-auto max-h-[75vh] rounded-xl shadow-lg"
                                />
                            ) : isPdf ? (
                                <iframe
                                    src={document.fileUrl}
                                    title={document.fileName}
                                    className="h-[70vh] w-full rounded-xl bg-white"
                                />
                            ) : (
                                <div className="flex h-64 items-center justify-center text-sm text-[#64748b]">
                                    Preview not available. Use "Open" to view.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
