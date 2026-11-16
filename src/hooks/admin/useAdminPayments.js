import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

function normalize(res) {
    const body = res?.data ?? {};
    const rows = Array.isArray(body)
        ? body
        : (body.data ?? body.items ?? body.rows ?? body.results ?? []);
    const meta = body.meta ?? body.pagination ?? {};

    const total = body.total ?? body.count ?? meta.total ?? rows.length;
    const page = body.page ?? body.currentPage ?? meta.page ?? 1;
    const rawLimit = body.limit ?? body.perPage ?? meta.limit;
    const limit = rawLimit ?? (rows.length > 0 ? rows.length : 20);
    const totalPages =
        body.totalPages ??
        body.lastPage ??
        meta.totalPages ??
        meta.lastPage ??
        Math.max(1, Math.ceil(Number(total) / Math.max(Number(limit) || 1, 1)));

    return {
        rows,
        total: Number(total) || 0,
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        totalPages: Math.max(1, Number(totalPages) || 1),
    };
}

export function useAdminPayments(params) {
    return useQuery({
        queryKey: ["admin", "payments", params],
        queryFn: async () => {
            const res = await api.get("/admin/payments", { params });
            return normalize(res);
        },
        keepPreviousData: true,
        staleTime: 15_000,
    });
}

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

export function useRevenueProjection() {
    return useQuery({
        queryKey: ["admin", "payments", "revenue"],
        queryFn: async () => {
            const { data } = await api.get(
                "/admin/payments/revenue-projection",
            );
            return data;
        },
        staleTime: 30_000,
    });
}
