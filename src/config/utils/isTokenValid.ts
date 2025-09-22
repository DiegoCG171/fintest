import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    exp: number;
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const now = Date.now() / 1000; 
    return decoded.exp > now;
  } catch (err) {
    console.error("Error decodificando token:", err);
    return false;
  }
}
