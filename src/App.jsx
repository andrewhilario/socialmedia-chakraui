import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/layout/Dashboard";
import NotFound from "./components/layout/NotFound";
import Profile from "./components/layout/Profile";
import Comments from "./components/comments/index";

// Theme
import "@fontsource/plus-jakarta-sans";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:uid" element={<Profile />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
