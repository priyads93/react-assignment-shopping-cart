import { LabelComponent } from "./label-component";
import { ErrorComponent } from "./error-component";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";

interface InputNumberProps<T extends FieldValues> {
  control: Control<T>;
  fieldName: Path<T>;
  errors: FieldErrors<T>;
  min?: number;
  mode?: "decimal" | "currency";
  currencyCode?: string;
  max?: number;
  disabled?: boolean;
}

/**
 * A reusable component for rendering an input field with number-specific functionality,
 * integrated with React Hook Form's `Controller` for form state management.
 *
 * @template T - The type of the form's field values, extending `FieldValues`.
 *
 * @param {InputNumberProps<T>} props - The properties for the `InputNumberComponent`.
 * @param {string} props.currencyCode - The currency code to display in the input field (e.g., "USD").
 * @param {Control<T>} props.control - The `control` object from React Hook Form for managing form state.
 * @param {FieldErrors<T>} props.errors - The errors object from React Hook Form for displaying validation errors.
 * @param {string} props.fieldName - The name of the field being controlled.
 * @param {number} [props.min] - The minimum value allowed for the input.
 * @param {number} [props.max] - The maximum value allowed for the input.
 * @param {string} [props.mode] - The mode of the input (e.g., "decimal" or "currency").
 * @param {boolean} [props.disabled] - Whether the input field is disabled.
 *
 * @returns {JSX.Element} A JSX element containing the input field, label, and error message (if any). 
 */
export const InputNumberComponent = <T extends FieldValues>({
  currencyCode,
  control,
  errors,
  fieldName,
  min,
  mode,
  max,
  disabled,
}: InputNumberProps<T>) => {
  const errorMessage = errors?.[fieldName]?.message?.toString() ?? "";
  return (
    <div className="inputGroup" id="inputGroup">
      <LabelComponent label={fieldName} />
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <InputNumber
            aria-invalid={errors?.[fieldName] ? "true" : "false"}
            aria-label={fieldName}
            currency={currencyCode}
            id={fieldName}
            inputId={fieldName}
            invalid={errorMessage ? true : false}
            max={max}
            min={min}
            mode={mode}
            onChange={(event) => field.onChange(event.value)}
            showButtons
            disabled={disabled}
            value={field.value}
          />
        )}
      />

      {errors?.[fieldName]?.message ? (
        <ErrorComponent errorMessage={errorMessage} />
      ) : null}
    </div>
  );
};
