import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-scope flex min-h-screen bg-[#f6f7fb]">
            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen shrink-0">
                <AdminSidebar />
            </div>

            {/* Mobile drawer */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 z-30 bg-[#0b1b3a]/40 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 z-40 lg:hidden">
                        <AdminSidebar
                            onNavigate={() => setSidebarOpen(false)}
                        />
                    </div>
                </>
            )}

            {/* Content column */}
            <div className="flex flex-col flex-1 min-w-0">
                <AdminTopbar
                    onToggleSidebar={() => setSidebarOpen((v) => !v)}
                />
                <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
                    <div className="max-w-[1400px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
