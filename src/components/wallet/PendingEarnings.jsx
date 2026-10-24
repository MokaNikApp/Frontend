import { Hourglass, Clock } from "lucide-react";
import { formatNaira } from "../../lib/utils/money";
import { ESCROW_STATUS, dateTimeLabel, releaseIn, shortId } from "../../lib/utils/walletMeta";
import { useNow } from "../../hooks/useWallet";
import { Badge, Card, CardHeader, EmptyState, ErrorState, Skeleton } from "./ui";

/** Mechanic: customer money still in escrow, with a live "releases in …" countdown. */
export default function PendingEarnings({ query }) {
  const now = useNow(30_000);
  const { data, isLoading, error, refetch } = query;
  const items = data?.items || [];

  return (
    <Card>
      <CardHeader
        title="Pending earnings"
        subtitle="Released to your wallet after the settlement window"
        right={
          !isLoading && !error && (
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Total</p>
              <p className="text-sm font-extrabold tabular-nums text-slate-900">{formatNaira(data?.totalPending)}</p>
            </div>
          )
        }
      />
      {isLoading ? (
        <div className="space-y-3 p-4 sm:p-5">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-[72px] !rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message="Couldn't load your pending earnings." onRetry={refetch} />
      ) : items.length === 0 ? (
        <EmptyState icon={Hourglass} title="Nothing in escrow" text="When a customer pays for one of your jobs, the money waits here until it's released to you." />
      ) : (
        <ul className="space-y-2.5 p-4 sm:p-5">
          {items.map((it) => {
            const st = ESCROW_STATUS[it.status] || ESCROW_STATUS.held;
            const frozen = it.status === "frozen";
            return (
              <li key={it.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-slate-800">Job #{shortId(it.jobId)}</p>
                    <div className="mt-1.5"><Badge tone={st.tone}>{st.label}</Badge></div>
                  </div>
                  <p className="text-sm font-extrabold tabular-nums text-slate-900">{formatNaira(it.amount)}</p>
                </div>
                <p className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock size={12} className="shrink-0" />
                  {frozen ? (
                    "On hold while a refund request is reviewed"
                  ) : (
                    <span>
                      Releases <strong className="font-semibold text-slate-700">{releaseIn(it.releaseAt, now)}</strong>
                      <span className="text-slate-400"> · {dateTimeLabel(it.releaseAt)}</span>
                    </span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
