// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://backend-production-080f.up.railway.app",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;



import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-production-080f.up.railway.app",
  timeout: 15000, // fail loudly instead of hanging forever
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;