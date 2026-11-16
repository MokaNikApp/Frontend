import React from "react";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";

const REQUIRED_DOCS = [
    { key: "mechanic_certification", label: "Mechanic certification" },
    { key: "government_id", label: "Government ID" },
    { key: "profile_photo", label: "Profile photo" },
];

export function computeApprovalReadiness(provider) {
    const docsByType = {};
    (provider?.documents || []).forEach((d) => {
        docsByType[d.documentType] = d;
    });

    const docChecks = REQUIRED_DOCS.map((req) => {
        const doc = docsByType[req.key];
        const state = !doc
            ? "missing"
            : doc.status === "verified"
              ? "verified"
              : doc.status === "rejected"
                ? "rejected"
                : "pending";
        return { ...req, state, doc };
    });

    const allDocsVerified = docChecks.every((d) => d.state === "verified");
    const hasSpecialization = Boolean(provider?.primarySpecialization);
    const hasServiceAreas = (provider?.serviceAreas || []).length > 0;
    const hasYears = provider?.yearsOfExperience != null;

    const checks = [
        ...docChecks.map((d) => ({
            label: d.label,
            state: d.state,
        })),
        {
            label: "Primary specialization set",
            state: hasSpecialization ? "verified" : "missing",
        },
        {
            label: "At least one service area",
            state: hasServiceAreas ? "verified" : "missing",
        },
        {
            label: "Years of experience provided",
            state: hasYears ? "verified" : "missing",
        },
    ];

    const allPassed = checks.every((c) => c.state === "verified");

    let blockedReason = null;
    if (!allPassed) {
        const missingDocs = docChecks.filter((d) => d.state !== "verified");
        if (missingDocs.length > 0) {
            const pendingCount = missingDocs.filter(
                (d) => d.state === "pending",
            ).length;
            const missingCount = missingDocs.filter(
                (d) => d.state === "missing",
            ).length;
            const rejectedCount = missingDocs.filter(
                (d) => d.state === "rejected",
            ).length;
            const parts = [];
            if (pendingCount)
                parts.push(
                    `${pendingCount} doc${pendingCount > 1 ? "s" : ""} pending review`,
                );
            if (rejectedCount)
                parts.push(
                    `${rejectedCount} doc${rejectedCount > 1 ? "s" : ""} rejected`,
                );
            if (missingCount)
                parts.push(
                    `${missingCount} doc${missingCount > 1 ? "s" : ""} not uploaded`,
                );
            blockedReason = `Cannot approve — ${parts.join(", ")}.`;
        } else {
            blockedReason = "Cannot approve — some profile fields are missing.";
        }
    }

    return { checks, allPassed, blockedReason, docChecks };
}

export default function ApprovalChecklist({ provider }) {
    const { checks, allPassed } = computeApprovalReadiness(provider);

    return (
        <div className="admin-card p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Approval checklist
                    </h2>
                    <p className="text-xs text-[#64748b]">
                        All checks must pass before approval.
                    </p>
                </div>
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        allPassed
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                    }`}
                >
                    {allPassed ? "Ready" : "Not ready"}
                </span>
            </div>

            <ul className="mt-4 space-y-2">
                {checks.map((c, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                        {c.state === "verified" ? (
                            <CheckCircle2
                                size={16}
                                className="shrink-0 text-emerald-600"
                            />
                        ) : c.state === "missing" ? (
                            <Circle
                                size={16}
                                className="shrink-0 text-[#cbd5e1]"
                            />
                        ) : c.state === "rejected" ? (
                            <AlertCircle
                                size={16}
                                className="shrink-0 text-red-500"
                            />
                        ) : (
                            <AlertCircle
                                size={16}
                                className="shrink-0 text-amber-500"
                            />
                        )}
                        <span
                            className={`text-sm ${
                                c.state === "verified"
                                    ? "text-[#0f172a]"
                                    : "text-[#64748b]"
                            }`}
                        >
                            {c.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
