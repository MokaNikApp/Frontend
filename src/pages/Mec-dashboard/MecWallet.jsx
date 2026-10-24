import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Banknote, CalendarClock, Hourglass, Landmark, ReceiptText } from "lucide-react";
import Sidebar from "../../components/Mec-Dashboard/Sidebar";
import Topbar from "../../components/Mec-Dashboard/Topbar";
import WalletHero, { HeroButton } from "../../components/wallet/WalletHero";
import TransactionsList from "../../components/wallet/TransactionsList";
import PayoutsList from "../../components/wallet/PayoutsList";
import PendingEarnings from "../../components/wallet/PendingEarnings";
import WithdrawSheet, { BANK_PAGE } from "../../components/wallet/WithdrawSheet";
import { Card, CardHeader, Skeleton, cx } from "../../components/wallet/ui";
import { useToast } from "../../components/wallet/Toast";
import { WALLET_KEY, ESCROW_KEY, useNow, usePagedList, usePendingEscrow, useWallet } from "../../hooks/useWallet";
import { useQueryClient } from "@tanstack/react-query";
import { walletApi } from "../../api/wallet";
import { formatNaira } from "../../lib/utils/money";
import { releaseIn } from "../../lib/utils/walletMeta";

const TABS = [
  { id: "transactions", label: "Transactions", icon: ReceiptText },
  { id: "payouts", label: "Withdrawals", icon: Landmark },
];

const Stat = ({ icon: Icon, label, value, sub, tone, loading }) => (
  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-4">
    <div className="flex items-center gap-2.5">
      <span className={cx("flex h-9 w-9 items-center justify-center rounded-xl", tone)}><Icon size={17} /></span>
      <p className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
    {loading ? (
      <Skeleton className="mt-3 h-6 w-28" />
    ) : (
      <p className="mt-3 truncate text-xl font-extrabold tabular-nums tracking-tight text-slate-900">{value}</p>
    )}
    <p className="mt-0.5 truncate text-xs text-slate-500">{sub}</p>
  </div>
);

