import { ThemeContextType, UseDarkMode } from "../context/ThemeContext";

/**
 * A functional React component that renders a toggle button for switching between light and dark modes.
 *
 * This component uses the `UseDarkMode` hook to access the current theme state (`darkMode`) and
 * a function (`setDarkMode`) to toggle the theme.
 *
 * @returns {JSX.Element} The rendered toggle button component.
 */
export default function ToggleButton() {
  const { darkMode, setDarkMode } = (UseDarkMode() as ThemeContextType) || {
    darkMode: false,
    setDarkMode: () => {},
  };

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex flex-col p-1.5 items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={darkMode}
          aria-label="Toggle dark mode"
          readOnly
        />
        <div
          onClick={handleToggle}
          className="min-w-11 min-h-6 bg-toggle rounded-full peer  peer-focus:ring-toggle  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toggle"
        ></div>
      </div>
    </div>
  );
}
