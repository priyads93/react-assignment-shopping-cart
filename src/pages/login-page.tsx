import { Link } from "react-router";
import { LoginForm } from "../forms/login-form";
import { Suspense } from "react";
import { classNames } from "../utils/class-names";

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
    <div className={classNames.pageContainer}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <LoginForm />
        <Link
          aria-label="Go to the registration page"
          className="text-blue-500 hover:underline"
          to="/register"
        >
          Don't have an account? Sign up here!
        </Link>
      </Suspense>
    </div>
  );
};
