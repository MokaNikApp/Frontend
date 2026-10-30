import { useEffect, useState } from "react";
import { CreditCard, Wallet, Plus, Lock, CheckCircle2 } from "lucide-react";
import Sheet from "./Sheet";
import { Spinner } from "./ui";
import { useWallet } from "../../hooks/useWallet";
import { formatNaira } from "../../lib/utils/money";

/**
 * "How do you want to pay?" for a completed job.
 *  - Wallet: paid instantly from the customer wallet (no redirect).
 *  - Card:   redirects to Paystack.
 *
 * Props
 *  open, job, onClose
 *  busyMethod  "card" | "wallet" | null   (which option is currently being processed)
 *  error       string                      (inline error from the last attempt)
 *  insufficient boolean                    (server said 422 Insufficient wallet balance)
 *  onPay(method)
 *  onTopUp()                               (go to the wallet page to add money)
 */
export default function PayMethodSheet({ open, job, onClose, busyMethod, error, insufficient, onPay, onTopUp }) {
  const { data: wallet, isLoading, isError, refetch } = useWallet();
  const [choice, setChoice] = useState("wallet");

  const amount = Number(job?.totalAmount);
  const hasAmount = Number.isFinite(amount) && amount > 0;
  const balance = Number(wallet?.balance);
  const balanceKnown = Number.isFinite(balance);
  // The server decides the real amount and has the final say; this is only a friendly early warning.
  const short = insufficient || (balanceKnown && hasAmount && balance < amount);
  const walletUnavailable = isLoading || isError || short;
  const busy = !!busyMethod;

  // Re-read the balance whenever the sheet opens (it may have changed since the page loaded).
  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  // Default to the wallet when it can cover the job, otherwise card.
  useEffect(() => {
    if (!open) return;
    setChoice(balanceKnown && (!hasAmount || balance >= amount) ? "wallet" : "card");
  }, [open, balanceKnown, balance, amount, hasAmount]);

  const effective = choice === "wallet" && walletUnavailable ? "card" : choice;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      locked={busy}
      title="Choose how to pay"
      subtitle={job?.title ? `${job.title}` : "Pay for this service"}
      footer={
        <button
          type="button"
          disabled={busy}
          onClick={() => onPay(effective)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          {busy ? (
            <>
              <Spinner /> {busyMethod === "wallet" ? "Paying from wallet…" : "Taking you to Paystack…"}
            </>
          ) : effective === "wallet" ? (
            <>Pay {hasAmount ? formatNaira(amount) : ""} from wallet</>
          ) : (
            <>Pay {hasAmount ? formatNaira(amount) : ""} with card</>
          )}
        </button>
      }
    >
      <div className="pt-3">
        {hasAmount && (
          <div className="mb-4 rounded-2xl bg-slate-50 px-4 py-3 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Amount due</p>
            <p className="mt-0.5 text-2xl font-black tabular-nums text-slate-900">{formatNaira(amount)}</p>
          </div>
        )}

        <div role="radiogroup" aria-label="Payment method" className="flex flex-col gap-2.5">
          {/* Wallet */}
          <button
            type="button"
            role="radio"
            aria-checked={effective === "wallet"}
            disabled={busy || walletUnavailable}
            onClick={() => setChoice("wallet")}
            className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
              effective === "wallet" ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600" : "border-slate-200 bg-white hover:border-slate-300"
            } ${walletUnavailable ? "cursor-not-allowed opacity-70" : ""}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
              <Wallet size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-slate-900">Pay with wallet</span>
              <span className="block text-xs text-slate-500">
                {isLoading
                  ? "Checking balance…"
                  : isError
                    ? "Couldn't load your balance"
                    : `Balance ${formatNaira(wallet?.balance)}`}
              </span>
            </span>
            {effective === "wallet" && <CheckCircle2 size={20} className="shrink-0 text-blue-600" />}
          </button>

          {short && !isLoading && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5">
              <p className="text-xs leading-snug text-amber-800">
                Your wallet balance isn&apos;t enough for this payment.
              </p>
              <button
                type="button"
                onClick={onTopUp}
                disabled={busy}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-amber-600 active:scale-95 disabled:opacity-50"
              >
                <Plus size={13} /> Add money
              </button>
            </div>
          )}

          {isError && (
            <button type="button" onClick={() => refetch()} className="self-start px-1 text-xs font-semibold text-blue-600 hover:underline">
              Try loading balance again
            </button>
          )}

          {/* Card */}
          <button
            type="button"
            role="radio"
            aria-checked={effective === "card"}
            disabled={busy}
            onClick={() => setChoice("card")}
            className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
              effective === "card" ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <CreditCard size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-slate-900">Pay with card</span>
              <span className="block text-xs text-slate-500">Secure checkout on Paystack</span>
            </span>
            {effective === "card" && <CheckCircle2 size={20} className="shrink-0 text-blue-600" />}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-[13px] text-red-700" role="alert">
            {error}
          </div>
        )}

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3 text-xs leading-relaxed text-slate-500">
          <Lock size={14} className="mt-0.5 shrink-0 text-slate-400" />
          <span>Your payment is held securely and released to the mechanic after the settlement window.</span>
        </div>
      </div>
    </Sheet>
  );
}
