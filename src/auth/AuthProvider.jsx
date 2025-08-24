// src/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { api } from "@/api/axios";

type User = {
    id: number;
    email: string;
    name?: string;
    role?: string;
    email_verified?: boolean;
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    expiresAt: number | null; // ms timestamp
};

type AuthContextType = AuthState & {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    tryRefresh: () => Promise<boolean>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [expiresAt, setExpiresAt] = useState<number | null>(null);

    // refresh call'larını sıraya almak için
    const refreshing = useRef<Promise<boolean> | null>(null);

    const setSession = (token: string, expiresIn: number, userObj?: User) => {
        setAccessToken(token);
        // küçük clock skew payı bırak (ör. 20 sn)
        const skew = 20;
        setExpiresAt(Date.now() + (expiresIn - skew) * 1000);
        if (userObj) setUser(userObj);
    };

    const login = async (email: string, password: string) => {
        const { data } = await api.post("/login.php", { email, password });
        // beklenen cevap: { access_token, expires_in, token_type, user }
        setSession(data.access_token, data.expires_in, data.user);
    };

    const logout = async () => {
        try { await api.post("/logout.php"); } catch { }
        setUser(null);
        setAccessToken(null);
        setExpiresAt(null);
        // diğer sekmeleri de çıkışa zorla
        new BroadcastChannel("auth").postMessage({ type: "LOGOUT" });
    };

    const tryRefresh = async (): Promise<boolean> => {
        // zaten bir refresh devam ediyorsa ona eklen
        if (refreshing.current) return refreshing.current;

        refreshing.current = (async () => {
            try {
                const { data } = await api.post("/refresh.php");
                setSession(data.access_token, data.expires_in, data.user);
                return true;
            } catch {
                await logout();
                return false;
            } finally {
                refreshing.current = null;
            }
        })();

        return refreshing.current;
    };

    // uygulama açılışında sessizce oturumu geri getir
    useEffect(() => {
        tryRefresh();
    }, [tryRefresh]);

    // access token'ı otomatik yenile (expiresAt yaklaşınca)
    useEffect(() => {
        if (!expiresAt) return;
        const msLeft = expiresAt - Date.now();
        if (msLeft <= 0) { tryRefresh(); return; }
        const id = setTimeout(() => tryRefresh(), msLeft);
        return () => clearTimeout(id);
    }, [expiresAt, tryRefresh]);

    // sekmeler arası senkronizasyon
    useEffect(() => {
        const ch = new BroadcastChannel("auth");
        ch.onmessage = (e) => {
            if (e.data?.type === "LOGOUT") {
                setUser(null); setAccessToken(null); setExpiresAt(null);
            }
        };
        return () => ch.close();
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, expiresAt, login, logout, tryRefresh, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthCtx = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthCtx must be used within AuthProvider");
    return ctx;
};
