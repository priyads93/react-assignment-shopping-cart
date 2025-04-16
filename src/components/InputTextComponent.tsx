import LabelComponent from "./LabelComponent";
import ErrorComponent from "./ErrorComponent";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { classNames } from "../utils/classNames";

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
const InputTextComponent = <T extends FieldValues>({
  register,
  fieldName,
  errors,
  type,
}: InputTextProps<T>) => {
  const registerOptions = type === "number" ?{
    valueAsNumber: true,
  } : type === "date" ? {
    valueAsDate: true,
  } : undefined;
  return (
    <>
      <div className="mb-3 flex flex-col">
        <LabelComponent label={fieldName} />
        <input
          type={type}
          id={fieldName}
          {...register(fieldName,registerOptions )}
          className={classNames.input}
          aria-label={fieldName}
          aria-invalid={errors?.[fieldName] ? "true" : "false"}
        ></input>
        <ErrorComponent
          errorMessage={errors?.[fieldName]?.message as string | undefined}
        />
      </div>
    </>
  );
};

export default InputTextComponent;
