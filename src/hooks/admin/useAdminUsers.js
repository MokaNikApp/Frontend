import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../api/axios";

function normalize(res) {
    const body = res?.data ?? {};

    // Rows — most likely keys in order of preference
    const rows =
        body.data ??
        body.items ??
        body.rows ??
        body.results ??
        body.records ??
        [];

    // Meta — pull from whichever place exists
    const meta = body.meta ?? body.pagination ?? {};

    const total =
        body.total ??
        body.count ??
        body.totalCount ??
        body.totalRecords ??
        meta.total ??
        meta.count ??
        meta.totalCount ??
        meta.totalRecords ??
        rows.length;

    const page =
        body.page ??
        body.currentPage ??
        meta.page ??
        meta.currentPage ??
        meta.pageNumber ??
        1;

    const rawLimit =
        body.limit ??
        body.perPage ??
        body.pageSize ??
        meta.limit ??
        meta.perPage ??
        meta.pageSize ??
        meta.pageSize;

    const limit = rawLimit ?? (rows.length > 0 ? rows.length : 20);

    const totalPages =
        body.totalPages ??
        body.lastPage ??
        body.pageCount ??
        meta.totalPages ??
        meta.lastPage ??
        meta.pageCount ??
        Math.max(1, Math.ceil(total / Math.max(limit, 1)));

    return {
        rows,
        total: Number(total) || 0,
        page: Number(page) || 1,
        limit: Number(limit) || 20,
        totalPages: Math.max(1, Number(totalPages) || 1),
    };
}

export function useAdminUsers(params) {
    return useQuery({
        queryKey: ["admin", "users", params],
        queryFn: async () => {
            const res = await api.get("/admin/users", { params });
            return normalize(res);
        },
        keepPreviousData: true,
        staleTime: 15_000,
    });
}

export function useUserActions(userId) {
    const queryClient = useQueryClient();

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        if (userId) {
            queryClient.invalidateQueries({
                queryKey: ["admin", "user", userId],
            });
        }
    };

    const updateStatus = useMutation({
        mutationFn: async ({ id, status, reason }) => {
            const { data } = await api.patch(`/admin/users/${id}/status`, {
                status,
                reason,
            });
            return data;
        },
        onSuccess: (_d, vars) => {
            toast.success(`User marked ${vars.status}`);
            invalidate();
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Could not update user status.",
            );
        },
    });

    const changeRole = useMutation({
        mutationFn: async ({ id, newRole }) => {
            const { data } = await api.patch(`/admin/users/${id}/role`, {
                newRole,
            });
            return data;
        },
        onSuccess: (_d, vars) => {
            toast.success(`Role changed to ${vars.newRole}`);
            invalidate();
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Could not change user role.",
            );
        },
    });

    return { updateStatus, changeRole };
}
