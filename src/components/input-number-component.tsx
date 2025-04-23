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
  currencyCode,
  control,
  errors,
  fieldName,
  min,
  mode,
  max,
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
