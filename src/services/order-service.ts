import { useMutation } from "@tanstack/react-query";
import { Order } from "./interface";
import { callPatchMethod, callPostMethod } from "./api-service";
import { storage } from "./session-utils";

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
    mutationFn: (data: Order) =>
      callPostMethod(`${import.meta.env.VITE_API_BASE_URL}/orders`, data, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storage.getToken()}`,
      }),
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
    mutationFn: (data: Partial<Order>) =>
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
