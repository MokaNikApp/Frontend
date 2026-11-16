import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Calendar,
    CheckCircle2,
    CircleSlash2,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserCircle2,
} from "lucide-react";
import UserDetailHeader from "../../components/admin/UserDetailHeader";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { useAdminUser } from "../../hooks/admin/useAdminUser";
import { useUserActions } from "../../hooks/admin/useAdminUsers";

const ROLES = ["customer", "provider", "admin", "auditor"];

export default function AdminUserDetail() {
    const { id } = useParams();
    const { data: user, isLoading, isError, refetch } = useAdminUser(id);
    const { updateStatus, changeRole } = useUserActions(id);

    const [confirm, setConfirm] = useState(null);
    // { type: 'status', status, reason } | { type: 'role', newRole }

    if (isLoading) {
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

    if (isError || !user) {
        return (
            <div className="admin-card p-8 text-center">
                <p className="text-sm font-medium text-[#0f172a]">
                    Couldn't load this user.
                </p>
                <button
                    onClick={() => refetch()}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                >
                    Try again
                </button>
            </div>
        );
    }

    const executeStatus = async () => {
        if (confirm?.type !== "status") return;
        await updateStatus.mutateAsync({
            id,
            status: confirm.status,
            reason: confirm.reason,
        });
        setConfirm(null);
    };

    const executeRole = async () => {
        if (confirm?.type !== "role") return;
        await changeRole.mutateAsync({
            id,
            newRole: confirm.newRole,
        });
        setConfirm(null);
    };

    return (
        <div className="space-y-5">
            <UserDetailHeader
                user={user}
                statusPending={updateStatus.isPending}
                onChangeStatus={(status) =>
                    setConfirm({ type: "status", status })
                }
                onChangeRole={() =>
                    setConfirm({ type: "role", newRole: user.role })
                }
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Left — profile fields */}
                <div className="admin-card p-5 lg:col-span-2">
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Account information
                    </h2>
                    <p className="text-xs text-[#64748b]">
                        Details registered on this account.
                    </p>

                    <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <Field
                            icon={<Mail size={14} />}
                            label="Email"
                            value={user.email}
                        />
                        <Field
                            icon={<Phone size={14} />}
                            label="Phone"
                            value={user.phoneNumber}
                        />
                        <Field
                            icon={<MapPin size={14} />}
                            label="Address"
                            value={user.address}
                        />
                        <Field
                            icon={<MapPin size={14} />}
                            label="City / State"
                            value={[user.city, user.state]
                                .filter(Boolean)
                                .join(", ")}
                        />
                        <Field
                            icon={<Calendar size={14} />}
                            label="Joined"
                            value={
                                user.createdAt
                                    ? new Date(user.createdAt).toLocaleString()
                                    : null
                            }
                        />
                        <Field
                            icon={<Calendar size={14} />}
                            label="Last login"
                            value={
                                user.lastLoginAt
                                    ? new Date(
                                          user.lastLoginAt,
                                      ).toLocaleString()
                                    : null
                            }
                        />
                        <Field
                            icon={<ShieldCheck size={14} />}
                            label="Email verified"
                            value={
                                user.isEmailVerified ? (
                                    <span className="inline-flex items-center gap-1 text-emerald-700">
                                        <CheckCircle2 size={13} /> Yes
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[#94a3b8]">
                                        <CircleSlash2 size={13} /> No
                                    </span>
                                )
                            }
                        />
                        <Field
                            icon={<ShieldCheck size={14} />}
                            label="Fully verified"
                            value={
                                user.isVerified ? (
                                    <span className="inline-flex items-center gap-1 text-emerald-700">
                                        <CheckCircle2 size={13} /> Yes
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[#94a3b8]">
                                        <CircleSlash2 size={13} /> No
                                    </span>
                                )
                            }
                        />
                    </dl>
                </div>

                {/* Right — account meta / stats */}
                <div className="space-y-4">
                    <div className="admin-card p-5">
                        <h2 className="text-sm font-semibold text-[#0f172a]">
                            Account meta
                        </h2>
                        <ul className="mt-3 space-y-3 text-sm">
                            <MetaRow label="User ID" value={user.id} mono />
                            <MetaRow
                                label="Role"
                                value={user.role}
                                capitalize
                            />
                            <MetaRow
                                label="Status"
                                value={user.status}
                                capitalize
                            />
                            <MetaRow
                                label="Active"
                                value={user.isActive ? "Yes" : "No"}
                            />
                            <MetaRow
                                label="Onboarding"
                                value={
                                    user.isOnboardingCompleted
                                        ? "Completed"
                                        : "In progress"
                                }
                            />
                        </ul>
                    </div>

                    {user.role === "provider" && user.providerProfile && (
                        <div className="admin-card p-5">
                            <h2 className="text-sm font-semibold text-[#0f172a]">
                                Provider profile
                            </h2>
                            <p className="mt-1 text-xs text-[#64748b]">
                                View the full provider file for verification and
                                document review.
                            </p>
                            <a
                                href={`/admin/providers/${user.providerProfile.id}`}
                                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#0b1b3a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#122551]"
                            >
                                <UserCircle2 size={13} /> Open provider file
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Status confirm */}
            <ConfirmDialog
                open={confirm?.type === "status"}
                title={
                    confirm?.status === "suspended"
                        ? "Suspend this user?"
                        : confirm?.status === "active"
                          ? "Reactivate this user?"
                          : "Deactivate this user?"
                }
                description={
                    confirm?.status === "suspended"
                        ? "They will not be able to sign in while suspended."
                        : confirm?.status === "active"
                          ? "They will be able to sign in again."
                          : "This is a soft delete. They can be reactivated later."
                }
                confirmLabel={
                    confirm?.status === "suspended"
                        ? "Suspend"
                        : confirm?.status === "active"
                          ? "Reactivate"
                          : "Deactivate"
                }
                tone={confirm?.status === "active" ? "success" : "danger"}
                busy={updateStatus.isPending}
                onCancel={() => setConfirm(null)}
                onConfirm={executeStatus}
            >
                {confirm?.status !== "active" && (
                    <label className="block">
                        <span className="text-xs font-medium text-[#334155]">
                            Reason (optional)
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
                        />
                    </label>
                )}
            </ConfirmDialog>

            {/* Role change confirm */}
            <ConfirmDialog
                open={confirm?.type === "role"}
                title="Change user role"
                description="Admin and auditor roles have elevated permissions. Choose carefully."
                confirmLabel="Save role"
                tone="default"
                busy={changeRole.isPending}
                onCancel={() => setConfirm(null)}
                onConfirm={executeRole}
            >
                <label className="block">
                    <span className="text-xs font-medium text-[#334155]">
                        New role
                    </span>
                    <select
                        value={confirm?.newRole || ""}
                        onChange={(e) =>
                            setConfirm((c) => ({
                                ...c,
                                newRole: e.target.value,
                            }))
                        }
                        className="mt-1 w-full rounded-lg border border-[#e8ecf3] bg-white px-3 py-2 text-sm text-[#0f172a] focus:border-[#0b1b3a] focus:outline-none focus:ring-2 focus:ring-[#0b1b3a]/10"
                    >
                        {ROLES.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                    <p className="mt-2 text-[11px] text-[#64748b]">
                        Changing your own role is blocked by the backend.
                    </p>
                </label>
            </ConfirmDialog>
        </div>
    );
}

function Field({ icon, label, value }) {
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

function MetaRow({ label, value, mono, capitalize }) {
    return (
        <li className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                {label}
            </span>
            <span
                className={`text-xs text-[#0f172a] ${mono ? "font-mono" : ""} ${capitalize ? "capitalize" : ""} truncate max-w-[60%] text-right`}
            >
                {value ?? "—"}
            </span>
        </li>
    );
}
