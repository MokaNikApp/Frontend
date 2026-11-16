import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

function normalize(res) {
    const body = res?.data ?? {};
    const rows =
        body.data ??
        body.items ??
        body.rows ??
        body.results ??
        body.records ??
        [];
    const meta = body.meta ?? body.pagination ?? {};

    const total =
        body.total ??
        body.count ??
        body.totalCount ??
        meta.total ??
        meta.count ??
        rows.length;

    const page =
        body.page ?? body.currentPage ?? meta.page ?? meta.currentPage ?? 1;

    const rawLimit = body.limit ?? body.perPage ?? meta.limit ?? meta.perPage;

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

export function useAdminJobs(params) {
    return useQuery({
        queryKey: ["admin", "jobs", params],
        queryFn: async () => {
            const res = await api.get("/admin/jobs", { params });
            return normalize(res);
        },
        keepPreviousData: true,
        staleTime: 15_000,
    });
}
