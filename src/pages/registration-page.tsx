import { Suspense } from "react";
import { UserForm } from "../forms/user-form";
import { useParams } from "react-router";
import { useGetMe } from "../services/auth-service";
import { ErrorComponent } from "../components/error-component";
import { UserResponse } from "../services/interface";


/**
 * RegistrationPage component renders a user registration or update form.
 * 
 * - If a `userId` is present in the route parameters, it fetches the user details
 *   using the `useGetMe` hook and displays the form pre-filled with the user's data.
 * - If no `userId` is provided, it renders an empty form for new user registration.
 * 
 * The component handles the following states:
 * - **Loading**: Displays a loading message while fetching user data.
 * - **Error**: Displays an error message if the data fetching fails.
 * 
 * @returns A React component that conditionally renders a user form.
 */
export const RegistrationPage = () => {
  const { id: userId } = useParams<{ id: string }>();
  let userDetails: UserResponse;

  if (userId) {
    const { data, isLoading, isError, error } = useGetMe();

    if (isLoading) {
      return <span aria-live="polite">Loading...</span>;
    }

    if (isError) {
      return <ErrorComponent errorMessage={`${error?.message}`} />;
    }
    userDetails = data;

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <UserForm user={userDetails} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserForm />
    </Suspense>
  );
};
