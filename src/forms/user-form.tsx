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
import {
  AccountType,
  CreateUser,
  Gender,
  UpdateUser,
  User,
  UserResponse,
} from "../services/interface";
import { useRegister, useUpdateUser } from "../services/auth-service";
import { useNavigate } from "react-router";
import { Card } from "primereact/card";
import { InputNumberComponent } from "../components/input-number-component";
import { PasswordComponent } from "../components/input-password-component";

const transformDataForMutation = (
  data: UserFormValues,
  dirtyFields: Partial<
    Readonly<{
      name?: boolean | undefined;
      email?: boolean | undefined;
      password?: boolean | undefined;
      age?: boolean | undefined;
      gender?: boolean | undefined;
      accountType?: boolean | undefined;
      phoneNumber?: boolean | undefined;
      termsAndConditions?: boolean | undefined;
    }>
  >,
  user?: UserResponse
) => {
  let transformedData: CreateUser | UpdateUser = {};
  if (user) {
    if (dirtyFields.gender && data.gender) {
      transformedData.gender = data.gender as Gender;
    }
    if (dirtyFields.name && data.name) {
      transformedData.name = data.name;
    }
    if (dirtyFields.password && data.password) {
      transformedData.password = data.password;
    }
    if (dirtyFields.age && data.age) {
      transformedData.age = data.age;
    }
    if (dirtyFields.phoneNumber && data.phoneNumber) {
      transformedData.phoneNumber = data.phoneNumber;
    }
  } else {
    transformedData = {
      ...data,
      gender: data.gender as Gender,
      accountType: data.accountType as AccountType,
    };
  }
  return transformedData;
};

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
 * Represents the values for the user form.
 *
 * @typedef UserFormValues
 */
export type UserFormValues = Omit<User, "gender" | "accountType"> & {
  gender: string;
  accountType: string;
};

export type UserFormProps = {
  user?: UserResponse;
};

/**
 * UserForm Component
 *
 * This component renders a user form with various input fields for user details.
 * It uses `react-hook-form` for form state management and validation, and `yup` for schema validation.
 */
export const UserForm = ({ user }: UserFormProps) => {
  const defaultValues = user
    ? {
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
        gender: user.gender,
        accountType: user.accountType,
        phoneNumber: user.phoneNumber,
        termsAndConditions: user.termsAndConditions,
      }
    : {
        name: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
        accountType: "",
        phoneNumber: "",
        termsAndConditions: false,
      };
  const form = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isSubmitting, dirtyFields } = formState;
  const { mutateAsync } = user ? useUpdateUser(`${user.id}`) : useRegister();
  const navigate = useNavigate();

  const onSubmit = (data: UserFormValues) => {
    const userData = transformDataForMutation(data, dirtyFields, user);

    mutateAsync(userData as CreateUser & UpdateUser, {
      onSuccess: (response: UserResponse | undefined) => {
        if (response) {
          const toastText = `You have ${user ? "updated" : "registered"} successfully`;
          const toastTitle = `${user ? "Updation" : "Registration"} Successful`;
          toast(<ToastComponent text={toastText} title={toastTitle} />);
          navigate("/login");
        } else {
          throw new Error(`${user ? "Updation" : "Registration"} failed`);
        }
      },
      onError: (error: Error) => {
        throw new Error(JSON.stringify(error));
      },
    }).catch((error: Error) => {
      console.log("Error", error);
      const title = `${user ? "Updation" : "Registration"} failed`;
      toast(
        <ToastComponent
          text="Please check your details and try again"
          title={title}
        />
      );
    });
  };
  // Handle Forms Errors If InValid
  const onError = (errors: FieldErrors<UserFormValues>) => {
    console.log("Errors", errors);
    toast(<ToastComponent title="Please fix the errors in form" />);
  };
  const cardTitle = user ? "Update User Details" : "Registration Form";
  return (
    <Card title={cardTitle}>
      <form
        className="form"
        id="form"
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
          disabled={user ? true : false}
        />
        <PasswordComponent
          control={control}
          errors={errors}
          fieldName="password"
        />
        <InputNumberComponent
          control={control}
          errors={errors}
          fieldName="age"
          min={18}
          mode="decimal"
        />
        <InputSelectComponent
          control={control}
          errors={errors}
          fieldName="gender"
          options={Object.values(Gender)}
        />
        <InputSelectComponent
          control={control}
          errors={errors}
          fieldName="accountType"
          options={Object.values(AccountType)}
          disabled={user ? true : false}
        />
        <PhoneNumberComponent
          control={control}
          errors={errors}
          fieldName="phoneNumber"
        />
        <div className="inputGroup" id="inputGroup">
          <input
            aria-label="Accept Terms and Conditions"
            {...register("termsAndConditions")}
            type="checkbox"
            disabled={user ? true : false}
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
              reset(defaultValues);
            }
          }}
          type="button"
        />
      </form>
    </Card>
  );
};
