import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../api/axios";

/**
 * Normalizes the various shapes pagination might come back in.
 * Adjust the fallbacks below if your PaginationProvider returns
 * something different (e.g. { items, total }).
 */
function normalizePage(res) {
    const body = res?.data ?? {};
    const rows = body.data ?? body.items ?? body.results ?? body.rows ?? [];
    const total = body.total ?? body.meta?.total ?? body.count ?? rows.length;
    const page = body.page ?? body.meta?.page ?? 1;
    const limit = body.limit ?? body.meta?.limit ?? (rows.length || 20);
    const totalPages =
        body.totalPages ??
        body.meta?.totalPages ??
        Math.max(1, Math.ceil(total / Math.max(limit, 1)));
    return { rows, total, page, limit, totalPages };
}

export function useAdminProviders(params) {
    return useQuery({
        queryKey: ["admin", "providers", params],
        queryFn: async () => {
            const res = await api.get("/admin/providers", { params });
            return normalizePage(res);
        },
        keepPreviousData: true,
        staleTime: 15_000,
    });
}

export function useProviderActions() {
    const queryClient = useQueryClient();

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ["admin", "providers"] });

    const approve = useMutation({
        mutationFn: async (providerId) => {
            const { data } = await api.post(
                `/admin/providers/${providerId}/approve`,
            );
            return data;
        },
        onSuccess: () => {
            toast.success("Provider approved");
            invalidate();
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message ||
                    "Could not approve this provider.",
            );
        },
    });

    const updateStatus = useMutation({
        mutationFn: async ({ providerId, status, reason }) => {
            const { data } = await api.patch(
                `/admin/providers/${providerId}/status`,
                { status, reason },
            );
            return data;
        },
        onSuccess: (_d, vars) => {
            toast.success(`Provider marked ${vars.status}`);
            invalidate();
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message ||
                    "Could not update provider status.",
            );
        },
    });

    return { approve, updateStatus };
}
