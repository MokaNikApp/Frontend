import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, RefreshCw, XCircle } from "lucide-react";
import { walletApi } from "../../api/wallet";
import { WALLET_KEY } from "../../hooks/useWallet";
import { formatNaira } from "../../lib/utils/money";
import { dateTimeLabel } from "../../lib/utils/walletMeta";
import { getApiError, sleep } from "../../lib/utils/apiHelpers";
import { Spinner } from "../../components/wallet/ui";
import "../../components/wallet/wallet.css";

const POLL_EVERY = 3000;
const POLL_MAX = 10; // ~30 seconds, as the API guide recommends

/**
 * Paystack returns here after a wallet top-up: /wallet/top-up/verify?reference=…
 * We never trust the redirect alone: the payment is verified with the API,
 * polling while it is still "pending".
 */
export default function WalletTopUpVerifyPage() {
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("trxref");
  const qc = useQueryClient();
  const [state, setState] = useState(reference ? { phase: "verifying" } : { phase: "missing" });
  const [attempt, setAttempt] = useState(0);
  const running = useRef(false);

  useEffect(() => {
    if (!reference) return undefined;
    let cancelled = false;
    running.current = true;
    setState({ phase: "verifying" });

    (async () => {
      for (let i = 0; i < POLL_MAX; i++) {
        try {
          const p = await walletApi.verifyPayment(reference);
          if (cancelled) return;
          if (p.status === "success") {
            qc.invalidateQueries({ queryKey: WALLET_KEY });
            setState({ phase: "success", payment: p });
            return;
          }
          if (p.status === "failed") return setState({ phase: "failed", payment: p });
          if (p.status === "refunded") return setState({ phase: "failed", payment: p });
          // pending / initiated -> keep polling
        } catch (err) {
          if (cancelled) return;
          const code = err?.response?.status;
          if (code === 401 || code === 403 || code === 404) return setState({ phase: "error", message: getApiError(err) });
          // transient network error: keep trying until the limit
        }
        await sleep(POLL_EVERY);
      }
      if (!cancelled) setState({ phase: "slow" });
    })();

    return () => {
      cancelled = true;
      running.current = false;
    };
  }, [reference, attempt, qc]);

  const { phase, payment, message } = state;

  const view = {
    verifying: {
      tone: "bg-blue-50 text-blue-600",
      icon: <Spinner size={30} />,
      title: "Confirming your payment…",
      text: "This usually takes a few seconds. Please don't close this page.",
    },
    success: {
      tone: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path className="wallet-check" d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      ),
      title: "Wallet topped up",
      text: "Your money is in your wallet and ready to use.",
    },
    failed: {
      tone: "bg-red-50 text-red-500",
      icon: <XCircle size={32} />,
      title: "Payment didn't go through",
      text: "You haven't been charged for this attempt. You can try again.",
    },
    slow: {
      tone: "bg-amber-50 text-amber-600",
      icon: <AlertTriangle size={30} />,
      title: "Still waiting on the bank",
      text: "Your payment hasn't been confirmed yet. If you were charged, your balance will update automatically once it clears.",
    },
    error: { tone: "bg-red-50 text-red-500", icon: <XCircle size={32} />, title: "We couldn't verify this payment", text: message },
    missing: {
      tone: "bg-amber-50 text-amber-600",
      icon: <AlertTriangle size={30} />,
      title: "No payment reference",
      text: "This page needs a payment reference. If you cancelled the payment, no money was taken.",
    },
  }[phase];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/60 to-slate-100 px-4 py-10">
      <div className="w-full max-w-sm rounded-[28px] border border-slate-200/80 bg-white p-7 text-center shadow-xl shadow-slate-900/5" aria-live="polite">
        <div className={`mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full ${view.tone}`}>{view.icon}</div>
        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-slate-900">{view.title}</h1>
        <p className="mx-auto mt-2 max-w-[280px] text-[13px] leading-relaxed text-slate-500">{view.text}</p>

        {phase === "success" && payment && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Amount added</p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums tracking-tight text-slate-900">{formatNaira(payment.totalAmount)}</p>
            <p className="mt-2 text-xs text-slate-500">{dateTimeLabel(payment.paidAt || payment.createdAt)}</p>
            <p className="mt-1 break-all font-mono text-[11px] text-slate-400">{payment.reference}</p>
          </div>
        )}

        <div className="mt-6 space-y-2.5">
          {(phase === "failed" || phase === "slow") && (
            <button
              onClick={() => setAttempt((a) => a + 1)}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold ${phase === "slow" ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
            >
              <RefreshCw size={15} /> {phase === "slow" ? "Check again" : "Check status again"}
            </button>
          )}
          <Link
            to="/wallet"
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold ${phase === "success" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
          >
            {phase === "failed" ? "Back to wallet to retry" : "Go to my wallet"} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
