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

export function useAdminDocuments(params) {
    return useQuery({
        queryKey: ["admin", "documents", params],
        queryFn: async () => {
            const res = await api.get("/admin/documents", { params });
            return normalize(res);
        },
        keepPreviousData: true,
        staleTime: 15_000,
    });
}

export function usePendingDocumentCount() {
    return useQuery({
        queryKey: ["admin", "documents", "pending-count"],
        queryFn: async () => {
            const { data } = await api.get("/admin/documents/pending-count");
            return data;
        },
        staleTime: 30_000,
    });
}

export function useDocumentQueueActions() {
    const queryClient = useQueryClient();

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "documents"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "provider"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    };

    const verify = useMutation({
        mutationFn: async (id) => {
            const { data } = await api.post(`/admin/documents/${id}/verify`);
            return data;
        },
        onSuccess: () => {
            toast.success("Document verified");
            invalidate();
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message ||
                    "Could not verify this document.",
            );
        },
    });

    const reject = useMutation({
        mutationFn: async ({ id, reason }) => {
            const { data } = await api.post(`/admin/documents/${id}/reject`, {
                reason,
            });
            return data;
        },
        onSuccess: () => {
            toast.success("Document rejected");
            invalidate();
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message ||
                    "Could not reject this document.",
            );
        },
    });

    return { verify, reject };
}
