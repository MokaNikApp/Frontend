import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Banknote,
    Calendar,
    Clock,
    CreditCard,
    FileText,
    MapPin,
    Receipt,
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

export default function BookingDetailPanel({ booking }) {
    return (
        <div className="space-y-4">
            {/* Participants */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Participants
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <ParticipantCard
                        role="Customer"
                        icon={<User size={14} />}
                        name={`${booking.customer?.firstName || ""} ${booking.customer?.lastName || ""}`.trim()}
                        email={booking.customer?.email}
                        phone={booking.customer?.phoneNumber}
                        link={
                            booking.customer?.id
                                ? `/admin/users/${booking.customer.id}`
                                : null
                        }
                    />
                    <ParticipantCard
                        role="Provider"
                        icon={<Wrench size={14} />}
                        name={booking.provider?.businessName || "—"}
                        subtitle={
                            booking.provider ? "Workshop" : "Not yet assigned"
                        }
                        link={
                            booking.provider?.id
                                ? `/admin/providers/${booking.provider.id}`
                                : null
                        }
                        empty={!booking.provider}
                    />
                    <ParticipantCard
                        role="Vehicle"
                        icon={<Wrench size={14} />}
                        name={
                            booking.vehicle
                                ? `${booking.vehicle.brand || ""} ${booking.vehicle.model || ""}`.trim()
                                : "—"
                        }
                        subtitle={
                            booking.vehicle?.plateNumber ||
                            booking.vehicle?.year
                                ? [
                                      booking.vehicle?.plateNumber,
                                      booking.vehicle?.year,
                                  ]
                                      .filter(Boolean)
                                      .join(" · ")
                                : undefined
                        }
                        empty={!booking.vehicle}
                    />
                </div>
            </div>

            {/* Money breakdown */}
            <div className="admin-card p-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-[#0f172a]">
                        Payment breakdown
                    </h2>
                    <StatusPill status={booking.paymentStatus} />
                </div>

                <ul className="mt-4 space-y-2 text-sm">
                    <MoneyRow
                        label="Subtotal"
                        value={naira(booking.subtotal)}
                    />
                    <MoneyRow
                        label="Service fee"
                        value={naira(booking.serviceFee)}
                    />
                    <MoneyRow label="Taxes" value={naira(booking.taxes)} />
                    <li className="my-2 h-px bg-[#e8ecf3]" />
                    <MoneyRow
                        label="Total"
                        value={naira(booking.totalAmount)}
                        bold
                    />
                </ul>

                {booking.paymentStatus && (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[#64748b]">
                        <CreditCard size={12} />
                        Payment status:{" "}
                        <StatusPill status={booking.paymentStatus} />
                    </p>
                )}
            </div>

            {/* Timeline */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Timeline
                </h2>
                <ol className="mt-4 space-y-4">
                    <TimelineItem
                        icon={<FileText size={14} />}
                        title="Booking created"
                        time={booking.createdAt}
                        description={booking.bookingNumber}
                    />
                    {booking.scheduledDate && (
                        <TimelineItem
                            icon={<Calendar size={14} />}
                            title="Scheduled"
                            time={booking.scheduledDate}
                            description={booking.scheduledTime}
                        />
                    )}
                    {booking.cancelledAt && (
                        <TimelineItem
                            icon={<Clock size={14} />}
                            title="Cancelled"
                            time={booking.cancelledAt}
                            description={booking.cancellationReason}
                            tone="danger"
                        />
                    )}
                    {booking.updatedAt &&
                        booking.updatedAt !== booking.createdAt && (
                            <TimelineItem
                                icon={<Clock size={14} />}
                                title="Last updated"
                                time={booking.updatedAt}
                            />
                        )}
                </ol>
            </div>

            {/* Address & notes */}
            <div className="admin-card p-5">
                <h2 className="text-sm font-semibold text-[#0f172a]">
                    Service details
                </h2>
                <dl className="mt-4 space-y-4">
                    <div>
                        <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                            <MapPin size={12} /> Address
                        </dt>
                        <dd className="mt-1 text-sm text-[#0f172a]">
                            {[
                                booking.serviceAddress,
                                booking.serviceCity,
                                booking.serviceState,
                                booking.serviceZip,
                            ]
                                .filter(Boolean)
                                .join(", ") || "Not provided"}
                        </dd>
                    </div>
                    {booking.service && (
                        <div>
                            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                <Wrench size={12} /> Service
                            </dt>
                            <dd className="mt-1 text-sm text-[#0f172a]">
                                {booking.service.name}
                                {booking.service.description && (
                                    <span className="block mt-0.5 text-xs text-[#64748b]">
                                        {booking.service.description}
                                    </span>
                                )}
                            </dd>
                        </div>
                    )}
                    {booking.notes && (
                        <div>
                            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                                <FileText size={12} /> Notes
                            </dt>
                            <dd className="mt-1 text-sm text-[#334155]">
                                {booking.notes}
                            </dd>
                        </div>
                    )}
                    {booking.cancellationReason && (
                        <div>
                            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#ef4444]">
                                <Receipt size={12} /> Cancellation reason
                            </dt>
                            <dd className="mt-1 text-sm text-red-600">
                                {booking.cancellationReason}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>
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
                    Open <ArrowRight size={11} />
                </p>
            )}
        </div>
    );
    return link ? <Link to={link}>{content}</Link> : content;
}

function MoneyRow({ label, value, bold }) {
    return (
        <li
            className={`flex items-center justify-between ${
                bold
                    ? "text-base font-semibold text-[#0f172a]"
                    : "text-[#334155]"
            }`}
        >
            <span>{label}</span>
            <span className="tabular-nums">{value}</span>
        </li>
    );
}

function TimelineItem({ icon, title, time, description, tone = "default" }) {
    const dotTone =
        tone === "danger"
            ? "bg-red-100 text-red-600"
            : "bg-[#f7ecd2] text-[#8a6c22]";
    return (
        <li className="flex gap-3">
            <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${dotTone}`}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-[#0f172a]">{title}</p>
                <p className="text-xs text-[#64748b]">
                    {time ? new Date(time).toLocaleString() : "—"}
                </p>
                {description && (
                    <p className="mt-0.5 text-xs text-[#334155]">
                        {description}
                    </p>
                )}
            </div>
        </li>
    );
}
