import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/userLogin";
import CaptainLogin from "./pages/CaptainLogin";
import UserSignUp from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import { useContext } from "react";
import { userDataContext } from "./context/UserContext";

export default function App() {
  const user = useContext(userDataContext);
  console.log("🚀 ~ file: App.jsx:12 ~ user:", user);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </div>
  );
}
