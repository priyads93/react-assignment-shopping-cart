import { FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextComponent from "../components/InputTextComponent";
import { InputSelectComponent } from "../components/InputSelectComponent";
import LabelComponent from "../components/LabelComponent";
import PhoneNumberComponent from "../components/PhoneNumberComponent";
import ErrorComponent from "../components/ErrorComponent";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import { ToastComponent } from "../components/ToastComponent";
import { classNames } from "../utils/classNames";
import ButtonComponent from "../components/ButtonComponent";
import { AccountType, Gender, User } from "../services/interface";
import { useRegister } from "../services/authService";
import { useNavigate } from "react-router";



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
const RegistrationForm = () => {
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
          onSuccess: (response: User|undefined) => {
            if (response) {
              toast(
                <ToastComponent
                  title="Registration Successful"
                  text="You have registered successfully"
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
              title="Registration Failed"
              text="Please check your details and try again"
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
    <>
      <h1>Registration Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className={classNames.form}
      >
        <InputTextComponent
          register={register}
          fieldName="name"
          errors={errors}
          type="text"
        ></InputTextComponent>
        <InputTextComponent
          register={register}
          fieldName="email"
          errors={errors}
          type="email"
        ></InputTextComponent>
        <InputTextComponent
          register={register}
          fieldName="password"
          errors={errors}
          type="password"
        ></InputTextComponent>
        <InputTextComponent
          register={register}
          fieldName="age"
          errors={errors}
          type="number"
        ></InputTextComponent>
        <InputSelectComponent
          register={register}
          fieldName="gender"
          errors={errors}
          options={Object.values(Gender)}
        ></InputSelectComponent>
        <InputSelectComponent
          register={register}
          fieldName="accountType"
          errors={errors}
          options={Object.values(AccountType)}
        ></InputSelectComponent>
        <PhoneNumberComponent
          control={control}
          fieldName="phoneNumber"
          errors={errors}
        ></PhoneNumberComponent>
        <div className="flex flex-row italic mb-0">
          <input
            type="checkbox"
            {...register("termsAndConditions")}
            className="mr-2"
            aria-label="Accept Terms and Conditions"
          />
          <LabelComponent label="Accept Terms and Conditions"></LabelComponent>
          <ErrorComponent errorMessage={errors?.termsAndConditions?.message} />
        </div>
        <ButtonComponent
          type="submit"
          disabled={!isDirty || isSubmitting}
          buttonLabel={isSubmitting ? "Submitting..." : "Submit"}
        />
        <ButtonComponent
          type="button"
          disabled={false}
          buttonLabel="Reset"
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
        />
      </form>
    </>
  );
};

export default RegistrationForm;
