import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ToastComponent } from "./toast-component";
import { AccountType, UserResponse } from "../services/interface";
import { useQueryClient } from "@tanstack/react-query";
import { SwitchThemeComponent } from "./switch-theme-component";
import { MenuItem } from "primereact/menuitem";
import { MenuBarComponent } from "./menu-bar-component";
import { UserContextType, useUserHook } from "../context/user-context";
import { ButtonComponent } from "./button-component";

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
  const { logout, loggedInUser } = useUserHook() as UserContextType;

  const user: UserResponse | null = loggedInUser;
  const handleLogout = () => {
    try {
      toast(<ToastComponent title="You are logged out from the app" />);
      queryClient.setQueryData(["user"], null);
      logout();
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      toast(<ToastComponent text="Please try again" title="Logout Failed" />);
    }
  };

  const productListTemplate = user ? (
    <ButtonComponent
      buttonLabel="Products Page"
      icon="pi pi-shop"
      disabled={false}
      type="button"
      onClick={() => navigate("/product-list")}
    />
  ) : null;

  const homePageTemplate = (
    <ButtonComponent
      buttonLabel="Home Page"
      icon="pi pi-home"
      disabled={false}
      type="button"
      onClick={() => {
        navigate("/");
      }}
    />
  );

  const menuItems: MenuItem[] = [
    {
      id: "Shopping World",
      label: "Shopping World",
      template: homePageTemplate,
    },
    {
      id: "Product List",
      template: productListTemplate,
    },
  ];

  const addToCartTemplate =
    user?.accountType === AccountType.BUYER ? (
      <i
        className="pi pi-shopping-cart"
        onClick={() => {
          navigate("/cart");
        }}
        style={{ fontSize: "2.5rem" }}
      />
    ) : null;

  const orderListTemplate =
    user?.accountType === AccountType.BUYER ? (
      <Link to="/order-list">Orders</Link>
    ) : null;

  const getAccountSettingsLabel = (user: UserResponse | null) =>
    user ? `Hi ${user.name}, Account Settings` : "Account Settings";

  const accountSettingsLabel = getAccountSettingsLabel(user);

  const endMenuItems: MenuItem[] = [
    {
      id: "Account Settings",
      label: accountSettingsLabel,
      items: [
        {
          id: "Login",
          label: user?.name ? user.name : "Login",
          template: user?.name ? (
            <Link aria-label="Update user details" to={`/register/${user?.id}`}>
              Update User
            </Link>
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
      ],
    },
    {
      id: "Orders",
      label: "",
      template: orderListTemplate,
    },
    {
      id: "Add To Cart",
      label: "",
      template: addToCartTemplate,
    },
    {
      id: "Switch Theme",
      label: "",
      template: <SwitchThemeComponent />,
    },
  ];

  return (
    <div className="header" id="header">
      <MenuBarComponent
        end={
          <MenuBarComponent
            id="end"
            menuItems={endMenuItems}
          ></MenuBarComponent>
        }
        id="menubar"
        menuItems={menuItems}
      />
    </div>
  );
};
