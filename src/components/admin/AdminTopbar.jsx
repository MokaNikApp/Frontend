import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut, ChevronDown, RefreshCcw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminTopbar({ onToggleSidebar }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    })();

    // Close dropdown on outside click
    useEffect(() => {
        const onDoc = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    const refresh = () =>
        queryClient.invalidateQueries({ queryKey: ["admin"] });

    const hour = new Date().getHours();
    const greeting =
        hour < 12
            ? "Good morning"
            : hour < 17
              ? "Good afternoon"
              : "Good evening";

    return (
        <header className="sticky top-0 z-20 border-b border-[#e8ecf3] bg-white/70 backdrop-blur-xl">
            <div className="flex items-center justify-between h-[68px] px-4 md:px-8">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 -ml-2 rounded-lg hover:bg-[#f6f7fb] lg:hidden"
                        aria-label="Toggle menu"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="min-w-0">
                        <p className="text-[13px] text-[#64748b]">
                            {greeting},{" "}
                            <span className="font-medium text-[#0f172a]">
                                {user?.firstName || "Admin"}
                            </span>
                        </p>
                        <p className="hidden sm:block text-[11px] text-[#94a3b8]">
                            Here's what's happening across Mokanik today.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={refresh}
                        className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-[#e8ecf3] bg-white px-3 py-2 text-xs font-medium text-[#334155] hover:bg-[#f8fafc] transition-colors"
                        title="Refresh data"
                    >
                        <RefreshCcw size={14} />
                        Refresh
                    </button>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="flex items-center gap-2 rounded-full border border-[#e8ecf3] bg-white px-2 py-1.5 pr-3 hover:bg-[#f8fafc] transition-colors"
                        >
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#0b1b3a] to-[#122551] text-white text-xs font-semibold">
                                {(user?.firstName?.[0] || "A").toUpperCase()}
                            </span>
                            <span className="hidden md:block text-xs font-medium text-[#0f172a]">
                                {user?.firstName || "Admin"}
                            </span>
                            <ChevronDown size={14} className="text-[#64748b]" />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-60 rounded-xl border border-[#e8ecf3] bg-white shadow-xl shadow-black/5 overflow-hidden animate-[fadeIn_.15s_ease-out]">
                                <div className="px-4 py-3 border-b border-[#e8ecf3]">
                                    <p className="text-sm font-semibold text-[#0f172a]">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="text-xs text-[#64748b] truncate">
                                        {user?.email}
                                    </p>
                                    <span className="mt-2 inline-block rounded-full bg-[#f7ecd2] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6c22]">
                                        {user?.role}
                                    </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="flex items-center w-full gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={16} />
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
