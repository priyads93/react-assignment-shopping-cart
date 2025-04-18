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
  mode?: "decimal"|"currency";
  max?: number;
}

/**
 * A generic React component for rendering a number input field with validation and error handling.
 *
 * @template T - The type of the form's field values, extending `FieldValues` from `react-hook-form`.
 *
 * @param {Object} props - The props for the `InputNumberComponent`.
 * @param {FieldErrors<T>} props.errors - The validation errors object from `react-hook-form`.
 * @param {keyof T} props.fieldName - The name of the field being controlled.
 * @param {Control<T>} props.control - The control object from `react-hook-form` for managing the form state.
 * @param {number} [props.min] - The minimum value allowed for the input field.
 * @param {number} [props.max] - The maximum value allowed for the input field.
 *
 */
export const InputNumberComponent = <T extends FieldValues>({
  errors,
  fieldName,
  control,
  min,
  mode,
  max,
}: InputNumberProps<T>) => {
  const errorMessage = errors?.[fieldName]?.message?.toString() ?? "";
  return (
    <div id="inputGroup" className="inputGroup">
      <LabelComponent label={fieldName} />
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <InputNumber
            aria-invalid={errors?.[fieldName] ? "true" : "false"}
            aria-label={fieldName}
            id={fieldName}
            inputId={fieldName}
            onChange={(event) => field.onChange(event.value)}
            value={field.value}
            mode={mode}
            showButtons
            min={min}
            max={max}
            invalid={errorMessage ? true : false}
          />
        )}
      />

      {errors?.[fieldName]?.message ? (
        <ErrorComponent errorMessage={errorMessage} />
      ) : null}
    </div>
  );
};
