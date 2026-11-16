import React from "react";

const TONE = {
    // success
    verified: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    approved: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    completed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    paid: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    accepted: "bg-emerald-50 text-emerald-700 ring-emerald-100",

    // warning
    pending: "bg-amber-50 text-amber-700 ring-amber-100",
    in_review: "bg-amber-50 text-amber-700 ring-amber-100",
    en_route: "bg-amber-50 text-amber-700 ring-amber-100",
    in_progress: "bg-blue-50 text-blue-700 ring-blue-100",

    // danger
    rejected: "bg-red-50 text-red-600 ring-red-100",
    cancelled: "bg-red-50 text-red-600 ring-red-100",
    failed: "bg-red-50 text-red-600 ring-red-100",
    suspended: "bg-red-50 text-red-600 ring-red-100",
    deactivated: "bg-slate-100 text-slate-600 ring-slate-200",

    // neutral
    default: "bg-slate-50 text-slate-600 ring-slate-100",
};

const normalize = (v = "") =>
    String(v)
        .toLowerCase()
        .replace(/[\s-]+/g, "_");

export default function StatusPill({ status, className = "" }) {
    if (status === null || status === undefined || status === "") {
        return (
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-100">
                —
            </span>
        );
    }
    const key = normalize(status);
    const tone = TONE[key] || TONE.default;
    const label = String(status).replace(/_/g, " ").toLowerCase();

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ring-1 ${tone} ${className}`}
        >
            {label}
        </span>
    );
}
