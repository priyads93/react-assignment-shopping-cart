import { LoginForm } from "../forms/login-form";
import { Suspense } from "react";
/**
 * The `LoginPage` component represents the login page of the application.
 * It includes a login form wrapped in a `Suspense` component to handle lazy loading,
 * and a link to navigate to the registration page for users who do not have an account.
 * @component
 * @returns {JSX.Element} The rendered login page component.
 *
 */
export const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};
