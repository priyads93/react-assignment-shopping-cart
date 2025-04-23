import { useQueryClient } from "@tanstack/react-query";
import { UserContextType, useUserHook } from "../context/user-context";
import { UserResponse } from "../services/interface";
import { Header } from "../components/header-component";
import { Footer } from "../components/footer-component";

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
  const { setLoggedInUser } =
    (useUserHook() as UserContextType) || {
      loggedInUser: null,
      setLoggedInUser: () => {},
    };
  if (user) {
    setLoggedInUser(user);
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
