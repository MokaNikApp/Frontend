import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, TriangleAlert } from "lucide-react";
import Sheet from "./Sheet";
import AmountField, { Chip } from "./AmountField";
import { Badge, Spinner } from "./ui";
import { walletApi } from "../../api/wallet";
import { amountToInput, formatNaira, parseAmount } from "../../lib/utils/money";
import { getApiError, newIdempotencyKey } from "../../lib/utils/apiHelpers";
import { PAYOUT_STATUS } from "../../lib/utils/walletMeta";

const MIN = 500; // server default; server message is shown if it differs
export const BANK_PAGE = "/mec-dashboard/mec-payments";

const floor2 = (n) => Math.floor(n * 100) / 100;

function Receipt({ payout }) {
  const st = PAYOUT_STATUS[payout.status] || PAYOUT_STATUS.processing;
  const failed = payout.status === "failed";
  const done = payout.status === "completed";
  return (
    <div className="pt-2 text-center">
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${failed ? "bg-red-50 text-red-500" : done ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}
      >
        {failed ? (
          <TriangleAlert size={30} />
        ) : done ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path className="wallet-check" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <Spinner size={28} />
        )}
      </div>
      <p className="mt-4 text-2xl font-extrabold tabular-nums tracking-tight text-slate-900">{formatNaira(payout.netAmount)}</p>
      <div className="mt-2 flex justify-center">
        <Badge tone={st.tone} pulse={st.pulse}>{st.label}</Badge>
      </div>
      <p className="mx-auto mt-3 max-w-[300px] text-[13px] leading-relaxed text-slate-500">
        {failed
          ? `${payout.failureReason || "The transfer could not be completed."} The money has been returned to your wallet.`
          : done
            ? `Sent to ${payout.accountName ? `${payout.accountName} · ` : ""}****${payout.accountLast4}`
            : "Transfer in progress. This can take a few minutes. We'll update the status here automatically."}
      </p>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 rounded-2xl bg-slate-50 p-4 text-left text-[13px]">
        <dt className="text-slate-500">Withdrawn</dt>
        <dd className="text-right font-semibold tabular-nums text-slate-800">{formatNaira(payout.amount)}</dd>
        <dt className="text-slate-500">Fee</dt>
        <dd className="text-right font-semibold tabular-nums text-slate-800">−{formatNaira(payout.fee)}</dd>
        <dt className="text-slate-500">Reference</dt>
        <dd className="break-all text-right font-mono text-[11px] text-slate-600">{payout.reference}</dd>
      </dl>
    </div>
  );
}

