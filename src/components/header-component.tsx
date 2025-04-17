import { Link, useNavigate } from "react-router";
import { ButtonComponent } from "./button-component";
import { toast } from "react-toastify";
import { ToastComponent } from "./toast-component";
import { storage } from "../services/session-utils";
import { User } from "../services/interface";
import { useQueryClient } from "@tanstack/react-query";
import { ToggleButton } from "./toggle-button-component";

/**
 * Header component that displays the main navigation bar for the application.
 *
 * This component includes:
 * - A link to the homepage with the label "Shopping World".
 * - A login link that navigates to the login page.
 * - A `ToggleButton` component for modifying the theme.
 * @component
 * @returns {JSX.Element} The rendered Header component.
 */
export const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user: User | undefined = queryClient.getQueryData(["user"]);
  const handleLogout = () => {
    try {
      toast(<ToastComponent title="You are logged out from the app" />);
      queryClient.setQueryData(["user"], null);
      storage.clearToken();
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      toast(<ToastComponent text="Please try again" title="Logout Failed" />);
    }
  };

  return (
    <header className="flex flex-row bg-blue-400">
      <div className="flex justify-center p-3">
        <Link aria-label="Go to homepage" className="hover:underline" to="/">
          Shopping Worlds
        </Link>
      </div>
      <div className="flex flex-row relative md:absolute items-center right-0 p-1.5">
        {user?.name ? (
          <div className="p-2">
            <span className="text-white">{user?.name}</span>
          </div>
        ) : (
          <Link
            aria-label="Go to Login"
            className="p-2 hover:underline"
            to="/login"
          >
            Login
          </Link>
        )}
        <ButtonComponent
          aria-label="Log Out"
          buttonLabel="Log Out"
          className="bg-sky-400 disabled:bg-gray-500 hover:bg-sky-200 rounded-md p-2"
          disabled={false}
          onClick={() => handleLogout()}
          type="button"
        />
        <ToggleButton />
      </div>
    </header>
  );
};
