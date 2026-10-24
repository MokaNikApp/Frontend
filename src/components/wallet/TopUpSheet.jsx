import { useEffect, useRef, useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import Sheet from "./Sheet";
import AmountField, { Chip } from "./AmountField";
import { Spinner } from "./ui";
import { walletApi } from "../../api/wallet";
import { amountToInput, formatNaira, formatNairaShort, parseAmount } from "../../lib/utils/money";
import { getApiError, newIdempotencyKey } from "../../lib/utils/apiHelpers";

// Server defaults. The server stays the source of truth; its error message is shown if these differ.
const MIN = 100;
const MAX = 500_000;
const PRESETS = [1000, 2000, 5000, 10000, 20000];

export default function TopUpSheet({ open, onClose, initialAmount }) {
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  // One key per user action: reused for retries of the same amount, replaced when the amount changes.
  const keyRef = useRef({ key: null, amount: null });

  useEffect(() => {
    if (!open) return;
    setAmount(initialAmount ? amountToInput(initialAmount) : "");
    setError("");
    setBusy(false);
    keyRef.current = { key: null, amount: null };
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open, initialAmount]);

  // Coming back from Paystack with the back button (bfcache) must not leave the button stuck.
  useEffect(() => {
    const onShow = (e) => e.persisted && setBusy(false);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  const value = parseAmount(amount);
  const tooLow = !Number.isNaN(value) && value < MIN;
  const tooHigh = !Number.isNaN(value) && value > MAX;
  const valid = !Number.isNaN(value) && !tooLow && !tooHigh;
  const hint = tooLow ? `Minimum top-up is ${formatNaira(MIN)}` : tooHigh ? `Maximum top-up is ${formatNaira(MAX)}` : "";

  const submit = async (e) => {
    e?.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError("");
    if (keyRef.current.amount !== value) keyRef.current = { key: newIdempotencyKey(), amount: value };
    try {
      const res = await walletApi.topUp({ amount: value, key: keyRef.current.key });
      if (!res?.authorizationUrl) throw new Error("no-url");
      window.location.assign(res.authorizationUrl); // Paystack -> /wallet/top-up/verify?reference=…
    } catch (err) {
      setBusy(false);
      setError(err.message === "no-url" ? "We couldn't start the payment. Please try again." : getApiError(err));
    }
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      locked={busy}
      title="Add money"
      subtitle="Top up your wallet with your card or bank, powered by Paystack."
      footer={
        <button
          type="submit"
          form="topup-form"
          disabled={!valid || busy}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          {busy ? (
            <>
              <Spinner /> Taking you to Paystack…
            </>
          ) : (
            <>
              {valid ? `Continue with ${formatNairaShort(value)}` : "Enter an amount"} <ArrowRight size={17} />
            </>
          )}
        </button>
      }
    >
      <form id="topup-form" onSubmit={submit} className="pt-3">
        <label htmlFor="topup-amount" className="sr-only">Amount in naira</label>
        <AmountField ref={inputRef} id="topup-amount" value={amount} onChange={setAmount} invalid={tooLow || tooHigh} disabled={busy} describedBy="topup-hint" />
        <p id="topup-hint" className="mt-2 min-h-[18px] px-1 text-xs text-red-600" role={hint ? "alert" : undefined}>
          {hint}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <Chip key={p} active={value === p} disabled={busy} onClick={() => setAmount(amountToInput(p))}>
              {formatNairaShort(p)}
            </Chip>
          ))}
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-[13px] text-red-700" role="alert">
            {error}
          </div>
        )}

        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3 text-xs leading-relaxed text-slate-500">
          <Lock size={14} className="mt-0.5 shrink-0 text-slate-400" />
          <span>
            You&apos;ll complete payment on Paystack&apos;s secure page, then come straight back here. Your balance updates as soon as the payment is confirmed.
          </span>
        </div>
      </form>
    </Sheet>
  );
}
