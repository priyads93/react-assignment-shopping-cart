import { useMutation, useQuery } from "@tanstack/react-query";
import { callGetMethod, callPatchMethod, callPostMethod } from "./api-service";
import { Product } from "./interface";
import { storage } from "./session-utils";

/**
 * Custom hook to create a new product by making a POST request to the API.
 *
 * @returns A mutation object from `useMutation` that can be used to trigger the product creation.
 *
 */
export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: Product) =>
      callPostMethod(`${import.meta.env.VITE_API_BASE_URL}/products`, data, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storage.getToken()}`,
      }),
  });
};

/**
 * Custom hook to update a product for a specific user.
 *
 * This hook utilizes a mutation function to send a PATCH request
 * to the API endpoint for updating product details. It includes
 * necessary headers such as `Content-Type` and `Authorization` 
 * with a bearer token retrieved from storage.
 *
 * @param userId - The ID of the user associated with the product update.
 * @returns A mutation object from `useMutation` to handle the update operation.
 */
export const useUpdateProduct = (userId: string) => {
  return useMutation({
    mutationFn: (data: Product) =>
      callPatchMethod(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        },
        { userId }
      ),
  });
};

/**
 * A custom hook to fetch a list of products from the API.
 *
 * @param userId - (Optional) The ID of the user to filter products by.
 * @returns The result of the `useQuery` hook, which includes the fetched products and query state.
 */
export const useGetProducts = (userId?: string) => {
  const queryParams: Record<string, string> = {};
  if (userId) {
    queryParams["filter"] = JSON.stringify({ userId });
  }
  return useQuery({
    queryKey: ["getProducts"],
    queryFn: () =>
      callGetMethod(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        {
          Authorization: `Bearer ${storage.getToken()}`,
        },
        queryParams
      ),
  });
};
