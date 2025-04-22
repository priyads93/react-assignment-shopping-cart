import { UserContextType, useUserHook } from "../context/user-context";
import { Link } from "react-router";
import { AccountType } from "../services/interface";
import { Suspense } from "react";
import { UnAuthorizedLoginComponent } from "../components/unauthorized-login-component";

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
    return <UnAuthorizedLoginComponent />;
  } else {
    let welcomeMessage = `Hi ${userData.loggedInUser.name}, Welcome`;
    switch (userData?.loggedInUser.accountType) {
      case AccountType.buyer:
        welcomeMessage = `Hi ${userData.loggedInUser.name}, Welcome to the shopping cart. Lets start shopping.`;
        break;
      case AccountType.seller:
        welcomeMessage = `Hi ${userData.loggedInUser.name}, Welcome to the shopping cart. Please start listing items. Click here`;
        break;
      default:
        break;
    }
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Link to="/product-list">{welcomeMessage}</Link>
        </Suspense>
      </div>
    );
  }
};
