import { classNames } from "../utils/classNames";

/**
 * The `HomePage` component serves as the landing page for the shopping cart application.
 * It displays a welcoming message and a brief description of the application.
 *
 * @returns {JSX.Element} A React functional component rendering the homepage content.
 */
const HomePage = () => {
  return (
    <div className={classNames.pageContainer}>
      <h1 className="text-3xl p-2 font-bold">Welcome to Shopping World</h1>
      <p className="text-lg">Your one-stop shop for everything!</p>
    </div>
  );
}

export default HomePage;
