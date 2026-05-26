// // hooks/useSelectService.js
// import { useQuery } from "@tanstack/react-query";
// import apiClient from "../../lib/utils/apiClient";

// export const useSelectService = () => {
//   return useQuery({
//     queryKey: ["services"],
//     queryFn: async () => {
//       const res = await apiClient.get("/service");

//       return res.data.data.map((s) => ({
//         id: s.id,
//         title: s.name,
//         price: Number(s.price),
//         description: s.description,
//       }));
//     },
//   });
// };






import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/utils/apiClient";

export const useSelectService = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get("/service");
      return res.data.data.map((s) => ({
        id: s.id,
        title: s.name,
        price: Number(s.price),
        description: s.description,
        category: s.category || "general", // Added fallback for category mapping
      }));
    },
  });
};