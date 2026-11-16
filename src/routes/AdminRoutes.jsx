import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminGuard from "../components/admin/AdminGuard";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminProviders from "../pages/admin/AdminProviders";
import AdminProviderDetail from "../pages/admin/AdminProviderDetail";
import AdminDocuments from "../pages/admin/AdminDocuments";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserDetail from "../pages/admin/AdminUserDetail";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminBookingDetail from "../pages/admin/AdminBookingDetail";
import AdminJobDetail from "../pages/admin/AdminJobDetail";
import JobDetailPanel from "../pages/admin/AdminJobs";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminPaymentDetail from "../pages/admin/AdminPaymentDetail";
import AdminAuditLogs from "../pages/admin/AdminAuditLogs";

const Soon = ({ name }) => (
    <div className="admin-card p-8 text-center">
        <p className="text-sm font-medium text-[#0f172a]">{name} screen</p>
        <p className="mt-1 text-xs text-[#64748b]">
            Coming in the next build step.
        </p>
    </div>
);

export default function AdminRoutes() {
    return (
        <AdminGuard>
            <Routes>
                <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="providers" element={<AdminProviders />} />
                    <Route
                        path="providers/:id"
                        element={<AdminProviderDetail />}
                    />
                    <Route path="documents" element={<AdminDocuments />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/:id" element={<AdminUserDetail />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route
                        path="bookings/:id"
                        element={<AdminBookingDetail />}
                    />
                    <Route path="jobs" element={<JobDetailPanel />} />
                    <Route path="jobs/:id" element={<AdminJobDetail />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route
                        path="payments/:id"
                        element={<AdminPaymentDetail />}
                    />
                    <Route path="audit-logs" element={<AdminAuditLogs />} />
                    <Route
                        path="*"
                        element={<Navigate to="/admin" replace />}
                    />
                </Route>
            </Routes>
        </AdminGuard>
    );
}
