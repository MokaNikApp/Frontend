import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    tone = "default", // default | danger | success
    busy = false,
    onConfirm,
    onCancel,
    children,
}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onCancel?.();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onCancel]);

    const confirmTone = {
        default: "bg-[#0b1b3a] hover:bg-[#122551] text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    }[tone];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        className="absolute inset-0 bg-[#0b1b3a]/40 backdrop-blur-sm"
                        onClick={busy ? undefined : onCancel}
                    />
                    <motion.div
                        className="relative w-full max-w-md admin-card p-6"
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <h3 className="text-base font-semibold text-[#0f172a]">
                            {title}
                        </h3>
                        {description && (
                            <p className="mt-1.5 text-sm text-[#64748b]">
                                {description}
                            </p>
                        )}
                        {children && <div className="mt-4">{children}</div>}
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={busy}
                                className="rounded-lg border border-[#e8ecf3] bg-white px-4 py-2 text-sm font-medium text-[#334155] hover:bg-[#f8fafc] disabled:opacity-50"
                            >
                                {cancelLabel}
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={busy}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60 ${confirmTone}`}
                            >
                                {busy && (
                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                )}
                                {confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
