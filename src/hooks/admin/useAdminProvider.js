import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export function useAdminProvider(providerId) {
    return useQuery({
        queryKey: ["admin", "provider", providerId],
        enabled: Boolean(providerId),
        queryFn: async () => {
            const { data } = await api.get(`/admin/providers/${providerId}`);
            return data;
        },
        staleTime: 15_000,
    });
}
