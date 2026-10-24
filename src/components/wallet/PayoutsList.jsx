import { Landmark, TriangleAlert } from "lucide-react";
import { formatNaira } from "../../lib/utils/money";
import { PAYOUT_STATUS, dateTimeLabel } from "../../lib/utils/walletMeta";
import { Badge, EmptyState, ErrorState, Skeleton, Spinner } from "./ui";

/** `list` = usePagedList(walletApi.payouts). Processing payouts are polled by the hook. */
export default function PayoutsList({ list, emptyAction }) {
  if (list.loading) {
    return (
      <ul className="space-y-1 p-3 sm:p-4" aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="flex items-center gap-3 px-2 py-3">
            <Skeleton className="h-10 w-10 !rounded-xl" />
            <div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-28" /><Skeleton className="h-3 w-40" /></div>
            <Skeleton className="h-4 w-20" />
          </li>
        ))}
      </ul>
    );
  }
  if (list.error && list.items.length === 0) return <ErrorState message={list.error} onRetry={() => list.reload()} />;
  if (list.items.length === 0)
    return <EmptyState icon={Landmark} title="No withdrawals yet" text="When you withdraw earnings to your bank account, each transfer is tracked here." action={emptyAction} />;

  return (
    <>
      <ul className="divide-y divide-slate-100/80 px-2 py-2 sm:px-3">
        {list.items.map((p) => {
          const st = PAYOUT_STATUS[p.status] || PAYOUT_STATUS.processing;
          const failed = p.status === "failed";
          return (
            <li key={p.id} className="flex items-start gap-3 px-2 py-3.5 sm:px-3">
              <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${failed ? "bg-red-50 text-red-500" : p.status === "processing" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"}`}>
                {failed ? <TriangleAlert size={18} /> : p.status === "processing" ? <Spinner size={17} /> : <Landmark size={18} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {p.accountName || "Bank transfer"} <span className="font-normal text-slate-400">· ****{p.accountLast4}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{dateTimeLabel(p.createdAt)}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold tabular-nums text-slate-900">{formatNaira(p.netAmount)}</p>
                    <p className="text-[11px] tabular-nums text-slate-400">of {formatNaira(p.amount)}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Badge tone={st.tone} pulse={st.pulse}>{st.label}</Badge>
                  <span className="text-[11px] text-slate-400">Fee {formatNaira(p.fee)}</span>
                </div>
                {failed && (
                  <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-700">
                    {p.failureReason || "The transfer failed."} The money was returned to your wallet.
                  </p>
                )}
                {p.status === "processing" && (
                  <p className="mt-2 text-xs text-slate-500">Transfer in progress. This can take a few minutes.</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {list.hasMore && (
        <div className="border-t border-slate-100 p-3 text-center">
          <button onClick={list.loadMore} disabled={list.loadingMore} className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-60">
            {list.loadingMore && <Spinner size={14} />} {list.loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
