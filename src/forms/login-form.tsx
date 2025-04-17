import { FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextComponent } from "../components/input-text-component";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { classNames } from "../utils/class-names";
import { ButtonComponent } from "../components/button-component";
import { useLogin } from "../services/auth-service";
import { storage } from "../services/session-utils";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { AuthResponse } from "../services/interface";

const schema = yup.object({
  email: yup
    .string()
    .email("Your email format is not valid")
    .required("You must enter your email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});

/**
 * Represents the values for the login form.
 *
 * @property email - The email address entered by the user.
 * @property password - The password entered by the user.
 */
export type LoginFormValues = {
  email: string;
  password: string;
};

/**
 *
 * This component renders a login form with fields for email and password.
 * It uses react-hook-form for form handling and validation with Yup.
 * The form includes error handling and displays a toast notification for errors.
 */
export const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isSubmitting } = formState;
  const { mutateAsync } = useLogin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    mutateAsync(data, {
      onSuccess: (response: AuthResponse) => {
        if (response.access_token) {
          storage.setToken(response.access_token);
          queryClient.setQueryData(["user"], response.user);
          toast(<ToastComponent title="Logged In Successfully" />);
          navigate("/user");
        } else {
          throw new Error("Login failed");
        }
      },
      onError: (error: Error) => {
        throw new Error(JSON.stringify(error));
      },
    }).catch((error: Error) => {
      console.log("Error", error);
      toast(
        <ToastComponent
          text="Please check your username and password to try again"
          title="Login Failed"
        />
      );
    });
  };
  // Handle Forms Errors If InValid
  const onError = (errors: FieldErrors<LoginFormValues>) => {
    console.log('Error',errors);
    toast(<ToastComponent title="Please fix the errors in form" />);
  };

  return (
    <>
      <h1>Login Form</h1>
      <form
        className={classNames.form}
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <InputTextComponent
          errors={errors}
          fieldName="email"
          register={register}
          type="email"
        />
        <InputTextComponent
          errors={errors}
          fieldName="password"
          register={register}
          type="password"
        />
        <ButtonComponent
          buttonLabel="Login"
          disabled={!isDirty || isSubmitting}
          type="submit"
        />
      </form>
    </>
  );
};

