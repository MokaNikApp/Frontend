import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export function useAdminBooking(bookingId) {
    return useQuery({
        queryKey: ["admin", "booking", bookingId],
        enabled: Boolean(bookingId),
        queryFn: async () => {
            const { data } = await api.get(`/admin/bookings/${bookingId}`);
            return data;
        },
        staleTime: 15_000,
    });
}
