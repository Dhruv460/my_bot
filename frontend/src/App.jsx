// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import './index.css';
import { AuthProvider } from './AuthContext';
import RegisterForm from './components/RegisterForm.jsx';
import Login from './components/Login.jsx';
import ChatAi from './components/ChatAi.jsx';
import ThemeProvider from './ThemeContext.jsx';
const AppContent = () => {

const userId = localStorage.getItem('userId')

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<RegisterForm />} />
       
        <Route path="/login" element={<Login />} />
       
        <Route path="/chatAi" element={<ChatAi/>} />
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
