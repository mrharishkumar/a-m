import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Login from "./components/Login/Login";
import Navigation from "./routes/Navigation/Navigation";

import Home from "./routes/Home/Home";
import MyDevice from "./components/MyDevice/MyDevice";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

import tokenService from "./services/token.service";
import authService from "./services/auth.service";

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    let localUser = tokenService.getUser();

    if (localUser && !tokenService.isAccessTokenExpired()) {
      if (location === "/") navigate("/home");
    } else if (localUser && !tokenService.isRefreshTokenExpired()) {
      authService.refreshToken();
      localUser = tokenService.getUser();
      if (location === "/") navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate, location]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="my_device" element={<MyDevice />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
