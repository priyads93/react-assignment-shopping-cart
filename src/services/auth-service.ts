import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginFormValues } from "../forms/login-form";
import { callGetMethod, callPatchMethod, callPostMethod } from "./api-service";
import { CreateUser, UserResponse } from "./interface";
import { storage } from "./session-utils";
import { QUERY_KEYS } from "../utils/queryKeys";

export const useGetMe = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () =>
      callGetMethod(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
        Authorization: `Bearer ${storage.getToken()}`,
      }),
  });
};

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
    mutationFn: (data: CreateUser): Promise<UserResponse> =>
      callPostMethod<UserResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        data,
        {
          "Content-Type": "application/json",
        }
      ),
  });
};

/**
 * Registers a new user.
 *
 * @param data - The user data to be sent in the request body. This should include
 *               the necessary fields for user registration.
 * @returns Promise<User>
 */
export const useUpdateUser = (id: string) => {
  // create the mutation
  return useMutation({
    mutationFn: (data: CreateUser) =>
      callPatchMethod(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        },
        { id }
      ),
  });
};
