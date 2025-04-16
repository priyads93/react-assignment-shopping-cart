/**
 * Footer component that displays a copyright notice with the current year.
 *
 * @returns {JSX.Element} A footer element containing copyright information.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="flex flex-row justify-center bg-blue-400"
      aria-label="Footer section with copyright information"
    >
      <p>© {currentYear} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
