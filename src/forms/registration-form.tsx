import { FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextComponent } from "../components/input-text-component";
import { InputSelectComponent } from "../components/input-select-component";
import { LabelComponent } from "../components/label-component";
import { PhoneNumberComponent } from "../components/phone-number-component";
import { ErrorComponent } from "../components/error-component";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/toast-component";
import { ButtonComponent } from "../components/button-component";
import { AccountType, Gender, User } from "../services/interface";
import { useRegister } from "../services/auth-service";
import { useNavigate } from "react-router";
import { Card } from "primereact/card";
import { InputNumberComponent } from "../components/input-number-component";
import { PasswordComponent } from "../components/input-password-component";

const schema = yup.object({
  name: yup.string().required("You must enter your name"),
  email: yup
    .string()
    .email("Your email format is not valid")
    .required("You must enter your email"),
  password: yup
    .string()
    .required("You must enter your password")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  age: yup
    .number()
    .required("You must enter your age")
    .min(18, "You must be at least 18 years old"),
  gender: yup
    .string()
    .required("You must select gender")
    .oneOf(["", ...Object.values(Gender)], "Invalid Gender"),
  accountType: yup
    .string()
    .required("You must select account type")
    .oneOf(["", ...Object.values(AccountType)], "Invalid Account Type"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .test("validate-phone-number", "Invalid Phone Number", (value) => {
      return value ? isValidPhoneNumber(value) : false;
    }),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

/**
 * Represents the values for the registration form.
 *
 * @typedef RegistrationFormValues
 */
export type RegistrationFormValues = User;

/**
 * RegistrationForm Component
 *
 * This component renders a registration form with various input fields for user details.
 * It uses `react-hook-form` for form state management and validation, and `yup` for schema validation.
 */
export const RegistrationForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: 0,
      gender: "",
      accountType: "",
      phoneNumber: "",
      termsAndConditions: false,
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting } = formState;
  const { mutateAsync } = useRegister();
  const navigate = useNavigate();

  const onSubmit = (data: RegistrationFormValues) => {
    mutateAsync(data, {
      onSuccess: (response: User | undefined) => {
        if (response) {
          toast(
            <ToastComponent
              text="You have registered successfully"
              title="Registration Successful"
            />
          );
          navigate("/login");
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
          text="Please check your details and try again"
          title="Registration Failed"
        />
      );
    });
  };
  // Handle Forms Errors If InValid
  const onError = (errors: FieldErrors<RegistrationFormValues>) => {
    console.log("Errors", errors);
    toast(<ToastComponent title="Please fix the errors in form" />);
  };

  return (
    <Card title="Registration Form">
      <form
        id="form"
        className="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <InputTextComponent
          errors={errors}
          fieldName="name"
          register={register}
          type="text"
        />
        <InputTextComponent
          errors={errors}
          fieldName="email"
          register={register}
          type="email"
        />
        <PasswordComponent
          errors={errors}
          fieldName="password"
          control={control}
        />
        <InputNumberComponent
          errors={errors}
          fieldName="age"
          control={control}
          min={18}
          mode="decimal"
        />
        <InputSelectComponent
          errors={errors}
          fieldName="gender"
          options={Object.values(Gender)}
          control={control}
        />
        <InputSelectComponent
          errors={errors}
          fieldName="accountType"
          options={Object.values(AccountType)}
          control={control}
        />
        <PhoneNumberComponent
          control={control}
          errors={errors}
          fieldName="phoneNumber"
        />
        <div id="inputGroup" className="inputGroup">
          <input
            aria-label="Accept Terms and Conditions"
            {...register("termsAndConditions")}
            type="checkbox"
          />
          <LabelComponent label="Accept Terms and Conditions" />
          <ErrorComponent errorMessage={errors?.termsAndConditions?.message} />
        </div>
        <ButtonComponent
          buttonLabel={isSubmitting ? "Submitting..." : "Submit"}
          disabled={!isDirty || isSubmitting}
          type="submit"
        />
        <ButtonComponent
          buttonLabel="Reset"
          disabled={false}
          onClick={() => {
            if (window.confirm("Are you sure you want to reset the form?")) {
              reset({
                name: "",
                email: "",
                password: "",
                age: 0,
                gender: "",
                accountType: "",
                phoneNumber: "",
                termsAndConditions: false,
              });
            }
          }}
          type="button"
        />
      </form>
    </Card>
  );
};
