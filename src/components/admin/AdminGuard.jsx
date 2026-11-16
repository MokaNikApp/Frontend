import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

export default function AdminGuard({ children }) {
    const location = useLocation();
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const cached = localStorage.getItem("user");

        if (!token || !cached) return setStatus("deny");

        let parsed;
        try {
            parsed = JSON.parse(cached);
        } catch {
            return setStatus("deny");
        }
        if (parsed?.role?.toLowerCase() !== "admin") return setStatus("deny");

        api.get("/auth/profile")
            .then((res) => {
                if (res.data?.role?.toLowerCase() === "admin") {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    setStatus("ok");
                } else {
                    setStatus("deny");
                }
            })
            .catch(() => setStatus("deny"));
    }, []);

    if (status === "checking") {
        return (
            <div className="admin-scope flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-14 h-14">
                        <div className="absolute inset-0 rounded-full border-2 border-[#0b1b3a]/10" />
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c9a24b] animate-spin" />
                    </div>
                    <p className="text-xs font-medium tracking-widest uppercase text-[#64748b]">
                        Preparing workspace
                    </p>
                </div>
            </div>
        );
    }

    if (status === "deny") {
        return (
            <Navigate to="/login" replace state={{ from: location.pathname }} />
        );
    }

    return children;
}
