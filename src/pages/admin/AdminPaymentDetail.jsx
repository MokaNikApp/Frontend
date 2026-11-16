import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Banknote, Sparkles } from "lucide-react";
import PaymentDetailPanel from "../../components/admin/PaymentDetailPanel";
import StatusPill from "../../components/admin/StatusPill";
import { useAdminPayment } from "../../hooks/admin/useAdminPayment";

const naira = (n) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(Number(n) || 0);

export default function AdminPaymentDetail() {
    const { id } = useParams();
    const { data: payment, isLoading, isError, refetch } = useAdminPayment(id);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="admin-skeleton h-32 rounded-2xl" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="admin-skeleton h-96 rounded-2xl lg:col-span-2" />
                    <div className="admin-skeleton h-96 rounded-2xl" />
                </div>
            </div>
        );
    }

    if (isError || !payment) {
        return (
            <div className="admin-card p-8 text-center">
                <p className="text-sm font-medium text-[#0f172a]">
                    Couldn't load this payment.
                </p>
                {id && (
                    <p className="mt-1 text-xs text-[#64748b]">
                        Payment ID: {id}
                    </p>
                )}
                <button
                    onClick={() => refetch()}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0b1b3a] px-6 py-6 md:px-8 md:py-7 text-white">
                <div className="absolute inset-0 admin-hero-grid opacity-60" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c9a24b]/25 blur-3xl" />
                <div className="relative">
                    <Link
                        to="/admin/payments"
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={12} /> Back to payments
                    </Link>

                    <div className="mt-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="min-w-0">
                            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-[#e6d6a8] ring-1 ring-white/15">
                                Payment
                            </p>
                            <h1 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight truncate">
                                {payment.reference || "Payment"}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <StatusPill status={payment.status} />
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs ring-1 ring-white/15">
                            <Banknote size={14} className="text-[#c9a24b]" />
                            <span className="text-slate-300">Amount</span>
                            <span className="font-semibold text-white tabular-nums">
                                {naira(payment.amount)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <PaymentDetailPanel payment={payment} />
                </div>
            </div>
        </div>
    );
}
