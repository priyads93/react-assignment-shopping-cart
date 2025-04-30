import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem, CartItemResponse, UserResponse } from "../services/interface";
import { storage } from "../services/session-utils";

export type UserContextType = {
  loggedInUser: UserResponse | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  login: (user: UserResponse, token: string) => void;
  logout: () => void;
  cartItems: CartItemResponse[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemResponse[]>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Retrieves the initial state for the user context.
 *
 * This function checks the `sessionStorage` for an item with the key `"loggedInUser"`.
 * If the item exists, it parses the JSON string and returns the corresponding object.
 * If the item does not exist, it returns `null`.
 *
 * @returns {object | null} The parsed user object if found in `sessionStorage`, otherwise `null`.
 */
const getInitialState = () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  return loggedInUser ? JSON.parse(loggedInUser) : null;
};

interface Props {
  children?: ReactNode;
}

/**
 * Provides the `UserContext` to its child components, allowing them to access
 * and update the currently logged-in user.
 *
 * @param {Props} props - The props for the `UserProvider` component.
 * @param {React.ReactNode} props.children - The child components that will have access
 * to the `UserContext`.
 *
 * @returns {JSX.Element}
 */
export const UserProvider = ({ children }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<UserResponse | null>(
    getInitialState()
  );
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

  useEffect(() => {
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  const login = (user: UserResponse, token: string) => {
    setLoggedInUser(user);

    storage.setUser(user);
    storage.setToken(token);
  };

  const logout = () => {
    setLoggedInUser(null);
    storage.clearToken();
    storage.clearUser();
    storage.clearTokenInLocalStorage();
    setCartItems([]);
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        login,
        logout,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to access the UserContext.
 *
 * This hook provides the current value of the UserContext. It must be used
 * within a component that is wrapped by a `UserProvider`. If used outside
 * of a `UserProvider`, it will throw an error.
 *
 * @throws {Error} If the hook is used outside of a `UserProvider`.
 * @returns {UserContextType} The current context value of the UserContext.
 */
export const useUserHook = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserHook must be used within a UserProvider");
  }
  return context;
};
