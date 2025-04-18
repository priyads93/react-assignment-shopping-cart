import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ToastComponent } from "./toast-component";
import { storage } from "../services/session-utils";
import { User } from "../services/interface";
import { useQueryClient } from "@tanstack/react-query";
import { SwitchThemeComponent } from "./toggle-button-component";
import { MenuItem } from "primereact/menuitem";
import { SplitButtonComponent } from "./split-button-component";
import { MenuBarComponent } from "./menu-bar-component";

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

  const userMenuItems: MenuItem[] = [
    {
      id: "Login",
      label: user?.name ? user.name : "Login",
      template: user?.name ? (
        <></>
      ) : (
        <Link aria-label="Go to Login" to="/login">
          Login
        </Link>
      ),
      url: "/",
    },
    {
      id: "Log out",
      label: "Log out",
      command: () => handleLogout(),
    },
  ];

  const menuItems: MenuItem[] = [
    {
      id: "Shopping World",
      label: "Shopping World",
      template: (
        <div>
          <Link aria-label="Go to homepage" to="/">
            Shopping Worlds
          </Link>
        </div>
      ),
      url: "/",
    },
  ];

  return (
    <div id="header" className="header">
      <MenuBarComponent
        id="menubar"
        end={
          <div style={{ display: "flex", gap: "1rem" }}>
            <SplitButtonComponent
              label="Account Settings"
              menuItems={userMenuItems}
              menuStyle={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "#008080",
              }}
            />
            <SwitchThemeComponent />
          </div>
        }
        menuItems={menuItems}
      />
    </div>
  );
};
