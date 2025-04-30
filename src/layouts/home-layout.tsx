import { useQueryClient } from "@tanstack/react-query";
import { UserContextType, useUserHook } from "../context/user-context";
import {
  CartItemResponse,
  OrderResponse,
  OrderStatus,
  UserResponse,
} from "../services/interface";
import { Header } from "../components/header-component";
import { Footer } from "../components/footer-component";
import { useGetOrders } from "../services/order-service";
import { ErrorComponent } from "../components/error-component";
import { useGetCartItems } from "../services/cart-item-service";
import { useEffect } from "react";
import isEqual from "react-fast-compare";

/**
 * Layout component that serves as the main structure for the application
 *
 * @param {Object} props - The props object.
 * @param {React.JSX.Element} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const user: UserResponse | undefined = queryClient.getQueryData(["user"]);
  const { data, error, isLoading, isError, refetch } =
    useGetCartItems<CartItemResponse>(user ? `${user?.id}` : "");
  const { setLoggedInUser, setCartItems } =
    (useUserHook() as UserContextType) || {
      loggedInUser: null,
      setLoggedInUser: () => {},
      setCartItems: () => {},
    };
  if (user) {
    setLoggedInUser(user);
    refetch();
    setCartItems(data ?? []);
  }
  useEffect(() => {
    refetch();
    setCartItems(data ?? []);
  });
  if (isLoading) {
    return <span aria-live="polite">Loading...</span>;
  }
  if (isError) {
    return <ErrorComponent errorMessage={`${error?.message}`} />;
  }

  return (
    <div className="layout" id="layout">
      <Header />
      <div className="body" id="body">
        {children}
      </div>
      <Footer />
    </div>
  );
};
