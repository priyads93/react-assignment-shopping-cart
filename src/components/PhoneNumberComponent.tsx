import LabelComponent from "./LabelComponent";
import ErrorComponent from "./ErrorComponent";
import { Control, Controller, Path } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { classNames } from "../utils/classNames";

interface PhoneNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  fieldName: Path<T>;
  errors: Record<string, { message?: string }>;
}

/**
 * A reusable component for handling phone number input with validation and error display.
 * 
 * This component uses `react-hook-form`'s `Controller` to manage the form state and integrates
 * a phone input field with country code selection. It also displays validation errors if present.
 * 
 * @template T - The type of the form field values, extending `FieldValues` from `react-hook-form`.
 * 
 * @param {PhoneNumberInputProps<T>} props - The props for the `PhoneNumberComponent`.
 * @param {Control<T>} props.control - The control object from `react-hook-form` to manage the form state.
 * @param {keyof T} props.fieldName - The name of the field in the form.
 * @param {FieldErrors<T>} props.errors - The object containing validation errors for the form fields.
 * 
 * @returns {JSX.Element} A JSX element representing the phone number input field with validation and error handling.
 */
const PhoneNumberComponent = <T extends FieldValues>({
  control,
  fieldName,
  errors,
}: PhoneNumberInputProps<T>) => {
  return (
    <div className="mb-3 flex flex-col">
      <LabelComponent label={fieldName} />
      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            className={classNames.phoneNumberInput}
            value={value}
            onChange={onChange}
            defaultCountry="IN"
            id={fieldName}
          />
        )}
      />
      <ErrorComponent errorMessage={errors?.[fieldName]?.message} />
    </div>
  );
};

export default PhoneNumberComponent;
