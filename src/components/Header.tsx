import { Link } from "react-router";
import ToggleButton from "./ToggleButton";
import ButtonComponent from "./ButtonComponent";
import { toast, ToastContainer } from "react-toastify";
import { ToastComponent } from "./ToastComponent";

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

  return (
    <header className="flex flex-row bg-blue-400">
      <ToastContainer />
      <div className="flex justify-center p-3">
        <Link to="/" aria-label="Go to homepage" className="hover:underline">
          Shopping World
        </Link>
      </div>
      <div className="flex flex-row relative md:absolute items-center right-0 p-1.5">
        <Link
          to="/login"
          className="p-2 hover:underline"
          aria-label="Go to Login"
        >
          Login
        </Link>
        <ButtonComponent
          type="button"
          buttonLabel="Log Out"
          onClick={() => {
            toast(<ToastComponent title="Logged Out Successfully" />);
          }}
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
