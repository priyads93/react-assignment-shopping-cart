import { Panel } from "primereact/panel";

/**
 * Footer component that displays a copyright notice with the current year.
 *
 * @returns {JSX.Element} A footer element containing copyright information.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer" id="footer">
      <Panel aria-label="Footer section with copyright information">
        <p>© {currentYear} All rights reserved.</p>
      </Panel>
    </div>
  );
};
