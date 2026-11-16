import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

function normalize(res) {
    const body = res?.data ?? {};
    const rows = Array.isArray(body)
        ? body
        : (body.data ?? body.items ?? body.rows ?? body.results ?? []);
    const meta = body.meta ?? body.pagination ?? {};

    const total = body.total ?? body.count ?? meta.total ?? rows.length;
    const page = body.page ?? meta.page ?? 1;
    const rawLimit = body.limit ?? meta.limit;
    const limit = rawLimit ?? (rows.length > 0 ? rows.length : 20);
    const totalPages =
        body.totalPages ??
        meta.totalPages ??
        Math.max(1, Math.ceil(Number(total) / Math.max(Number(limit) || 1, 1)));

    return {
        rows,
        total: Number(total) || 0,
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        totalPages: Math.max(1, Number(totalPages) || 1),
    };
}

export function useAdminAuditLogs(params) {
    return useQuery({
        queryKey: ["admin", "audit-logs", params],
        queryFn: async () => {
            const res = await api.get("/admin/audit-logs", { params });
            return normalize(res);
        },
        keepPreviousData: true,
        staleTime: 15_000,
    });
}

export function useAuditSummary(rows = [], total = 0) {
    return useQuery({
        queryKey: ["admin", "audit-logs", "summary"],
        enabled: false,
        queryFn: async () => {
            const { data } = await api.get("/admin/audit-logs/summary");
            return data;
        },
        initialData: () => summarize(rows, total),
        staleTime: 30_000,
    });
}

export function summarize(rows = [], total = 0) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    let todayCount = 0;
    let weekCount = 0;
    let approvals = 0;
    let rejections = 0;
    let suspensions = 0;

    for (const r of rows) {
        const d = r.createdAt ? new Date(r.createdAt) : null;
        if (d && d >= startOfDay) todayCount++;
        if (d && d >= startOfWeek) weekCount++;
        const a = (r.action || "").toLowerCase();
        if (a.includes("approve")) approvals++;
        else if (a.includes("reject")) rejections++;
        else if (a.includes("suspend") || a.includes("deactivat"))
            suspensions++;
    }

    return { total, todayCount, weekCount, approvals, rejections, suspensions };
}
