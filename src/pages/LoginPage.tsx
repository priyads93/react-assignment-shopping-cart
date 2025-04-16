import { Link } from "react-router";
import LoginForm from "../forms/LoginForm";
import { Suspense } from "react";
import { classNames } from "../utils/classNames";

/**
 * The `LoginPage` component represents the login page of the application.
 * It includes a login form wrapped in a `Suspense` component to handle lazy loading,
 * and a link to navigate to the registration page for users who do not have an account.
 * @component
 * @returns {JSX.Element} The rendered login page component.
 *
 */
const LoginPage = () => {
  return (
    <div className={classNames.pageContainer}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      ></Suspense>
      <LoginForm />
      <Link
        to="/register"
        className="text-blue-500 hover:underline"
        aria-label="Go to the registration page"
      >
        Don't have an account? Sign up here!
      </Link>
    </div>
  );
};

export default LoginPage;
