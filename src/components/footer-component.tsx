/**
 * Footer component that displays a copyright notice with the current year.
 *
 * @returns {JSX.Element} A footer element containing copyright information.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      aria-label="Footer section with copyright information"
      className="flex flex-row justify-center bg-blue-400"
    >
      <p>© {currentYear} All rights reserved.</p>
    </footer>
  );
};

