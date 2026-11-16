import React from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    MapPin,
    MessageSquare,
    User,
    Wrench,
} from "lucide-react";
import StatusPill from "./StatusPill";

const naira = (n) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(Number(n) || 0);

export default function JobDetailPanel({ job }) {
    if (!job) {
        return (
            <div className="admin-card p-6 text-sm text-[#64748b]">
                Loading job details…
            </div>
        );
    }

    const customerName = `${job.user?.firstName || ""} ${
        job.user?.lastName || ""
    }`.trim();

    const providerName = job.providerProfile?.user
        ? `${job.providerProfile.user.firstName || ""} ${
              job.providerProfile.user.lastName || ""
          }`.trim()
        : null;

    const lifecycle = [
        {
            label: "Scheduled",
            value: job.scheduledAt,
            icon: <Calendar size={13} />,
        },
        {
            label: "Accepted",
            value: job.acceptedAt,
            icon: <CheckCircle2 size={13} />,
        },
        { label: "En route", value: job.enRouteAt, icon: <Clock size={13} /> },
        { label: "Started", value: job.startedAt, icon: <Wrench size={13} /> },
        {
            label: "Completed",
            value: job.completedAt,
            icon: <CheckCircle2 size={13} />,
        },
        {
            label: "Cancelled",
            value: job.cancelledAt,
            icon: <Clock size={13} />,
        },
    ].filter((s) => s.value);

    return (
        <div className="space-y-4">
            {/* Participants */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Participants
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ParticipantCard
                        role="Customer"
                        icon={<User size={13} />}
                        name={customerName}
                        email={job.user?.email}
                        phone={job.user?.phoneNumber}
                        link={
                            job.user?.id ? `/admin/users/${job.user.id}` : null
                        }
                    />
                    <ParticipantCard
                        role="Provider"
                        icon={<Wrench size={13} />}
                        name={
                            job.providerProfile?.workshopName ||
                            providerName ||
                            "Unassigned"
                        }
                        subtitle={
                            job.providerProfile?.primarySpecialization ||
                            undefined
                        }
                        link={
                            job.providerProfile?.id
                                ? `/admin/providers/${job.providerProfile.id}`
                                : null
                        }
                        empty={!job.providerProfile}
                    />
                </div>
            </div>

            {/* Payment */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Payment
                </h2>
                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                            Total amount
                        </p>
                        <p className="mt-1 text-2xl font-semibold tabular-nums text-[#0f172a]">
                            {naira(job.totalAmount)}
                        </p>
                    </div>
                    <StatusPill status={job.status} />
                </div>
                {job.booking?.id && (
                    <Link
                        to={`/admin/bookings/${job.booking.id}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0b1b3a] hover:underline"
                    >
                        View source booking →
                    </Link>
                )}
            </div>

            {/* Lifecycle */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Lifecycle
                </h2>
                {lifecycle.length === 0 ? (
                    <p className="mt-3 text-xs text-[#64748b]">
                        No lifecycle events recorded yet.
                    </p>
                ) : (
                    <ol className="mt-4 space-y-3">
                        {lifecycle.map((step) => (
                            <li key={step.label} className="flex gap-3">
                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f7ecd2] text-[#8a6c22]">
                                    {step.icon}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-[#0f172a]">
                                        {step.label}
                                    </p>
                                    <p className="text-xs text-[#64748b]">
                                        {new Date(step.value).toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                )}
            </div>

            {/* Job details */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Job details
                </h2>
                <dl className="mt-4 space-y-4">
                    {job.title && (
                        <div>
                            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                <Wrench size={12} /> Title
                            </dt>
                            <dd className="mt-1 text-sm text-[#0f172a]">
                                {job.title}
                            </dd>
                        </div>
                    )}
                    {job.description && (
                        <div>
                            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                <MessageSquare size={12} /> Description
                            </dt>
                            <dd className="mt-1 text-sm text-[#334155]">
                                {job.description}
                            </dd>
                        </div>
                    )}
                    <div>
                        <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                            <MapPin size={12} /> Location
                        </dt>
                        <dd className="mt-1 text-sm text-[#0f172a]">
                            {job.address ||
                                [job.city, job.state]
                                    .filter(Boolean)
                                    .join(", ") ||
                                "Not provided"}
                        </dd>
                    </div>
                    {job.serviceType && (
                        <div>
                            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                <FileText size={12} /> Service type
                            </dt>
                            <dd className="mt-1 text-sm text-[#0f172a]">
                                {job.serviceType}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>

            {/* Notes */}
            {job.notes?.length > 0 && (
                <div className="admin-card p-5">
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Notes ({job.notes.length})
                    </h2>
                    <ul className="mt-3 space-y-2">
                        {job.notes.map((n) => (
                            <li
                                key={n.id}
                                className="rounded-xl border border-[#e8ecf3] bg-[#fafbfd] p-3"
                            >
                                <p className="text-sm text-[#0f172a]">
                                    {n.note || "—"}
                                </p>
                                <p className="mt-1 text-[11px] text-[#64748b]">
                                    {n.createdAt
                                        ? new Date(n.createdAt).toLocaleString()
                                        : ""}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function ParticipantCard({
    role,
    icon,
    name,
    subtitle,
    email,
    phone,
    link,
    empty,
}) {
    const content = (
        <div className="rounded-xl border border-[#e8ecf3] bg-white p-3.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#64748b]">
                {icon}
                {role}
            </p>
            <p
                className={`mt-2 text-sm font-semibold truncate ${
                    empty ? "text-[#94a3b8] italic" : "text-[#0f172a]"
                }`}
            >
                {name || "—"}
            </p>
            {subtitle && (
                <p className="truncate text-xs text-[#64748b]">{subtitle}</p>
            )}
            {email && (
                <p className="truncate text-xs text-[#64748b]">{email}</p>
            )}
            {phone && (
                <p className="truncate text-xs text-[#64748b]">{phone}</p>
            )}
            {link && (
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#0b1b3a]">
                    Open →
                </p>
            )}
        </div>
    );
    return link ? <Link to={link}>{content}</Link> : content;
}
