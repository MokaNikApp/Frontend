import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./wallet.css";

/**
 * Bottom sheet on phones, centred dialog from `sm` up.
 * Esc / backdrop closes (unless `locked`), body scroll is locked while open.
 */
export default function Sheet({ open, onClose, title, subtitle, children, footer, locked = false }) {
  const titleId = useId();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape" && !locked) onClose?.();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, locked, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="wallet-fade absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]" onClick={locked ? undefined : onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="wallet-sheet relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl outline-none sm:max-w-[440px] sm:rounded-[28px]"
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-slate-200 sm:hidden" />
        <div className="flex items-start justify-between gap-4 px-5 pb-2 pt-4 sm:px-6 sm:pt-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-bold tracking-tight text-slate-900">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            disabled={locked}
            aria-label="Close"
            className="-mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 pb-4 sm:px-6">{children}</div>
        {footer && <div className="wallet-safe-b border-t border-slate-100 bg-white px-5 pt-4 sm:px-6 sm:pb-6">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
