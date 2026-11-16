import React from "react";
import {
    Ban,
    CalendarCheck,
    CheckCircle2,
    CreditCard,
    FileText,
    Pause,
    RefreshCcw,
    ShieldCheck,
    Wrench,
} from "lucide-react";

export function parseAction(action = "") {
    const a = action.toLowerCase();
    if (a.includes("reject"))
        return { verb: "rejected", tone: "red", icon: Ban };
    if (a.includes("approve"))
        return { verb: "approved", tone: "emerald", icon: CheckCircle2 };
    if (a.includes("suspend"))
        return { verb: "suspended", tone: "amber", icon: Pause };
    if (a.includes("reactivat"))
        return { verb: "reactivated", tone: "emerald", icon: RefreshCcw };
    if (a.includes("verif"))
        return { verb: "verified", tone: "emerald", icon: ShieldCheck };
    if (a.includes("deactivat"))
        return { verb: "deactivated", tone: "red", icon: Ban };
    if (a.includes("refund"))
        return { verb: "refunded", tone: "amber", icon: CreditCard };
    if (a.includes("reassign"))
        return { verb: "reassigned", tone: "blue", icon: Wrench };
    return { verb: action, tone: "slate", icon: FileText };
}

const TONES = {
    emerald: {
        ring: "ring-emerald-200",
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        pill: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    red: {
        ring: "ring-red-200",
        bg: "bg-red-50",
        text: "text-red-600",
        pill: "bg-red-50 text-red-600 ring-red-100",
    },
    amber: {
        ring: "ring-amber-200",
        bg: "bg-amber-50",
        text: "text-amber-600",
        pill: "bg-amber-50 text-amber-700 ring-amber-100",
    },
    blue: {
        ring: "ring-blue-200",
        bg: "bg-blue-50",
        text: "text-blue-600",
        pill: "bg-blue-50 text-blue-700 ring-blue-100",
    },
    slate: {
        ring: "ring-slate-200",
        bg: "bg-[#f6f7fb]",
        text: "text-[#64748b]",
        pill: "bg-[#f6f7fb] text-[#334155] ring-[#e8ecf3]",
    },
};

export default function AuditActionNode({ action, size = "md" }) {
    const { tone, icon: Icon } = parseAction(action);
    const t = TONES[tone];
    const dims = size === "lg" ? "h-9 w-9" : "h-8 w-8";
    const iconSize = size === "lg" ? 16 : 14;

    return (
        <span
            className={`relative z-10 flex ${dims} shrink-0 items-center justify-center rounded-full ring-4 ring-white ${t.bg} ${t.text}`}
        >
            <Icon size={iconSize} />
        </span>
    );
}

export function actionTone(action) {
    return TONES[parseAction(action).tone];
}
