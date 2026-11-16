import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export function useAdminJob(jobId) {
    return useQuery({
        queryKey: ["admin", "job", jobId],
        enabled: Boolean(jobId),
        queryFn: async () => {
            const res = await api.get(`/admin/jobs/${jobId}`);

            const payload = res?.data;
            return payload?.data ?? payload;
        },
        staleTime: 15_000,
    });
}
