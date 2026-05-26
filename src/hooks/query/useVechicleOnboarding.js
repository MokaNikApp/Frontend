import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";

export const useGetVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const res = await apiClient.get("/vehicles");
      return res.data;
    },
  });
};