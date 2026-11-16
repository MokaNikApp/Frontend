import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Wrench,
    CalendarCheck,
    Briefcase,
    CreditCard,
    FileCheck2,
    ScrollText,
    Sparkles,
} from "lucide-react";

const items = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/providers", label: "Providers", icon: Wrench },
    { to: "/admin/documents", label: "Documents", icon: FileCheck2 },
    { to: "/admin/users", label: "Users", icon: Users },
    // { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
    { to: "/admin/jobs", label: "Jobs", icon: Briefcase },
    { to: "/admin/payments", label: "Payments", icon: CreditCard },
    { to: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
];

export default function AdminSidebar({ onNavigate }) {
    return (
        <aside className="flex flex-col h-full w-[264px] text-slate-200 bg-[#0b1b3a]">
            {/* Brand */}
            <div className="px-6 pt-7 pb-6">
                <div className="relative">
                    {/* Soft gold glow behind the logo */}
                    <div className="pointer-events-none absolute inset-x-2 top-1/2 h-8 -translate-y-1/2 rounded-full bg-[#c9a24b]/25 blur-2xl" />
                    <img
                        src="/images/logo.png"
                        alt="Mokanik Admin"
                        className="relative h-9 w-auto max-w-[180px] object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                    />
                </div>

                {/* Small "Admin" caption underneath the logo */}
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9a24b]/70">
                    Admin Console
                </p>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {items.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            [
                                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                                isActive
                                    ? "bg-white/10 text-white shadow-inner shadow-white/5"
                                    : "text-slate-300/80 hover:bg-white/5 hover:text-white",
                            ].join(" ")
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span
                                    className={[
                                        "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full transition-all",
                                        isActive
                                            ? "bg-[#c9a24b]"
                                            : "bg-transparent",
                                    ].join(" ")}
                                />
                                <Icon
                                    size={18}
                                    className={
                                        isActive
                                            ? "text-[#c9a24b]"
                                            : "text-slate-400 group-hover:text-white transition-colors"
                                    }
                                />
                                <span className="font-medium">{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer chip */}
            <div className="m-3 rounded-xl bg-white/[0.04] ring-1 ring-white/5 p-3">
                <p className="text-[11px] font-semibold tracking-wider uppercase text-[#c9a24b]">
                    Signed in
                </p>
                <p className="mt-1 text-xs text-slate-300 truncate">
                    {(() => {
                        try {
                            const u = JSON.parse(
                                localStorage.getItem("user") || "null",
                            );
                            return u?.email ?? "admin@mokanik.com";
                        } catch {
                            return "admin@mokanik.com";
                        }
                    })()}
                </p>
            </div>
        </aside>
    );
}
