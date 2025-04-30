import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItemResponse, CreateCartItem, UpdateCartItem } from "./interface";
import {
  callDeleteMethod,
  callGetMethod,
  callPatchMethod,
  callPostMethod,
} from "./api-service";
import { storage } from "./session-utils";
import { QUERY_KEYS } from "../utils/queryKeys";

/**
 * Custom hook to create a new cart item using a mutation.
 *
 * This hook utilizes the `useMutation` hook to perform a POST request
 * to the `/cart-items` endpoint. The request includes the necessary
 * headers such as `Content-Type` and `Authorization` with a bearer token.
 *
 * @returns A mutation object from `useMutation` that can be used to trigger
 *          the creation of a cart item and handle its state (loading, success, error).
 *
 */
export const useCreateCartItem = () => {
  return useMutation({
    mutationFn: (data: CreateCartItem): Promise<CartItemResponse> =>
      callPostMethod<CartItemResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        }
      ),
  });
};

/**
 * Custom hook to update a cart item using a mutation.
 *
 * This hook leverages the `useMutation` hook to perform a PATCH request
 * to update a specific cart item. The API endpoint is dynamically constructed
 * using the `VITE_API_BASE_URL` environment variable.
 *
 *
 * @returns A mutation object from `useMutation` that can be used to trigger the update operation.
 *
 */
export const useUpdateCartItem = () => {
  return useMutation({
    mutationFn: (data: UpdateCartItem) => {
      const { id, ...rest } = data;
      return callPatchMethod(
        `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
        rest,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        },
        { id }
      );
    },
  });
};

/**
 * A custom hook to fetch cart items for a user.
 *
 * @template T - The type of the cart items being fetched.
 * @param {string} [userId] - The optional user ID to filter cart items.
 * @returns {UseQueryResult<T[]>} - The result of the query containing the cart items.
 */
export const useGetCartItems = <T>(userId?: string, enabled = true) => {
  const queryParams: Record<string, string> = {};
  if (userId) {
    queryParams["userId"] = userId;
  }

  return useQuery<T[]>({
    queryKey: [QUERY_KEYS.CARTITEMS],
    enabled,
    queryFn: () =>
      callGetMethod(
        `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
        {
          Authorization: `Bearer ${storage.getToken()}`,
        },
        queryParams
      ),
  });
};

export const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: (cartItemId: string) =>
      callDeleteMethod(
        `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        },
        { cartItemId }
      ),
  });
};
