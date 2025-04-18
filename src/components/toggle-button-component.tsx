import { toast } from "react-toastify";
import { ToastComponent } from "./toast-component";
import { useContext, useState } from "react";
import { PrimeReactContext } from "primereact/api";
import { ToggleButton } from "primereact/togglebutton";

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
 * A functional React component that renders a toggle button for switching between light and dark modes.
 *
 * This component uses the `UseDarkMode` hook to access the current theme state (`darkMode`) and
 * a function (`setDarkMode`) to toggle the theme.
 *
 * @returns {JSX.Element} The rendered toggle button component.
 */
export const SwitchThemeComponent = () => {
  const [darkMode, setDarkMode] = useState(getDefaultTheme());

  const { changeTheme } = useContext(PrimeReactContext);

  const handleToggle = (input: any) => {
    if (changeTheme) {
      const newTheme = input.value ? "dark" : "light";
      changeTheme(
        `${input.value ? "light" : "dark"}Theme`,
        `${newTheme}Theme`,
        "theme",
        () => {
          setDarkMode(!darkMode);
          document.documentElement.classList.add(newTheme);
          localStorage.setItem("theme", newTheme);
        }
      );
    } else {
      toast(
        <ToastComponent
          text="Unable to toggle the theme"
          title="Toggle Failed"
        />
      );
    }
  };

  return (
    <ToggleButton
      onLabel="Dark Mode"
      offLabel="Light Mode"
      checked={darkMode}
      onChange={(e) => handleToggle(e)}
    ></ToggleButton>
  );
};
