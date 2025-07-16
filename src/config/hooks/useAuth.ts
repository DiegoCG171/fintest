// hooks/useAuth.ts

import { useAppSelector } from "../../store";

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);

  return {
    permissions: user?.permissions || [],
    isAuthenticated: !!user,
  };
};
