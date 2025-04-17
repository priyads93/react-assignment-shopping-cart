import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { User } from "../services/interface";

export type UserContextType = {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

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
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
 
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
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
}
