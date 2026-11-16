import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Banknote,
    CreditCard,
    Hash,
    Info,
    Receipt,
    User,
} from "lucide-react";
import StatusPill from "./StatusPill";

const naira = (n) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(Number(n) || 0);

export default function PaymentDetailPanel({ payment }) {
    if (!payment) {
        return (
            <div className="admin-card p-6 text-sm text-[#64748b]">
                Loading payment details…
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Amount hero */}
            <div className="admin-card p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                            Amount
                        </p>
                        <p className="mt-1 text-3xl font-semibold tabular-nums text-[#0f172a]">
                            {naira(payment.amount)}
                        </p>
                        <p className="mt-1 text-xs uppercase text-[#64748b]">
                            {payment.currency || "NGN"}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <StatusPill status={payment.status} />
                        {payment.channel && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#f6f7fb] px-2.5 py-0.5 text-[11px] font-medium capitalize text-[#334155] ring-1 ring-[#e8ecf3]">
                                <CreditCard size={11} />
                                {payment.channel.replace(/_/g, " ")}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Payer & payee */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Parties
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <PartyCard
                        role="Payer"
                        party={payment.payer}
                        link={
                            payment.payer?.id
                                ? `/admin/users/${payment.payer.id}`
                                : null
                        }
                    />
                    <PartyCard
                        role="Payee"
                        party={payment.payee}
                        link={null}
                        empty={!payment.payee}
                    />
                </div>
            </div>

            {/* Breakdown */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Breakdown
                </h2>
                <ul className="mt-4 space-y-2 text-sm">
                    <Row label="Total" value={naira(payment.amount)} bold />
                    <Row
                        label="Platform fee"
                        value={naira(payment.platformFee)}
                    />
                    <Row
                        label="Provider fee"
                        value={naira(payment.providerFee)}
                    />
                    {Number(payment.refundedAmount) > 0 && (
                        <Row
                            label="Refunded"
                            value={naira(payment.refundedAmount)}
                            tone="danger"
                        />
                    )}
                </ul>
            </div>

            {/* Reference / gateway */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Transaction info
                </h2>
                <dl className="mt-4 space-y-3">
                    <Field
                        icon={<Hash size={12} />}
                        label="Reference"
                        value={payment.reference}
                        mono
                    />
                    {payment.paystackReference && (
                        <Field
                            icon={<Hash size={12} />}
                            label="Gateway reference"
                            value={payment.paystackReference}
                            mono
                        />
                    )}
                    {payment.purpose && (
                        <Field
                            icon={<Receipt size={12} />}
                            label="Purpose"
                            value={payment.purpose}
                        />
                    )}
                    {payment.providerSubaccountCode && (
                        <Field
                            icon={<Banknote size={12} />}
                            label="Provider subaccount"
                            value={payment.providerSubaccountCode}
                            mono
                        />
                    )}
                    {payment.paidAt && (
                        <Field
                            icon={<Banknote size={12} />}
                            label="Paid at"
                            value={new Date(payment.paidAt).toLocaleString()}
                        />
                    )}
                    {payment.failureReason && (
                        <Field
                            icon={<Info size={12} />}
                            label="Failure reason"
                            value={payment.failureReason}
                            tone="danger"
                        />
                    )}
                </dl>
                {payment.booking?.id && (
                    <Link
                        to={`/admin/bookings/${payment.booking.id}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0b1b3a] hover:underline"
                    >
                        View related booking <ArrowRight size={11} />
                    </Link>
                )}
            </div>

            {/* Gateway response & metadata */}
            {payment.gatewayResponse && (
                <div className="admin-card p-5">
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Gateway response
                    </h2>
                    <pre className="mt-3 max-h-72 overflow-auto rounded-xl bg-[#0b1b3a] p-4 text-[11px] leading-relaxed text-[#e6d6a8] font-mono whitespace-pre-wrap">
                        {JSON.stringify(payment.gatewayResponse, null, 2)}
                    </pre>
                </div>
            )}

            {payment.metadata && Object.keys(payment.metadata).length > 0 && (
                <div className="admin-card p-5">
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Metadata
                    </h2>
                    <pre className="mt-3 max-h-72 overflow-auto rounded-xl bg-[#0b1b3a] p-4 text-[11px] leading-relaxed text-[#e6d6a8] font-mono whitespace-pre-wrap">
                        {JSON.stringify(payment.metadata, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

function PartyCard({ role, party, link, empty }) {
    const name = party
        ? `${party.firstName || ""} ${party.lastName || ""}`.trim()
        : "";
    const content = (
        <div className="rounded-xl border border-[#e8ecf3] bg-white p-3.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#64748b]">
                <User size={12} />
                {role}
            </p>
            <p
                className={`mt-2 text-sm font-semibold truncate ${
                    empty ? "text-[#94a3b8] italic" : "text-[#0f172a]"
                }`}
            >
                {name || (empty ? "No payee" : "—")}
            </p>
            {party?.email && (
                <p className="truncate text-xs text-[#64748b]">{party.email}</p>
            )}
            {party?.phoneNumber && (
                <p className="truncate text-xs text-[#64748b]">
                    {party.phoneNumber}
                </p>
            )}
            {link && (
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#0b1b3a]">
                    Open <ArrowRight size={11} />
                </p>
            )}
        </div>
    );
    return link ? <Link to={link}>{content}</Link> : content;
}

function Row({ label, value, bold, tone }) {
    return (
        <li
            className={`flex items-center justify-between ${
                bold
                    ? "text-base font-semibold text-[#0f172a]"
                    : "text-[#334155]"
            }`}
        >
            <span>{label}</span>
            <span
                className={`tabular-nums ${
                    tone === "danger" ? "text-red-600" : ""
                }`}
            >
                {value}
            </span>
        </li>
    );
}

function Field({ icon, label, value, mono, tone }) {
    return (
        <div>
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                {icon}
                {label}
            </dt>
            <dd
                className={`mt-1 text-sm break-all ${
                    mono ? "font-mono text-xs" : ""
                } ${tone === "danger" ? "text-red-600" : "text-[#0f172a]"}`}
            >
                {value ?? "—"}
            </dd>
        </div>
    );
}
