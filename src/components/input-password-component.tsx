import { LabelComponent } from "./label-component";
import { ErrorComponent } from "./error-component";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Password } from "primereact/password";

interface InputTextProps<T extends FieldValues> {
  control: Control<T>;
  fieldName: Path<T>;
  errors: FieldErrors<T>;
}

/**
 * A reusable password input component that integrates with React Hook Form.
 * This component renders a password input field with validation error handling.
 *
 * @template T - The type of the form field values, extending `FieldValues` from React Hook Form.
 *
 * @param {Object} props - The props for the PasswordComponent.
 * @param {Control<T>} props.control - The control object from React Hook Form used to manage the form state.
 * @param {FieldErrors<T>} props.errors - The errors object from React Hook Form containing validation errors.
 * @param {string} props.fieldName - The name of the field being controlled, used for binding and error handling.
 *
 * @returns {JSX.Element} A JSX element containing the password input field, label, and error message (if any).
 *
 */
export const PasswordComponent = <T extends FieldValues>({
  control,
  errors,
  fieldName,
}: InputTextProps<T>) => {
  const errorMessage = errors?.[fieldName]?.message?.toString() ?? "";
  return (
    <div id="inputGroup" className="inputGroup">
      <LabelComponent label={fieldName} />
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Password
            aria-invalid={errors?.[fieldName] ? "true" : "false"}
            aria-label={fieldName}
            id={fieldName}
            inputId={fieldName}
            variant="filled"
            feedback={false}
            {...field}
            toggleMask
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
