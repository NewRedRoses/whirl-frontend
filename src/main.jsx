import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Users from "./pages/Users/Users.jsx";
import ViewPost from "./pages/ViewPost/ViewPost.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
