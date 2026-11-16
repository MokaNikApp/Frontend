import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export function useProviderAudit(providerId) {
    return useQuery({
        queryKey: ["admin", "provider", providerId, "audit"],
        enabled: Boolean(providerId),
        queryFn: async () => {
            const { data } = await api.get("/admin/audit-logs", {
                params: {
                    targetType: "provider",
                    targetId: providerId,
                    page: 1,
                    limit: 20,
                },
            });
            // Normalize — supports { data, meta } or { rows, total }
            const rows = data?.data ?? data?.rows ?? data?.items ?? [];
            return rows;
        },
        staleTime: 30_000,
    });
}
