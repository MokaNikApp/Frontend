import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Award,
    Briefcase,
    Building2,
    Globe,
    MapPin,
    Phone,
    UserCircle2,
} from "lucide-react";
import ProviderDetailHeader from "../../components/admin/ProviderDetailHeader";
import ApprovalChecklist, {
    computeApprovalReadiness,
} from "../../components/admin/ApprovalChecklist";
import DocumentsStrip from "../../components/admin/DocumentsStrip";
import AuditTrailCard from "../../components/admin/AuditTrailCard";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { useAdminProvider } from "../../hooks/admin/useAdminProvider";
import { useDocumentActions } from "../../hooks/admin/useDocumentActions";
import { useProviderAudit } from "../../hooks/admin/useProviderAudit";
import { useProviderActions } from "../../hooks/admin/useAdminProviders";

export default function AdminProviderDetail() {
    const { id } = useParams();
    const providerQuery = useAdminProvider(id);
    const auditQuery = useProviderAudit(id);
    const docActions = useDocumentActions(id);
    const { approve, updateStatus } = useProviderActions();

    const [confirm, setConfirm] = useState(null);

    const provider = providerQuery.data;
    const readiness = useMemo(
        () => (provider ? computeApprovalReadiness(provider) : null),
        [provider],
    );

    if (providerQuery.isLoading) {
        return (
            <div className="space-y-4">
                <div className="admin-skeleton h-40 rounded-2xl" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="admin-skeleton h-64 rounded-2xl lg:col-span-2" />
                    <div className="admin-skeleton h-64 rounded-2xl" />
                </div>
            </div>
        );
    }

    if (providerQuery.isError || !provider) {
        return (
            <div className="admin-card p-8 text-center">
                <p className="text-sm font-medium text-[#0f172a]">
                    Couldn't load this provider.
                </p>
                <button
                    onClick={() => providerQuery.refetch()}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                >
                    Try again
                </button>
            </div>
        );
    }

    const user = provider.user || {};
    const canApprove = readiness?.allPassed && !provider.isApproved;

    const handleApprove = () => setConfirm({ type: "approve", provider });
    const handleStatus = () =>
        setConfirm({
            type: "status",
            provider,
            status:
                (user.status || "").toLowerCase() === "suspended"
                    ? "active"
                    : "suspended",
        });

    const executeApprove = async () => {
        await approve.mutateAsync(provider.id);
        setConfirm(null);
    };

    const executeStatus = async () => {
        await updateStatus.mutateAsync({
            providerId: provider.id,
            status: confirm.status,
            reason: confirm.reason,
        });
        setConfirm(null);
    };

    return (
        <div className="space-y-5">
            <ProviderDetailHeader
                provider={provider}
                canApprove={canApprove}
                approveBlockedReason={readiness?.blockedReason}
                approvePending={approve.isPending}
                onApprove={handleApprove}
                onStatus={handleStatus}
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Left column */}
                <div className="space-y-4 lg:col-span-2">
                    {/* Professional details */}
                    <div className="admin-card p-5">
                        <h2 className="text-sm font-semibold text-[#0f172a]">
                            Professional details
                        </h2>
                        <p className="text-xs text-[#64748b]">
                            Everything the provider shared during onboarding.
                        </p>

                        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                            <Detail
                                icon={<Award size={14} />}
                                label="Primary specialization"
                                value={provider.primarySpecialization}
                            />
                            <Detail
                                icon={<Award size={14} />}
                                label="Secondary specializations"
                                value={
                                    provider.secondarySpecializations?.length
                                        ? provider.secondarySpecializations.join(
                                              ", ",
                                          )
                                        : null
                                }
                            />
                            <Detail
                                icon={<Briefcase size={14} />}
                                label="Years of experience"
                                value={provider.yearsOfExperience}
                            />
                            <Detail
                                icon={<Briefcase size={14} />}
                                label="Years in business"
                                value={provider.yearsInBusiness}
                            />
                            <Detail
                                icon={<Building2 size={14} />}
                                label="Workshop name"
                                value={provider.workshopName}
                            />
                            <Detail
                                icon={<Phone size={14} />}
                                label="Business phone"
                                value={provider.businessPhoneNumber}
                            />
                            <Detail
                                icon={<Globe size={14} />}
                                label="Website"
                                value={provider.website}
                            />
                            <Detail
                                icon={<Building2 size={14} />}
                                label="Business type"
                                value={provider.businessType}
                            />
                        </dl>

                        {provider.serviceAreas?.length > 0 && (
                            <div className="mt-5">
                                <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    <MapPin size={12} /> Service areas
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {provider.serviceAreas.map((area) => (
                                        <span
                                            key={area}
                                            className="inline-flex items-center gap-1 rounded-full bg-[#f6f7fb] px-2.5 py-1 text-xs font-medium text-[#334155] ring-1 ring-[#e8ecf3]"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {provider.description && (
                            <div className="mt-5">
                                <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                    <UserCircle2 size={12} /> About
                                </p>
                                <p className="text-sm leading-relaxed text-[#334155]">
                                    {provider.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Documents */}
                    <DocumentsStrip
                        documents={provider.documents || []}
                        actions={docActions}
                    />
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    <ApprovalChecklist provider={provider} />
                    <AuditTrailCard
                        items={auditQuery.data || []}
                        loading={auditQuery.isLoading}
                    />
                </div>
            </div>

            {/* Approve confirm */}
            <ConfirmDialog
                open={confirm?.type === "approve"}
                title="Approve this provider?"
                description={`${user.firstName || "This provider"} will be allowed to accept jobs immediately.`}
                confirmLabel="Yes, approve"
                tone="success"
                busy={approve.isPending}
                onCancel={() => setConfirm(null)}
                onConfirm={executeApprove}
            />

            {/* Status change confirm */}
            <ConfirmDialog
                open={confirm?.type === "status"}
                title={
                    confirm?.status === "suspended"
                        ? "Suspend this provider?"
                        : "Reactivate this provider?"
                }
                description={
                    confirm?.status === "suspended"
                        ? "They will not be able to accept new jobs while suspended."
                        : "They will be able to accept jobs again."
                }
                confirmLabel={
                    confirm?.status === "suspended" ? "Suspend" : "Reactivate"
                }
                tone={confirm?.status === "suspended" ? "danger" : "success"}
                busy={updateStatus.isPending}
                onCancel={() => setConfirm(null)}
                onConfirm={executeStatus}
            >
                {confirm?.status === "suspended" && (
                    <label className="block">
                        <span className="text-xs font-medium text-[#334155]">
                            Reason (optional, recorded in audit log)
                        </span>
                        <textarea
                            rows={3}
                            value={confirm?.reason || ""}
                            onChange={(e) =>
                                setConfirm((c) => ({
                                    ...c,
                                    reason: e.target.value,
                                }))
                            }
                            className="mt-1 w-full rounded-lg border border-[#e8ecf3] bg-white px-3 py-2 text-sm text-[#0f172a] focus:border-[#0b1b3a] focus:outline-none focus:ring-2 focus:ring-[#0b1b3a]/10"
                            placeholder="e.g. Repeated customer complaints"
                        />
                    </label>
                )}
            </ConfirmDialog>
        </div>
    );
}

function Detail({ icon, label, value }) {
    const hasValue =
        value !== null && value !== undefined && String(value).trim() !== "";
    return (
        <div>
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                {icon}
                {label}
            </dt>
            <dd
                className={`mt-1 text-sm ${
                    hasValue ? "text-[#0f172a]" : "text-[#94a3b8] italic"
                }`}
            >
                {hasValue ? value : "Not provided"}
            </dd>
        </div>
    );
}
