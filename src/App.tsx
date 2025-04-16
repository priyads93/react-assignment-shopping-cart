import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout children={<HomePage/>} />} />
        <Route path="/login" element={<Layout children={<LoginPage/>} />} />
        <Route
          path="/register"
          element={<Layout children={<RegistrationPage/>} />}
        />
        <Route path="/user" element={<Layout children={<UserInfoPage/>} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