export default function MecWallet() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [tab, setTab] = useState("transactions");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const { show, node: toastNode } = useToast();
  const now = useNow(30_000);

  const wallet = useWallet();
  const escrow = usePendingEscrow();
  const tx = usePagedList(walletApi.transactions, { limit: 15 });
  // payouts still "processing" are re-checked every 10s (the API settles them within ~15 min)
  const payouts = usePagedList(walletApi.payouts, {
    limit: 15,
    pollMs: 10_000,
    shouldPoll: (items) => items.some((p) => p.status === "processing"),
  });

  const pending = escrow.data?.totalPending ?? 0;
  const heldCount = escrow.data?.items?.length ?? 0;
  const nextRelease = useMemo(() => {
    const times = (escrow.data?.items || []).filter((i) => i.status === "held").map((i) => new Date(i.releaseAt).getTime()).filter(Boolean);
    return times.length ? Math.min(...times) : null;
  }, [escrow.data]);
  const inFlight = payouts.items.filter((p) => p.status === "processing").reduce((s, p) => s + Number(p.amount || 0), 0);
  const balance = wallet.data?.balance ?? 0;

  const refreshAll = () => {
    qc.invalidateQueries({ queryKey: WALLET_KEY });
    qc.invalidateQueries({ queryKey: ESCROW_KEY });
    tx.reload(true);
    payouts.reload(true);
  };

  const onWithdrawn = (p) => {
    refreshAll();
    setTab("payouts");
    if (p.status === "failed") show("Withdrawal failed. The money is back in your wallet.", "error");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen((o) => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar toggleSidebar={() => setIsOpen((o) => !o)} isOnline={isOnline} setIsOnline={setIsOnline} />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-4 py-5 pb-12 sm:px-6 sm:py-8">
            <header className="mb-5 sm:mb-6">
              <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 sm:text-2xl">Wallet</h1>
              <p className="mt-1 text-[13px] text-slate-500">Your earnings, escrow and withdrawals in one place.</p>
            </header>

            <WalletHero
              tone="mechanic"
              label="Available to withdraw"
              wallet={wallet.data}
              loading={wallet.isLoading}
              error={wallet.isError && !wallet.data}
              onRetry={() => wallet.refetch()}
              footer={
                !escrow.isLoading && pending > 0 ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-blue-50 ring-1 ring-inset ring-white/20">
                    <Hourglass size={13} /> {formatNaira(pending)} on its way from escrow
                  </span>
                ) : null
              }
              actions={
                <>
                  <HeroButton icon={ArrowUpRight} onClick={() => setWithdrawOpen(true)} disabled={wallet.isLoading || balance <= 0}>
                    Withdraw
                  </HeroButton>
                  <HeroButton variant="ghost" icon={Landmark} onClick={() => navigate(BANK_PAGE)}>
                    Bank account
                  </HeroButton>
                </>
              }
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
              <Stat
                icon={Hourglass}
                tone="bg-blue-50 text-blue-600"
                label="In escrow"
                value={formatNaira(pending)}
                sub={heldCount ? `${heldCount} job${heldCount > 1 ? "s" : ""} awaiting release` : "No jobs awaiting release"}
                loading={escrow.isLoading}
              />
              <Stat
                icon={CalendarClock}
                tone="bg-amber-50 text-amber-600"
                label="Next release"
                value={nextRelease ? releaseIn(new Date(nextRelease).toISOString(), now).replace(/^in /, "") : "—"}
                sub={nextRelease ? "Until earnings land" : "Nothing scheduled"}
                loading={escrow.isLoading}
              />
              <div className="col-span-2 sm:col-span-1">
                <Stat
                  icon={Banknote}
                  tone="bg-emerald-50 text-emerald-600"
                  label="In transfer"
                  value={formatNaira(inFlight)}
                  sub={inFlight > 0 ? "Withdrawal on its way to your bank" : "No withdrawals in progress"}
                  loading={payouts.loading}
                />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-3">
              <Card className="overflow-hidden lg:col-span-2">
                <div className="flex gap-1 border-b border-slate-100 px-3 pt-3 sm:px-4" role="tablist">
                  {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      role="tab"
                      aria-selected={tab === id}
                      onClick={() => setTab(id)}
                      className={cx(
                        "-mb-px flex items-center gap-2 border-b-2 px-3 pb-3 pt-1.5 text-[13px] font-bold transition-colors",
                        tab === id ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"
                      )}
                    >
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>
                {tab === "transactions" ? (
                  <TransactionsList embedded list={tx} />
                ) : (
                  <PayoutsList
                    list={payouts}
                    emptyAction={
                      <button onClick={() => setWithdrawOpen(true)} disabled={balance <= 0} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-blue-700 disabled:opacity-50">
                        <ArrowUpRight size={15} /> Withdraw
                      </button>
                    }
                  />
                )}
              </Card>

              <aside className="space-y-5 sm:space-y-6">
                <PendingEarnings query={escrow} />
                <Card>
                  <CardHeader title="Withdrawing to your bank" />
                  <p className="px-4 pb-4 pt-2 text-xs leading-relaxed text-slate-500 sm:px-5 sm:pb-5">
                    Withdrawals go to the bank account saved on your profile. The transfer fee is shown before you confirm and is taken from the amount you withdraw.
                  </p>
                  <div className="border-t border-slate-100 px-4 py-3 sm:px-5">
                    <button onClick={() => navigate(BANK_PAGE)} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-blue-700 hover:underline">
                      Manage payout account <ArrowUpRight size={14} />
                    </button>
                  </div>
                </Card>
              </aside>
            </div>
          </div>
        </main>
      </div>

      <WithdrawSheet open={withdrawOpen} onClose={() => setWithdrawOpen(false)} balance={balance} onDone={onWithdrawn} />
      {toastNode}
    </div>
  );
}
