import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import ErrorComponent from "./ErrorComponent";
import LabelComponent from "./LabelComponent";
import { classNames } from "../utils/classNames";

interface InputSelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  errors: FieldErrors<T>;
  options: string[];
}

/**
 * A reusable input select component for forms, designed to work with React Hook Form.
 * This component renders a label, a select dropdown, and an error message if validation fails.
 * @template T - The type of the form field values, extending `FieldValues` from React Hook Form.
 * @param {InputSelectProps<T>} props - The props for the component.
 * @param {UseFormRegister<T>} props.register - The `register` function from React Hook Form for binding the input field.
 * @param {keyof T} props.fieldName - The name of the field to register in the form.
 * @param {FieldErrors<T>} props.errors - The errors object from React Hook Form for displaying validation errors.
 * @param {string[]} props.options - An array of string options to populate the select dropdown.
 *
 * @returns {React.JSX.Element} A JSX element representing the input select component.
 */
export const InputSelectComponent = <T extends FieldValues>({
  register,
  fieldName,
  errors,
  options,
}: InputSelectProps<T>): React.JSX.Element => {
  return (
    <div className="mb-3 flex flex-col">
      <LabelComponent label={fieldName} />
      <select
        {...register(fieldName)}
        className={classNames.input}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
      <ErrorComponent
        errorMessage={errors?.[fieldName]?.message as string | undefined}
      />
    </div>
  );
};
