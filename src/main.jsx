import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Users from "./pages/Users/Users.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
