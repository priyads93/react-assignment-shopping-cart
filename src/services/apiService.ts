import { AuthResponse, User } from "./interface";
import { storage } from "./sessionUtils";

export async function handleApiResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) throw new Error("Failed on log in request");
  return data;
}

export function getUserProfile(): Promise<{ user: User | undefined }> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer storage.getToken()`,
    },
  }).then(handleApiResponse);
}

export async function loginWithEmailAndPassword(
  data: unknown
): Promise<AuthResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return handleApiResponse(response);
}

export function registerWithEmailAndPassword(
  data: unknown
): Promise<AuthResponse> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(data),
  }).then(handleApiResponse);
}

export function logout(): void {
  return storage.clearToken();
}
