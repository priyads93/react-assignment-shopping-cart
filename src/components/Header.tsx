import { Link, useNavigate } from "react-router";
import ToggleButton from "./ToggleButton";
import ButtonComponent from "./ButtonComponent";
import { toast } from "react-toastify";
import { ToastComponent } from "./ToastComponent";
import { storage } from "../services/sessionUtils";
import { User } from "../services/interface";
import { useQueryClient } from "@tanstack/react-query";

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
const Header = () => {
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
      toast(
        <ToastComponent
          title="Logout Failed"
          text="Please try again"
        />
      );
    }
  };

  return (
    <header className="flex flex-row bg-blue-400">
      <div className="flex justify-center p-3">
        <Link to="/" aria-label="Go to homepage" className="hover:underline">
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
            to="/login"
            className="p-2 hover:underline"
            aria-label="Go to Login"
          >
            Login
          </Link>
        )}

        <ButtonComponent
          type="button"
          buttonLabel="Log Out"
          onClick={() => handleLogout()}
          disabled={false}
          aria-label="Log Out"
          className="bg-sky-400 disabled:bg-gray-500 hover:bg-sky-200 rounded-md p-2"
        ></ButtonComponent>
        <ToggleButton></ToggleButton>
      </div>
    </header>
  );
};

export default Header;
