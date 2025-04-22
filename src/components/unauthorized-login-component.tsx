import { Link } from "react-router";

export const UnAuthorizedLoginComponent = () => {
  return (
    <div>
      <h2>You are unauthorized</h2>
      <Link aria-label="Go to the login page" to="/login">
        Please Login
      </Link>
    </div>
  );
};
