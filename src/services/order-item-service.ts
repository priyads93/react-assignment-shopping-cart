import { useMutation } from "@tanstack/react-query";
import { CreateOrderItem, UpdateOrderItem } from "./interface";
import { callPatchMethod, callPostMethod } from "./api-service";
import { storage } from "./session-utils";

/**
 * Custom hook to create an order item using a mutation.
 *
 * This hook utilizes the `useMutation` hook to send a POST request
 * to the `/order-items` endpoint with the provided data. The request
 * includes a JSON payload and an authorization token retrieved from storage.
 *
 * @returns A mutation object from `useMutation` that can be used to trigger
 *          the creation of an order item and handle its state (loading, success, error).
 */
export const useCreateOrderItem = () => {
  return useMutation({
    mutationFn: (data: CreateOrderItem) =>
      callPostMethod(`${import.meta.env.VITE_API_BASE_URL}/order-items`, data, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storage.getToken()}`,
      }),
  });
};

/**
 * Custom hook to update an order item using a mutation.
 *
 * This hook leverages the `useMutation` hook to perform a PATCH request
 * to update an order item associated with a specific order ID.
 *
 * @param orderItemId - The unique identifier of the order item to which the item belongs.
 * @returns A mutation object that can be used to trigger the update operation.
 */
export const useUpdateOrderItem = (orderItemId: string) => {
  return useMutation({
    mutationFn: (data: UpdateOrderItem) =>
      callPatchMethod(
        `${import.meta.env.VITE_API_BASE_URL}/order-items`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        },
        { orderItemId }
      ),
  });
};
