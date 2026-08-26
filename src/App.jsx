import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingpage";
import LoginPage from "./auth/login/page";
import SignupPage from "./auth/signup/page";
import ChatPage from "./pages/Chatpage";
import Pricing from "./components/landingpage/Pricing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/pricing" element={< Pricing/>} />
    </Routes>
  );
}

export default App;
