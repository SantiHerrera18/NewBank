/* eslint-disable no-unused-vars */
import LoginScreen from "./views/LoginScreen/LoginScreen";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./views/Home";
import MyAppointments from "./views/myAppointments/MyAppointments";
import RegisterScreen from "./views/RegisterScreen/RegisterScreen";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AboutUs from "./views/AboutUs/About";
import Contact from "./views/contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import { useSelector } from "react-redux";
import Profile from "./views/Profile/Profile";

function App() {
  const location = useLocation();
  const userId = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && location.pathname === "/appointments") navigate("/login");
  }, []);

  return (
    <div>
      {location.pathname !== "/login" ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
