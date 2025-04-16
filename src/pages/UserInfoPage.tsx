import { classNames } from "../utils/classNames";
import { UserContextType, useUserHook } from "../context/UserContext";
import { Link } from "react-router";
import { AccountType } from "../services/interface";
import { Suspense } from "react";

/**
 * The `UserInfoPage` component renders a user-specific page based on their login status and account type.
 * 
 * - If the user is not logged in, it displays an unauthorized message with a link to the login page.
 * - If the user is logged in, it displays a welcome message tailored to their account type:
 *   - `Buyer`: Encourages the user to start shopping.
 *   - `Seller`: Encourages the user to start listing items.
 *
 * @returns A JSX element representing the user information page.
 */
export const UserInfoPage = () => {
  const userData = useUserHook() as UserContextType;
  if (!userData?.loggedInUser) {
    return (
      <div className={classNames.pageContainer}>
        <h2>You are unauthorized</h2>
        <Link
          to="/login"
          className="text-blue-500 hover:underline"
          aria-label="Go to the login page"
        >
          Please Login
        </Link>
      </div>
    );
  } else {
    let welcomeMessage = "Welcome";
    switch (userData?.loggedInUser.accountType) {
      case AccountType.Buyer:
        welcomeMessage = "Welcome to the shopping cart. Lets start shopping.";
        break;
      case AccountType.Seller:
        welcomeMessage =
          "Welcome to the shopping cart. Please start listing items.";
        break;
      default:
        break;
    }
    return (
      <div className={classNames.pageContainer}>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              Loading...
            </div>
          }
        >
          <p>{welcomeMessage}</p>
        </Suspense>
      </div>
    );
  }
};
