import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../forms/login-form";
import { loginWithEmailAndPassword, register } from "./api-service";
import { User } from "./interface";
// login mutation
export const useLogin = () => {
  // create the mutation
  return useMutation({
    mutationFn: (data: LoginFormValues) => loginWithEmailAndPassword(data),
  });
};

//register mutation
export const useRegister = () => {
  // create the mutation
  return useMutation({
    mutationFn: (data: User) => register(data),
  });
};
