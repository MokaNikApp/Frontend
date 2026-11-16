import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export function useAdminUser(userId) {
    return useQuery({
        queryKey: ["admin", "user", userId],
        enabled: Boolean(userId),
        queryFn: async () => {
            const { data } = await api.get(`/admin/users/${userId}`);
            return data;
        },
        staleTime: 15_000,
    });
}