export default function WithdrawSheet({ open, onClose, balance = 0, onDone }) {
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null); // { amount, fee, netAmount }
  const [quoting, setQuoting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [needsBank, setNeedsBank] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const keyRef = useRef({ key: null, amount: null });

  useEffect(() => {
    if (!open) return;
    setAmount("");
    setQuote(null);
    setError("");
    setNeedsBank(false);
    setResult(null);
    setBusy(false);
    keyRef.current = { key: null, amount: null };
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  const value = parseAmount(amount);
  const hasValue = !Number.isNaN(value) && value > 0;
  const tooLow = hasValue && value < MIN;
  const tooHigh = hasValue && value > balance;
  const inRange = hasValue && !tooLow && !tooHigh;

  // Live fee quote (debounced) so "You will receive" is always the server's number.
  useEffect(() => {
    if (!open || !inRange) {
      setQuote(null);
      setQuoting(false);
      return undefined;
    }
    setQuoting(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const q = await walletApi.payoutFee(value, ctrl.signal);
        setQuote(q);
        setError((e) => (e.startsWith("fee:") ? "" : e));
      } catch (err) {
        if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") return;
        setQuote(null);
        setError(`fee:${getApiError(err, "Couldn't calculate the fee.")}`);
      } finally {
        if (!ctrl.signal.aborted) setQuoting(false);
      }
    }, 350);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [value, inRange, open]);

  const hint = tooLow ? `Minimum withdrawal is ${formatNaira(MIN)}` : tooHigh ? `You only have ${formatNaira(balance)} available` : "";
  const coversFee = !quote || quote.netAmount > 0;
  const quoteFresh = quote && quote.amount === value;
  const feeFailed = error.startsWith("fee:");
  // If the quote call itself failed, still let the server decide (it re-checks the fee).
  const canSubmit = inRange && !busy && !quoting && (quoteFresh ? coversFee : feeFailed);

  const chips = useMemo(
    () => [
      { label: "25%", v: floor2(balance * 0.25) },
      { label: "50%", v: floor2(balance * 0.5) },
      { label: "Max", v: floor2(balance) },
    ].filter((c) => c.v >= MIN),
    [balance]
  );

  const submit = async (e) => {
    e?.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setError("");
    setNeedsBank(false);
    if (keyRef.current.amount !== value) keyRef.current = { key: newIdempotencyKey(), amount: value };
    try {
      const payout = await walletApi.requestPayout({ amount: value, key: keyRef.current.key });
      setResult(payout);
      onDone?.(payout);
    } catch (err) {
      const msg = getApiError(err);
      if (err?.response?.status === 400 && /bank account/i.test(msg)) setNeedsBank(true);
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  const shownError = error.startsWith("fee:") ? error.slice(4) : error;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      locked={busy}
      title={result ? "Withdrawal requested" : "Withdraw funds"}
      subtitle={result ? undefined : `Available: ${formatNaira(balance)}`}
      footer={
        result ? (
          <button onClick={onClose} className="w-full rounded-2xl bg-slate-900 py-3.5 text-[15px] font-bold text-white hover:bg-slate-800 active:scale-[.99]">
            Done
          </button>
        ) : (
          <button
            type="submit"
            form="withdraw-form"
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            {busy ? (
              <>
                <Spinner /> Sending request…
              </>
            ) : (
              <>
                {inRange ? `Withdraw ${formatNaira(value)}` : "Enter an amount"} <ArrowRight size={17} />
              </>
            )}
          </button>
        )
      }
    >
      {result ? (
        <Receipt payout={result} />
      ) : (
        <form id="withdraw-form" onSubmit={submit} className="pt-3">
          <label htmlFor="withdraw-amount" className="sr-only">Amount to withdraw in naira</label>
          <AmountField ref={inputRef} id="withdraw-amount" value={amount} onChange={setAmount} invalid={tooLow || tooHigh} disabled={busy} describedBy="withdraw-hint" />
          <p id="withdraw-hint" className="mt-2 min-h-[18px] px-1 text-xs text-red-600" role={hint ? "alert" : undefined}>
            {hint}
          </p>

          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {chips.map((c) => (
                <Chip key={c.label} active={value === c.v} disabled={busy} onClick={() => setAmount(amountToInput(c.v))}>
                  {c.label}
                </Chip>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-[13px]" aria-live="polite">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Amount</span>
              <span className="font-semibold tabular-nums text-slate-800">{inRange ? formatNaira(value) : "—"}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Transfer fee</span>
              <span className="font-semibold tabular-nums text-slate-800">
                {quoting ? <span className="inline-block h-3.5 w-12 animate-pulse rounded bg-slate-200 align-middle" /> : quoteFresh ? `−${formatNaira(quote.fee)}` : "—"}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
              <span className="font-semibold text-slate-700">You will receive</span>
              <span className="text-base font-extrabold tabular-nums text-slate-900">
                {quoting ? <span className="inline-block h-4 w-20 animate-pulse rounded bg-slate-200 align-middle" /> : quoteFresh ? formatNaira(quote.netAmount) : "—"}
              </span>
            </div>
          </div>
          {quoteFresh && !coversFee && <p className="mt-2 px-1 text-xs text-red-600" role="alert">This amount doesn&apos;t cover the transfer fee. Try a larger amount.</p>}

          {shownError && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-[13px] text-red-700" role="alert">
              {shownError}
              {needsBank && (
                <Link to={BANK_PAGE} className="mt-2 inline-flex items-center gap-1.5 font-bold text-red-800 underline underline-offset-2">
                  <Landmark size={14} /> Add a bank account
                </Link>
              )}
            </div>
          )}

          <p className="mt-4 px-1 text-xs leading-relaxed text-slate-400">
            Money is sent to the bank account on your profile. The fee is taken from the amount you withdraw.
          </p>
        </form>
      )}
    </Sheet>
  );
}
