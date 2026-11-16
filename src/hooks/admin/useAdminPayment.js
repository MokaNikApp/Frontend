import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export function useAdminPayment(paymentId) {
    return useQuery({
        queryKey: ["admin", "payment", paymentId],
        enabled: Boolean(paymentId),
        queryFn: async () => {
            const res = await api.get(`/admin/payments/${paymentId}`);
            const payload = res?.data;
            return payload?.data ?? payload;
        },
        staleTime: 15_000,
    });
}
