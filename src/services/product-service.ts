import { useMutation, useQuery } from "@tanstack/react-query";
import { callGetMethod, callPatchMethod, callPostMethod } from "./api-service";
import { CreateProduct, ProductResponse, UpdateProduct } from "./interface";
import { storage } from "./session-utils";
import { QUERY_KEYS, QUERY_KEYS_BASED_ON_ID } from "../utils/queryKeys";

/**
 * Custom hook to create a new product by making a POST request to the API.
 *
 * @returns A mutation object from `useMutation` that can be used to trigger the product creation.
 *
 */
export const useCreateProduct = () => {
  return useMutation({
    mutationFn: ({
      data,
      productId,
    }: {
      data: CreateProduct;
      productId?: string;
    }): Promise<ProductResponse> =>
      callPostMethod<ProductResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        }
      ),
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
 * @returns A mutation object from `useMutation` to handle the update operation.
 */
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: UpdateProduct;
    }) =>
      callPatchMethod(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        data,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage.getToken()}`,
        },
        { productId }
      ),
  });
};

/**
 * A custom hook that fetches product data.
 *
 * @param userId - An optional user ID to filter the products by a specific user.
 * @returns The result of the `useQueries` hook, which includes the data and status of the queries.
 */
export const useGetProducts = (userId?: string) => {
  const queryParams: Record<string, string> = {};
  if (userId) {
    queryParams["userId"] = userId;
  }

  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
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

/**
 * A custom hook to fetch product details using a given product ID.
 *
 * This hook utilizes the `useQuery` hook from React Query to fetch product data
 * from the API. It constructs the query key dynamically based on the product ID
 * and sends an authenticated GET request to the API endpoint.
 *
 * @template T - The expected type of the product data returned by the query.
 * @param {string} productId - The unique identifier of the product to fetch.
 * @returns {UseQueryResult<T>} The result of the query, including the product data,
 * loading state, and any errors encountered during the fetch.
 * 
 */
export const useGetProduct = <T>(productId: string) => {
  return useQuery<T>({
    queryKey: [QUERY_KEYS_BASED_ON_ID(QUERY_KEYS.PRODUCTS, productId)],
    queryFn: () =>
      callGetMethod(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        {
          Authorization: `Bearer ${storage.getToken()}`,
        },
        undefined,
        { productId }
      ),
  });
};
