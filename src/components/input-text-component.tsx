import { LabelComponent } from "./label-component";
import { ErrorComponent } from "./error-component";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { classNames } from "../utils/class-names";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { FloatLabel } from "primereact/floatlabel";

interface InputTextProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  errors: FieldErrors<T>;
  type: "text" | "number" | "password" | "email" | "date";
}

/**
 * A reusable input text component for forms, designed to work with React Hook Form.
 * This component supports generic field values and provides validation error handling.
 *
 * @template T - The type of the field values, extending `FieldValues` from React Hook Form.
 *
 * @param {InputTextProps<T>} props - The props for the component.
 * @param {UseFormRegister<T>} props.register - The `register` function from React Hook Form for binding the input field.
 * @param {keyof T} props.fieldName - The name of the field to register, used as the input's `id` and `name`.
 * @param {FieldErrors<T>} props.errors - The validation errors object from React Hook Form, used to display error messages.
 * @param {"text" | "number" | "password" | "email" | "date"} props.type - The type of the input field (e.g., text, number, password, email).
 *
 * @returns {JSX.Element} A JSX element containing a labeled input field with error handling.
 *
 * @example
 * ```tsx
 * <InputTextComponent
 *   register={register}
 *   fieldName="username"
 *   errors={errors}
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
