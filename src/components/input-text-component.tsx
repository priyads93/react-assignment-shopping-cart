import { LabelComponent } from "./label-component";
import { ErrorComponent } from "./error-component";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { InputText } from "primereact/inputtext";

interface InputTextProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  errors: FieldErrors<T>;
  type: "text" | "number" | "password" | "email" | "date";
}


/**
 * A reusable input text component that integrates with React Hook Form for form validation.
 * This component dynamically handles different input types (e.g., number, date) and displays
 * validation error messages when applicable.
 *
 * @template T - The type of the form field values, extending `FieldValues` from React Hook Form.
 *
 * @param {InputTextProps<T>} props - The props for the InputTextComponent.
 * @param {FieldErrors<T>} props.errors - The validation errors object from React Hook Form.
 * @param {keyof T} props.fieldName - The name of the field being rendered.
 * @param {UseFormRegister<T>} props.register - The `register` function from React Hook Form for binding the input.
 * @param {string} props.type - The type of the input field (e.g., "text", "number", "date").
 *
 * @returns {JSX.Element} A JSX element containing the input field, label, and error message (if any).
 *
 * @example
 * ```tsx
 * <InputTextComponent
 *   errors={formErrors}
 *   fieldName="username"
 *   register={register}
 *   type="text"
 * />
 * ```
 */
export const InputTextComponent = <T extends FieldValues>({
  errors,
  fieldName,
  register,
  type,
}: InputTextProps<T>) => {
  const registerOptions =
    type === "number"
      ? {
          valueAsNumber: true,
        }
      : type === "date"
        ? {
            valueAsDate: true,
          }
        : undefined;

  const errorMessage = errors?.[fieldName]?.message?.toString() ?? "";
  return (
    <div id="inputGroup" className="inputGroup">
      <LabelComponent label={fieldName} />
      <InputText
        aria-invalid={errors?.[fieldName] ? "true" : "false"}
        aria-label={fieldName}
        id={fieldName}
        {...register(fieldName, registerOptions)}
        invalid={errorMessage ? true : false}
      />

      {errors?.[fieldName]?.message ? (
        <ErrorComponent errorMessage={errorMessage} />
      ) : null}
    </div>
  );
};
