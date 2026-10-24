import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Clock3, Plus, ReceiptText, RotateCcw, Wallet, Zap } from "lucide-react";
import Navbar from "../../components/dashboard-comopnents/Navbar";
import Sidebar from "../../components/dashboard-comopnents/Sidebar";
import WalletHero, { HeroButton } from "../../components/wallet/WalletHero";
import TransactionsList from "../../components/wallet/TransactionsList";
import RefundsList from "../../components/wallet/RefundsList";
import TopUpSheet from "../../components/wallet/TopUpSheet";
import { Card, CardHeader, cx } from "../../components/wallet/ui";
import { useToast } from "../../components/wallet/Toast";
import { usePagedList, useWallet } from "../../hooks/useWallet";
import { walletApi } from "../../api/wallet";
import { formatNairaShort } from "../../lib/utils/money";

const QUICK = [1000, 2000, 5000, 10000];
const TABS = [
  { id: "transactions", label: "Transactions", icon: ReceiptText },
  { id: "refunds", label: "Refunds", icon: RotateCcw },
];

const STEPS = [
  { icon: Wallet, title: "You pay", text: "From your wallet or card when a mechanic accepts the job." },
  { icon: Clock3, title: "Held in escrow", text: "The mechanic is paid only after the settlement window (24 hours by default)." },
  { icon: BadgeCheck, title: "Refund if needed", text: "Not happy? Request a refund before the money is released." },
];

export default function CustomerWalletPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [tab, setTab] = useState("transactions");
  const [topUp, setTopUp] = useState({ open: false, amount: undefined });
  const { node: toastNode } = useToast();

  const wallet = useWallet();
  const tx = usePagedList(walletApi.transactions, { limit: 15 });
  const refunds = usePagedList(walletApi.refunds, { limit: 15 });

  const openTopUp = (amount) => setTopUp({ open: true, amount });

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 z-50 h-screen w-64 transform bg-white transition-transform duration-300 lg:translate-x-0 ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar />
      </div>
      {openSidebar && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setOpenSidebar(false)} />}

      <div className="flex min-h-screen min-w-0 flex-col lg:ml-64">
        <Navbar toggleSidebar={() => setOpenSidebar((o) => !o)} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6 sm:py-8">
          <header className="mb-5 sm:mb-6">
            <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 sm:text-2xl">Wallet</h1>
            <p className="mt-1 text-[13px] text-slate-500">Top up once, pay for services in a tap, and track every naira.</p>
          </header>

          <WalletHero
            label="Available balance"
            wallet={wallet.data}
            loading={wallet.isLoading}
            error={wallet.isError && !wallet.data}
            onRetry={() => wallet.refetch()}
            actions={
              <>
                <HeroButton icon={Plus} onClick={() => openTopUp()}>Add money</HeroButton>
                <HeroButton variant="ghost" icon={ReceiptText} onClick={() => document.getElementById("wallet-activity")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                  Activity
                </HeroButton>
              </>
            }
          />

          <div className="mt-5 grid gap-5 lg:grid-cols-3 sm:mt-6 sm:gap-6">
            <Card id="wallet-activity" className="overflow-hidden lg:col-span-2">
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
                <TransactionsList
                  embedded
                  list={tx}
                  emptyAction={
                    <button onClick={() => openTopUp()} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-blue-700">
                      <Plus size={15} /> Add money
                    </button>
                  }
                />
              ) : (
                <RefundsList list={refunds} />
              )}
            </Card>

            <aside className="space-y-5 sm:space-y-6">
              <Card>
                <CardHeader title="Quick top-up" subtitle="Pick an amount to get started" right={<Zap size={18} className="text-amber-500" />} />
                <div className="grid grid-cols-2 gap-2.5 p-4 sm:p-5">
                  {QUICK.map((a) => (
                    <button
                      key={a}
                      onClick={() => openTopUp(a)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold tabular-nums text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[.98]"
                    >
                      {formatNairaShort(a)}
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <CardHeader title="How payments work" />
                <ol className="space-y-4 p-4 sm:p-5">
                  {STEPS.map(({ icon: Icon, title, text }, i) => (
                    <li key={title} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={17} /></span>
                      <div>
                        <p className="text-[13px] font-bold text-slate-900">{i + 1}. {title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="border-t border-slate-100 px-4 py-3 sm:px-5">
                  <Link to="/payment-history" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-blue-700 hover:underline">
                    View payment history <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>
            </aside>
          </div>
        </main>
      </div>

      <TopUpSheet open={topUp.open} initialAmount={topUp.amount} onClose={() => setTopUp({ open: false })} />
      {toastNode}
    </div>
  );
}
