// Labels / colours for every enum the payments API returns.

import {
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Receipt,
  RotateCcw,
  Briefcase,
  Percent,
  Landmark,
  Undo2,
  CircleHelp,
} from "lucide-react";

/** Ledger `type` -> label + icon. `direction` decides colour/sign, not the type. */
export const TX_TYPES = {
  topup: { label: "Wallet top-up", icon: Plus },
  job_payment: { label: "Job payment", icon: Receipt },
  refund: { label: "Refund", icon: RotateCcw },
  escrow_release: { label: "Job earnings", icon: Briefcase },
  commission: { label: "Platform commission", icon: Percent },
  unmatched_charge_credit: { label: "Payment credit", icon: ArrowDownLeft },
  payout: { label: "Withdrawal", icon: Landmark },
  payout_reversal: { label: "Withdrawal returned", icon: Undo2 },
  payout_fee: { label: "Withdrawal fee", icon: Percent },
  payout_fee_reversal: { label: "Withdrawal fee returned", icon: Undo2 },
};

export const txMeta = (type, direction) => {
  const m = TX_TYPES[type] || {
    label: String(type || "Transaction").replace(/_/g, " "),
    icon: direction === "credit" ? ArrowDownLeft : direction === "debit" ? ArrowUpRight : CircleHelp,
  };
  return m;
};

/** Shared badge palette */
export const TONES = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/15",
  red: "bg-red-50 text-red-700 ring-red-600/15",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
};

export const PAYOUT_STATUS = {
  processing: { label: "Processing", tone: "blue", pulse: true },
  completed: { label: "Completed", tone: "green" },
  failed: { label: "Failed", tone: "red" },
};

export const REFUND_STATUS = {
  requested: { label: "Under review", tone: "amber" },
  approved: { label: "Approved", tone: "blue" },
  processing: { label: "Processing", tone: "blue", pulse: true },
  completed: { label: "Refunded", tone: "green" },
  rejected: { label: "Rejected", tone: "red" },
  failed: { label: "Failed", tone: "red" },
};

export const ESCROW_STATUS = {
  held: { label: "In escrow", tone: "blue" },
  frozen: { label: "Refund under review", tone: "amber" },
  released: { label: "Released", tone: "green" },
  refunded: { label: "Refunded", tone: "slate" },
};

// ── dates ───────────────────────────────────────────────────────────────────
const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const dayLabel = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Earlier";
  const now = new Date();
  const y = new Date();
  y.setDate(now.getDate() - 1);
  if (sameDay(d, now)) return "Today";
  if (sameDay(d, y)) return "Yesterday";
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: d.getFullYear() === now.getFullYear() ? undefined : "numeric" });
};

export const timeLabel = (iso) =>
  iso ? new Date(iso).toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit", hour12: true }).replace(/\s?([ap])m$/i, (_, x) => ` ${x.toLowerCase()}m`) : "";

export const dateTimeLabel = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })
    : "—";

/** "in 4h 12m" / "in 25m" / "any moment now" */
export const releaseIn = (iso, now = Date.now()) => {
  const ms = new Date(iso).getTime() - now;
  if (Number.isNaN(ms)) return "";
  if (ms <= 60_000) return "any moment now";
  const mins = Math.round(ms / 60_000);
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  if (d) return `in ${d}d ${h}h`;
  if (h) return `in ${h}h ${m}m`;
  return `in ${m}m`;
};

export const shortId = (id = "") => String(id).slice(0, 8);
export const shortRef = (r = "") => (r.length > 20 ? `${r.slice(0, 10)}…${r.slice(-6)}` : r);
