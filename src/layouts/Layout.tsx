import Footer from "../components/Footer";
import Header from "../components/Header";
import { ThemeProvider } from "../context/ThemeContext";

/**
 * Layout component that serves as the main structure for the application.
 * It wraps the content with a `ThemeProvider` and includes a header and footer.
 *
 * @param {Object} props - The props object.
 * @param {React.JSX.Element} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col h-screen bg-toggle text-toggletext">
          <Header />
          {children}
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default Layout;
