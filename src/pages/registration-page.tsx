import { Suspense } from "react";
import { RegistrationForm } from "../forms/registration-form";
import { classNames } from "../utils/class-names";

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
    <div className={classNames.pageContainer}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <RegistrationForm />
      </Suspense>
    </div>
  );
};
