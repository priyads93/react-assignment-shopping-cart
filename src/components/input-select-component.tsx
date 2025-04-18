import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { ErrorComponent } from "./error-component";
import { LabelComponent } from "./label-component";
import { Dropdown } from "primereact/dropdown";

interface InputSelectProps<T extends FieldValues> {
  control: Control<T>;
  fieldName: Path<T>;
  errors: FieldErrors<T>;
  options: string[];
}


/**
 * A reusable input select component that integrates with React Hook Form's `Controller`.
 * This component renders a dropdown menu with options, a label, and an error message if validation fails.
 *
 * @template T - The type of the form field values, extending `FieldValues` from React Hook Form.
 *
 * @param {InputSelectProps<T>} props - The props for the InputSelectComponent.
 * @param {Control<T>} props.control - The control object from React Hook Form for managing form state.
 * @param {FieldErrors<T>} props.errors - The errors object from React Hook Form for displaying validation errors.
 * @param {string} props.fieldName - The name of the field in the form.
 * @param {Array<{ label: string; value: string }>} props.options - The options for the dropdown menu, each containing a label and value.
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
