import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import "./index.css";
import { AuthProvider } from "./AuthContext";
import RegisterForm from "./components/RegisterForm.jsx";
import Login from "./components/Login.jsx";
import ChatAi from "./components/ChatAi.jsx";
import ThemeProvider from "./ThemeContext.jsx";
import MovingLine from "./components/MovingLine.jsx";
import Type from "./components/type.jsx";
const AppContent = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Header />
      {/* {!userId && <Type />} */}
      <Routes>
        {/* <Route path="/" element={<RegisterForm />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/chatAi" element={<ChatAi />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <AppContent />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
