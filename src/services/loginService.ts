import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
import { LoginFormValues } from "../forms/LoginForm";
import { loginWithEmailAndPassword } from "./apiService";
// login mutation
export const useLogin = () => {
  // get the query client
  const queryClient = useQueryClient();

  // create the mutation
  return useMutation({
    mutationFn: (data: LoginFormValues) => loginWithEmailAndPassword(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};