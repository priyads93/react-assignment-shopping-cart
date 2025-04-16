import { AuthResponse, User } from "./interface";
import { storage } from "./sessionUtils";

export async function handleApiResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) throw new Error("Failed on log in request");
  return data;
}

/**
 * Sends a POST request to the authentication endpoint to log in a user
 * using their email and password.
 *
 * @param data - The login credentials, typically an object containing
 *               email and password fields.
 * @returns Promise<AuthResponse>
 */
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

/**
 * Registers a new user.
 *
 * @param data - The user data to be sent in the request body. This should include
 *               the necessary fields for user registration.
 * @returns Promise<User> 
 */
export function register(
  data: unknown
): Promise<User | undefined> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(handleApiResponse);
}

export function logout(): void {
  return storage.clearToken();
}
