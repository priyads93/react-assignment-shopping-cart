
import { UserContextType, useUserHook } from "../context/user-context";
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
      <div>
        <h2>You are unauthorized</h2>
        <Link aria-label="Go to the login page" to="/login">
          Please Login
        </Link>
      </div>
    );
  } else {
    let welcomeMessage = "Welcome";
    switch (userData?.loggedInUser.accountType) {
      case AccountType.buyer:
        welcomeMessage = "Welcome to the shopping cart. Lets start shopping.";
        break;
      case AccountType.seller:
        welcomeMessage =
          "Welcome to the shopping cart. Please start listing items.";
        break;
      default:
        break;
    }
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <p>{welcomeMessage}</p>
        </Suspense>
      </div>
    );
  }
};
