import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateOrder, Order, OrderResponse, UpdateOrder } from "./interface";
import { callGetMethod, callPatchMethod, callPostMethod } from "./api-service";
import { storage } from "./session-utils";
import { QUERY_KEYS, QUERY_KEYS_BASED_ON_ID } from "../utils/queryKeys";

/**
 * Custom hook to create an order using a mutation.
 *
 * This hook utilizes the `useMutation` hook to send a POST request to the orders endpoint.
 * It automatically includes the necessary headers, such as `Content-Type` and `Authorization`,
 * with the bearer token retrieved from storage.
 *
 * @returns A mutation object that can be used to trigger the order creation process.
 */
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrder): Promise<OrderResponse> =>
      callPostMethod<OrderResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        }
      ),
  });
};

/**
 * Custom hook to update an order by its ID.
 *
 * This hook utilizes a mutation function to send a PATCH request to the server
 * for updating an order. The server endpoint is dynamically constructed using
 * the `VITE_API_BASE_URL` environment variable. The request includes an
 * authorization token retrieved from storage.
 *
 * @param orderId - The unique identifier of the order to be updated.
 * @returns A mutation object from `useMutation` that can be used to trigger
 *          the update operation and track its status.
 */
export const useUpdateOrder = (orderId: string) => {
  return useMutation({
    mutationFn: (data: Partial<UpdateOrder>) =>
      callPatchMethod(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        },
        { orderId }
      ),
  });
};

/**
 * Custom hook to fetch orders from the API.
 *
 * @param userId - An optional user ID to filter the orders by a specific user.
 * @returns The result of the `useQuery` hook, which includes the fetched data, loading state, and error state.
 *
 */
export const useGetOrders = <T>(userId?: string, orderStatus?: string[]) => {
  const queryParams: Record<string, string> = {};
  if (userId) {
    queryParams["userId"] = userId;
  }
  if (orderStatus) {
    queryParams["orderStatus"] = orderStatus?.join(",");
  }
  return useQuery<T[]>({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: () =>
      callGetMethod(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        {
          Authorization: `Bearer ${storage.getToken()}`,
        },
        queryParams
      ),
  });
};

/**
 * Custom hook to fetch order details by order ID using React Query.
 *
 * @param orderId - The unique identifier of the order to fetch.
 * @returns The result of the `useQuery` hook, which includes the order data, loading state, and error state.
 *
 */
export const useGetOrder = <T>(orderId: string) => {
  return useQuery<T>({
    queryKey: [QUERY_KEYS_BASED_ON_ID(QUERY_KEYS.ORDER, orderId)],
    queryFn: () =>
      callGetMethod(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        {
          Authorization: `Bearer ${storage.getToken()}`,
        },
        undefined,
        { orderId }
      ),
  });
};
