import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { ErrorComponent } from "./error-component";
import { LabelComponent } from "./label-component";
import { classNames } from "../utils/class-names";
import { Dropdown } from "primereact/dropdown";

interface InputSelectProps<T extends FieldValues> {
  control: Control<T>;
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
  control,
  errors,
  fieldName,
  options,
}: InputSelectProps<T>): React.JSX.Element => {
  return (
    <div id="inputGroup" className="inputGroup">
      <LabelComponent label={fieldName} />
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            highlightOnSelect
            options={options}
            id={fieldName}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <ErrorComponent
        errorMessage={errors?.[fieldName]?.message as string | undefined}
      />
    </div>
  );
};
