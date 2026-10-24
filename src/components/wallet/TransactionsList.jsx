import { useMemo, useState } from "react";
import { ChevronDown, ReceiptText } from "lucide-react";
import { formatNaira } from "../../lib/utils/money";
import { dateTimeLabel, dayLabel, shortRef, timeLabel, txMeta } from "../../lib/utils/walletMeta";
import { Card, CardHeader, CopyButton, EmptyState, ErrorState, Skeleton, Spinner, cx } from "./ui";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "credit", label: "Money in" },
  { id: "debit", label: "Money out" },
];

const Row = ({ tx }) => {
  const [open, setOpen] = useState(false);
  const credit = tx.direction === "credit";
  const { label, icon: Icon } = txMeta(tx.type, tx.direction);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-slate-50 sm:px-3"
      >
        <span
          className={cx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            credit ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
          )}
        >
          <Icon size={18} strokeWidth={2.2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-slate-900">{label}</span>
          <span className="block truncate text-xs text-slate-500">
            {timeLabel(tx.createdAt)}
            {tx.reference ? ` · ${shortRef(tx.reference)}` : ""}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className={cx("block text-sm font-bold tabular-nums", credit ? "text-emerald-600" : "text-slate-900")}>
            {credit ? "+" : "−"}
            {formatNaira(tx.amount)}
          </span>
          <span className="block text-[11px] tabular-nums text-slate-400">Bal {formatNaira(tx.balanceAfter)}</span>
        </span>
        <ChevronDown size={15} className={cx("shrink-0 text-slate-300 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <dl className="mx-2 mb-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-xl bg-slate-50 p-3.5 text-xs sm:mx-3">
          <dt className="text-slate-400">Date</dt>
          <dd className="text-right font-medium text-slate-700">{dateTimeLabel(tx.createdAt)}</dd>
          <dt className="text-slate-400">Balance after</dt>
          <dd className="text-right font-medium tabular-nums text-slate-700">{formatNaira(tx.balanceAfter)}</dd>
          {tx.reference && (
            <>
              <dt className="self-center text-slate-400">Reference</dt>
              <dd className="flex items-center justify-end gap-2">
                <span className="break-all font-mono text-[11px] text-slate-700">{tx.reference}</span>
                <CopyButton value={tx.reference} label="Copy reference" />
              </dd>
            </>
          )}
        </dl>
      )}
    </li>
  );
};

/** `list` is the result of usePagedList(walletApi.transactions). */
export default function TransactionsList({ list, emptyAction, embedded = false }) {
  const [filter, setFilter] = useState("all");

  const groups = useMemo(() => {
    const shown = list.items.filter((t) => filter === "all" || t.direction === filter);
    const map = new Map();
    shown.forEach((t) => {
      const k = dayLabel(t.createdAt);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(t);
    });
    return [...map.entries()];
  }, [list.items, filter]);

  const body = (
    <>
      {list.loading ? (
        <ul className="space-y-1 p-3 sm:p-4" aria-busy="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3 px-2 py-3">
              <Skeleton className="h-10 w-10 !rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-44" />
              </div>
              <Skeleton className="h-4 w-20" />
            </li>
          ))}
        </ul>
      ) : list.error && list.items.length === 0 ? (
        <ErrorState message={list.error} onRetry={() => list.reload()} />
      ) : list.items.length === 0 ? (
        <EmptyState icon={ReceiptText} title="No transactions yet" text="Every top-up, payment, refund and withdrawal will show up here." action={emptyAction} />
      ) : groups.length === 0 ? (
        <p className="px-6 py-10 text-center text-[13px] text-slate-500">
          Nothing in this filter{list.hasMore ? " yet. Load more to look further back." : "."}
        </p>
      ) : (
        <div className="px-2 pb-2 sm:px-3">
          {groups.map(([day, txs]) => (
            <div key={day}>
              <h3 className="sticky top-0 z-[1] bg-white/95 px-2 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 backdrop-blur sm:px-3">
                {day}
              </h3>
              <ul className="divide-y divide-slate-100/80">
                {txs.map((t) => (
                  <Row key={t.id} tx={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {list.error && list.items.length > 0 && (
        <p className="px-5 pb-3 text-center text-xs text-red-600" role="alert">{list.error}</p>
      )}
      {list.hasMore && !list.loading && (
        <div className="border-t border-slate-100 p-3 text-center">
          <button
            onClick={list.loadMore}
            disabled={list.loadingMore}
            className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-60"
          >
            {list.loadingMore ? <Spinner size={14} /> : null}
            {list.loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );

  const chips = (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Filter transactions">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          role="tab"
          aria-selected={filter === f.id}
          onClick={() => setFilter(f.id)}
          className={cx(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
            filter === f.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div>
        <div className="flex justify-end px-4 pt-3 sm:px-5">{chips}</div>
        {body}
      </div>
    );
  }
  return (
    <Card>
      <CardHeader title="Transactions" subtitle="Newest first" right={chips} />
      {body}
    </Card>
  );
}
