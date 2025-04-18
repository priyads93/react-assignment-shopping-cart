import { Suspense } from "react";
import { RegistrationForm } from "../forms/registration-form";

/**
 * RegistrationPage component.
 *
 * This component renders a registration page with a centered layout.
 * It uses a `Suspense` component to handle lazy loading of the `RegistrationForm` component.
 *
 * @returns A JSX element representing the registration page.
 */
export const RegistrationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  );
};
