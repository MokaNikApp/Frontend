import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export function useAdminDashboard() {
    return useQuery({
        queryKey: ["admin", "dashboard"],
        queryFn: async () => {
            const { data } = await api.get("/admin/dashboard/overview");
            return data;
        },
        staleTime: 30_000,
    });
}

/**
 * Recent jobs — replaces recent bookings on the dashboard.
 * Bookings become jobs almost immediately, so jobs are the real unit.
 */
export function useRecentJobs(limit = 5) {
    return useQuery({
        queryKey: ["admin", "dashboard", "recent-jobs", limit],
        queryFn: async () => {
            const { data } = await api.get("/admin/jobs", {
                params: {
                    page: 1,
                    limit,
                    sortBy: "createdAt",
                    sortOrder: "DESC",
                },
            });
            const body = data?.data ?? data;
            return Array.isArray(body)
                ? body
                : (body?.data ?? body?.rows ?? []);
        },
        staleTime: 15_000,
    });
}

/**
 * Job status distribution — for the donut.
 * Fetch a wide page and count client-side. Accurate up to 100; if you
 * routinely have more than 100 live jobs, add a backend aggregate endpoint.
 */
export function useJobStatusDistribution() {
    return useQuery({
        queryKey: ["admin", "dashboard", "job-status-distribution"],
        queryFn: async () => {
            const { data } = await api.get("/admin/jobs", {
                params: { page: 1, limit: 100 },
            });
            const body = data?.data ?? data;
            const rows = Array.isArray(body)
                ? body
                : (body?.data ?? body?.rows ?? []);

            const counts = {
                PENDING: 0,
                ACCEPTED: 0,
                EN_ROUTE: 0,
                IN_PROGRESS: 0,
                COMPLETED: 0,
                CANCELLED: 0,
                PAID: 0,
                REJECTED: 0,
            };
            for (const r of rows) {
                const s = r.status || "PENDING";
                if (counts[s] !== undefined) counts[s]++;
                else counts[s] = 1;
            }
            const total = rows.length;

            return { counts, total };
        },
        staleTime: 30_000,
    });
}

/**
 * Payments overview — money in, money out.
 * Reuses the existing endpoint you already wired for the Payments screen.
 */
export function usePaymentsOverview() {
    return useQuery({
        queryKey: ["admin", "payments", "overview"],
        queryFn: async () => {
            const { data } = await api.get(
                "/admin/payments/dashboard-overview",
            );
            return data;
        },
        staleTime: 30_000,
    });
}

/**
 * Pending documents count — for the "needs attention" panel.
 */
export function usePendingDocumentCount() {
    return useQuery({
        queryKey: ["admin", "documents", "pending-count"],
        queryFn: async () => {
            const { data } = await api.get("/admin/documents/pending-count");
            return typeof data === "number"
                ? data
                : (data?.count ?? data?.total ?? 0);
        },
        staleTime: 30_000,
    });
}
