import { useState } from "react";
import { AlertCircle, Check, Copy, RefreshCw } from "lucide-react";
import { TONES } from "../../lib/utils/walletMeta";

export const cx = (...c) => c.filter(Boolean).join(" ");

export const Skeleton = ({ className = "" }) => (
  <div className={cx("animate-pulse rounded-lg bg-slate-200/70", className)} aria-hidden="true" />
);

export const Badge = ({ tone = "slate", pulse = false, children }) => (
  <span
    className={cx(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset whitespace-nowrap",
      TONES[tone] || TONES.slate
    )}
  >
    <span className={cx("h-1.5 w-1.5 rounded-full bg-current", pulse && "animate-pulse")} />
    {children}
  </span>
);

export const Card = ({ className = "", children, ...rest }) => (
  <section className={cx("rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]", className)} {...rest}>
    {children}
  </section>
);

export const CardHeader = ({ title, subtitle, right }) => (
  <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
    <div className="min-w-0">
      <h2 className="text-[15px] font-bold tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
    </div>
    {right}
  </div>
);

export const EmptyState = ({ icon: Icon, title, text, action }) => (
  <div className="flex flex-col items-center px-6 py-12 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
      <Icon size={26} strokeWidth={1.8} />
    </div>
    <p className="text-sm font-bold text-slate-900">{title}</p>
    <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-slate-500">{text}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center px-6 py-10 text-center" role="alert">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
      <AlertCircle size={22} />
    </div>
    <p className="max-w-xs text-[13px] leading-relaxed text-slate-600">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 active:scale-[.98]"
      >
        <RefreshCw size={14} /> Try again
      </button>
    )}
  </div>
);

export const CopyButton = ({ value, label = "Copy" }) => {
  const [ok, setOk] = useState(false);
  const copy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setOk(true);
      setTimeout(() => setOk(false), 1500);
    } catch {
      /* clipboard blocked: ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={cx(
        "inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors",
        ok ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-slate-200 bg-white text-slate-400 hover:text-slate-600"
      )}
    >
      {ok ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
};

export const Spinner = ({ size = 16, className = "" }) => (
  <svg className={cx("animate-spin", className)} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);
