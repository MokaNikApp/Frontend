import { useState } from "react";
import { Eye, EyeOff, RefreshCw, ShieldCheck } from "lucide-react";
import { splitNaira } from "../../lib/utils/money";
import { cx, Skeleton } from "./ui";

const HIDE_KEY = "wallet_hide_balance";
const readHidden = () => {
  try {
    return localStorage.getItem(HIDE_KEY) === "1";
  } catch {
    return false;
  }
};

const TONES = {
  customer: "from-blue-700 via-blue-600 to-indigo-700",
  mechanic: "from-slate-900 via-blue-900 to-blue-700",
};

/**
 * The balance card. `actions` and `footer` are slots so customer and mechanic
 * share one design but get different buttons.
 */
export default function WalletHero({
  label = "Wallet balance",
  wallet,
  loading,
  error,
  onRetry,
  tone = "customer",
  actions,
  footer,
  badge,
}) {
  const [hidden, setHidden] = useState(readHidden);
  const toggle = () => {
    setHidden((h) => {
      try {
        localStorage.setItem(HIDE_KEY, h ? "0" : "1");
      } catch {
        /* storage blocked */
      }
      return !h;
    });
  };
  const { whole, decimals } = splitNaira(wallet?.balance ?? 0);

  return (
    <div className={cx("relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-lg shadow-blue-900/15 sm:p-7", TONES[tone])}>
      {/* decoration */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-sky-300/15 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.55) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(115deg, transparent 35%, black)",
          WebkitMaskImage: "linear-gradient(115deg, transparent 35%, black)",
        }}
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-[13px] font-medium text-blue-100/90">{label}</p>
            <button
              onClick={toggle}
              aria-label={hidden ? "Show balance" : "Hide balance"}
              aria-pressed={hidden}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-blue-100 transition hover:bg-white/20"
            >
              {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            {badge}
          </div>

          <div className="mt-2 min-h-[52px] sm:min-h-[60px]">
            {loading ? (
              <Skeleton className="h-11 w-56 !bg-white/20" />
            ) : error ? (
              <div className="flex items-center gap-3">
                <p className="text-sm text-blue-100">Couldn&apos;t load your balance.</p>
                <button onClick={onRetry} className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25">
                  <RefreshCw size={12} /> Retry
                </button>
              </div>
            ) : hidden ? (
              <p className="text-[40px] font-bold leading-none tracking-[0.2em] sm:text-5xl" aria-label="Balance hidden">••••••</p>
            ) : (
              <p className="flex items-baseline font-bold leading-none tracking-tight tabular-nums" aria-live="polite">
                <span className="text-[40px] sm:text-5xl">{whole}</span>
                <span className="text-xl text-blue-100/80 sm:text-2xl">{decimals}</span>
              </p>
            )}
          </div>

          {footer && <div className="mt-4">{footer}</div>}
        </div>

        {actions && <div className="flex w-full shrink-0 flex-wrap gap-2.5 lg:w-auto">{actions}</div>}
      </div>

      <div className="relative mt-5 flex items-center gap-1.5 text-[11px] text-blue-100/70">
        <ShieldCheck size={13} /> Payments are held securely in escrow until the job is settled.
      </div>
    </div>
  );
}

export const HeroButton = ({ variant = "solid", icon: Icon, children, className = "", ...rest }) => (
  <button
    {...rest}
    className={cx(
      "inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold transition sm:px-5 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none",
      variant === "solid"
        ? "bg-white text-blue-700 shadow-sm hover:bg-blue-50"
        : "bg-white/12 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20",
      className
    )}
  >
    {Icon && <Icon size={17} strokeWidth={2.4} />}
    {children}
  </button>
);
