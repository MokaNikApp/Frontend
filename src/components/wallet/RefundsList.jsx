import { RotateCcw } from "lucide-react";
import { formatNaira } from "../../lib/utils/money";
import { REFUND_STATUS, dateTimeLabel, shortId } from "../../lib/utils/walletMeta";
import { Badge, EmptyState, ErrorState, Skeleton, Spinner } from "./ui";

/** `list` = usePagedList(walletApi.refunds). */
export default function RefundsList({ list }) {
  if (list.loading)
    return (
      <ul className="space-y-3 p-4" aria-busy="true">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 !rounded-xl" />)}
      </ul>
    );
  if (list.error && list.items.length === 0) return <ErrorState message={list.error} onRetry={() => list.reload()} />;
  if (list.items.length === 0)
    return <EmptyState icon={RotateCcw} title="No refund requests" text="If a job doesn't go as planned, you can request a refund while the payment is still in escrow." />;

  return (
    <>
      <ul className="space-y-2.5 p-4 sm:p-5">
        {list.items.map((r) => {
          const st = REFUND_STATUS[r.status] || REFUND_STATUS.requested;
          const amount = r.approvedAmount ?? r.requestedAmount;
          return (
            <li key={r.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800">
                    Job #{shortId(r.jobId)} <span className="font-normal text-slate-400">· {r.method === "wallet" ? "to wallet" : "to card"}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{dateTimeLabel(r.createdAt)}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-extrabold tabular-nums text-slate-900">{formatNaira(amount)}</p>
                  {r.approvedAmount != null && r.approvedAmount !== r.requestedAmount && (
                    <p className="text-[11px] text-slate-400 line-through tabular-nums">{formatNaira(r.requestedAmount)}</p>
                  )}
                </div>
              </div>
              <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600">“{r.reason}”</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <Badge tone={st.tone} pulse={st.pulse}>{st.label}</Badge>
                {r.status === "processing" && <span className="text-[11px] text-slate-400">Card refunds can take a few days</span>}
              </div>
              {r.reviewNote && <p className="mt-2 rounded-lg bg-white px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-100"><strong className="font-semibold">Note:</strong> {r.reviewNote}</p>}
              {r.status === "failed" && r.failureReason && <p className="mt-2 text-xs text-red-600">{r.failureReason}</p>}
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
