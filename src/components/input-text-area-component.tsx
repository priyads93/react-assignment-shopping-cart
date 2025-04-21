import { InputTextarea } from "primereact/inputtextarea";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { LabelComponent } from "./label-component";
import { ErrorComponent } from "./error-component";

interface InputTextProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  errors: FieldErrors<T>;
  rows?: number;
  cols?: number;
}

/**
 * A reusable input text area component for forms, designed to work with React Hook Form.
 * This component renders a labeled text area with validation error handling.
 *
 * @template T - The type of the form field values, extending `FieldValues` from React Hook Form.
 *
 * @param {InputTextProps<T>} props - The props for the component.
 * @param {FieldErrors<T>} props.errors - The validation errors object from React Hook Form.
 * @param {keyof T} props.fieldName - The name of the field associated with this text area.
 * @param {UseFormRegister<T>} props.register - The `register` function from React Hook Form for field registration.
 * @param {number} [props.rows=5] - The number of rows for the text area. Defaults to 5 if not provided.
 * @param {number} [props.cols=30] - The number of columns for the text area. Defaults to 30 if not provided.
 *
 * @returns {JSX.Element} A JSX element containing a labeled text area with validation error handling.
 *
 */
export const InputTextAreaComponent = <T extends FieldValues>({
  errors,
  fieldName,
  register,
  rows,
  cols,
}: InputTextProps<T>) => {
  const errorMessage = errors?.[fieldName]?.message?.toString() ?? "";
  return (
    <div id="inputGroup" className="inputGroup">
      <LabelComponent label={fieldName} />
      <InputTextarea
        aria-invalid={errors?.[fieldName] ? "true" : "false"}
        aria-label={fieldName}
        id={fieldName}
        {...register(fieldName)}
        rows={rows ?? 5}
        cols={cols ?? 30}
        invalid={errorMessage ? true : false}
      />

      {errors?.[fieldName]?.message ? (
        <ErrorComponent errorMessage={errorMessage} />
      ) : null}
    </div>
  );
};
