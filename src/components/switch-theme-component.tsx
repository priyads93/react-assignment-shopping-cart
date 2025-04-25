import { toast } from "react-toastify";
import { ToastComponent } from "./toast-component";
import { useContext, useState } from "react";
import { PrimeReactContext } from "primereact/api";
import { ToggleButton } from "primereact/togglebutton";
import { SelectButton } from "primereact/selectbutton";

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
    return storedTheme.toLowerCase() === "dark" ? "Dark" : "Light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "Dark"
    : "Light";
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
  const options = ["Dark", "Light"];

  const [theme, setTheme] = useState(getDefaultTheme());

  const { changeTheme } = useContext(PrimeReactContext);

  const handleToggle = (input: { value: string }) => {
    if (changeTheme) {
      const newTheme = input.value === "Dark" ? "dark" : "light";
      changeTheme(
        `${input.value === "Dark" ? "light" : "dark"}Theme`,
        `${newTheme}Theme`,
        "theme",
        () => {
          setTheme(theme === "Dark" ? "Light" : "Dark");
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
    <SelectButton
      options={options}
      value={theme}
      onChange={(e) => handleToggle(e)}
    />
  );
};
