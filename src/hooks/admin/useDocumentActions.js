import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../api/axios";

export function useDocumentActions(providerId) {
    const queryClient = useQueryClient();

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: ["admin", "provider", providerId],
        });
        queryClient.invalidateQueries({ queryKey: ["admin", "documents"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    };

    const verify = useMutation({
        mutationFn: async (documentId) => {
            const { data } = await api.post(
                `/admin/documents/${documentId}/verify`,
            );
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
        mutationFn: async ({ documentId, reason }) => {
            const { data } = await api.post(
                `/admin/documents/${documentId}/reject`,
                { reason },
            );
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
