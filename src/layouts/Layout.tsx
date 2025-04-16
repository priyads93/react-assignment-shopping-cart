import Footer from "../components/Footer";
import Header from "../components/Header";
import { useQueryClient } from "@tanstack/react-query";
import { UserContextType, useUserHook } from "../context/UserContext";
import { User } from "../services/interface";

/**
 * Layout component that serves as the main structure for the application.
 * It wraps the content with a `ThemeProvider` and includes a header and footer.
 *
 * @param {Object} props - The props object.
 * @param {React.JSX.Element} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const user: User | undefined = queryClient.getQueryData(["user"]);
  const { loggedInUser, setLoggedInUser } =
    (useUserHook() as UserContextType) || {
      loggedInUser: null,
      setLoggedInUser: () => {},
    };
  if (user && loggedInUser?.email !== user.email) {
    setLoggedInUser(user);
  } 

  return (
    <>
      <div className="flex flex-col h-screen bg-toggle text-toggletext">
        <Header/>
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
