// src/hooks/useAxiosAuth.ts
import { useEffect } from "react";
import { api } from "@/api/axios";
import { useAuthCtx } from "@/auth/AuthProvider";

export function useAxiosAuth() {
  const { accessToken, tryRefresh, logout } = useAuthCtx();

  useEffect(() => {
    const reqId = api.interceptors.request.use((config) => {
      if (accessToken && !config.headers?.Authorization) {
        config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
      }
      return config;
    });

    const resId = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;
        const status = error?.response?.status;

        // 401 → bir kere refresh dene, sonra isteği tekrar et
        if (status === 401 && !original._retry) {
          original._retry = true;
          const ok = await tryRefresh();
          if (ok) {
            original.headers = { ...(original.headers || {}), Authorization: undefined }; // request interceptor ekler
            return api(original);
          }
        }

        // 403 veya 401 (yeniden de başarısız) → oturumdan düş
        if (status === 401 || status === 403) {
          await logout();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [accessToken, tryRefresh, logout]);

  return api;
}
