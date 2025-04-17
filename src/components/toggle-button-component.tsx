import { toast } from "react-toastify";
import { ThemeContextType, UseDarkMode } from "../context/theme-context";
import { ToastComponent } from "./toast-component";

/**
 * A functional React component that renders a toggle button for switching between light and dark modes.
 *
 * This component uses the `UseDarkMode` hook to access the current theme state (`darkMode`) and
 * a function (`setDarkMode`) to toggle the theme.
 *
 * @returns {JSX.Element} The rendered toggle button component.
 */
export const ToggleButton = () => {
  const { darkMode, setDarkMode } = (UseDarkMode() as ThemeContextType) || {
    darkMode: false,
    setDarkMode: () => {},
  };

  const handleToggle = () => {
    if (setDarkMode) {
      setDarkMode(!darkMode);
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
    <div className="flex flex-col p-1.5 items-center cursor-pointer">
      <div className="relative">
        <input
          aria-label="Toggle dark mode"
          checked={darkMode}
          className="sr-only peer"
          readOnly
          type="checkbox"
        />
        <div
          className="min-w-11 min-h-6 bg-toggle rounded-full peer  peer-focus:ring-toggle  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toggle"
          onClick={handleToggle}
        />
      </div>
    </div>
  );
};
