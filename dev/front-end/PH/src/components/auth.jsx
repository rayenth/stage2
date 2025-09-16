import { useAuth } from "react-oauth2-code-pkce";

export function useAuthStatus() {
  const { token } = useAuth();
  return { isAuthenticated: !!token };
}