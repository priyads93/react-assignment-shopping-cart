import { useMutation, useQuery } from "@tanstack/react-query";
import { callGetMethod, callPostMethod } from "./api-service";
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

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["getProducts"],
    queryFn: () =>
      callGetMethod(`${import.meta.env.VITE_API_BASE_URL}/products`, {
        Authorization: `Bearer ${storage.getToken()}`,
      }),
  });
};
