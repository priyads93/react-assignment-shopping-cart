import { QueryClient, useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../forms/login-form";
import { callPostMethod } from "./api-service";
import { User } from "./interface";
import { storage } from "./session-utils";

/**
 * Sends a POST request to the authentication endpoint to log in a user
 * using their email and password.
 *
 * @param data - The login credentials, typically an object containing
 *               email and password fields.
 * @returns Promise<AuthResponse>
 */
export const useLogin = () => {
  // create the mutation
  return useMutation({
    mutationFn: (data: LoginFormValues) =>
      callPostMethod(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, data, {
        "Content-Type": "application/json",
      }),
  });
};

/**
 * Registers a new user.
 *
 * @param data - The user data to be sent in the request body. This should include
 *               the necessary fields for user registration.
 * @returns Promise<User>
 */
export const useRegister = () => {
  // create the mutation
  return useMutation({
    mutationFn: (data: User) =>
      callPostMethod(`${import.meta.env.VITE_API_BASE_URL}/users`, data, {
        "Content-Type": "application/json",
      }),
  });
};

/**
 * Logs out the current user by clearing the user data from the query cache
 * and removing the authentication token from storage.
 *
 * @param queryClient - The QueryClient instance used to manage and cache server state.
 * @returns void
 */
export function logout(queryClient: QueryClient): void {
  queryClient.setQueryData(["user"], null);
  return storage.clearToken();
}
