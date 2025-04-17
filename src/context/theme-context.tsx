import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface Props {
  children?: ReactNode;
}

/**
 * Determines the default theme preference for the application.
 *
 * This function checks if a theme preference is stored in the browser's localStorage.
 * If a stored theme is found, it evaluates whether the theme is "dark" (case-insensitive).
 * If no stored theme is found, it falls back to checking the user's system preference
 * for a dark color scheme using the `window.matchMedia` API.
 *
 * @returns {boolean} `true` if the theme is "dark" or the system prefers a dark color scheme, otherwise `false`.
 */
const getDefaultTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme.toLowerCase() === "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * ThemeProvider is a context provider component that manages the application's theme state.
 * It allows toggling between dark mode and light mode, and persists the theme preference
 * in the browser's localStorage.
 *
 * @param {Props} props - The props object containing the children to be rendered within the provider.
 * @param {React.ReactNode} props.children - The child components that will have access to the theme context.
 *
 * @returns {JSX.Element} A ThemeContext.Provider component that wraps the children and provides
 * the `darkMode` state and `setDarkMode` function to toggle the theme.
 *
 */
export const ThemeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(getDefaultTheme());
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (darkMode && (!currentTheme || currentTheme !== "dark")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (!darkMode && currentTheme !== "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access the current theme context.
 * 
 * This hook provides access to the `ThemeContext` value, allowing components
 * to consume the current theme settings (e.g., dark mode or light mode).
 * 
 * @returns The current value of the `ThemeContext`.
 * 
 */
export const UseDarkMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("UseDarkMode must be used within a ThemeProvider");
  }
  return context;
}
