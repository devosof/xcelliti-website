import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Admin } from "@shared/schema";

type AdminAuthContextType = {
  admin: Admin | null;
  isLoading: boolean;
  error: Error | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const {
    data: admin,
    error,
    isLoading,
  } = useQuery<Admin | null>({
    queryKey: ["/api/admin/me"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (!res.ok) {
          if (res.status === 401) return null;
          const error = await res.json();
          throw new Error(error.message || "Failed to fetch admin");
        }
        return res.json();
      } catch (error) {
        console.error("Admin fetch error:", error);
        return null;
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/admin/login", credentials);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Invalid credentials");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/admin/me"], data);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/admin/me"], null);
      toast({
        title: "Logged out successfully",
      });
    },
  });

  const login = async (credentials: { username: string; password: string }) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin: admin || null,
        isLoading,
        error: error as Error | null,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}