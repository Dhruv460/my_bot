import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typewriter from "typewriter-effect";

const Type = () => {
  return (
    <div className="bg-transparent">
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 tracking-wide">
        <Typewriter
          options={{
            strings: [
              "Please sign in to continue...",
              "Welcome back!",
              "Secure authentication required",
              "Please verify your identity",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
            typeSpeed: 50,
            delay: 50,
            cursor: "|",
            pauseFor: 1500,
          }}
        />
      </div>
    </div>
  );
};

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://a-friendly-bot.onrender.com/api/users/login",
        loginData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("username", response.data.username);

      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful!", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/chatAi");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Invalid email or password");
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://a-friendly-bot.onrender.com/api/users/register",
        {
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
        }
      );

      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("username", response.data.username);

      window.dispatchEvent(new Event("storage"));
      toast.success("signup successful!", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/chatAi");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Error creating account. Please try again."
      );
      toast.error("Failed to signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6]">
      <ToastContainer />
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 p-4">
        <div className="w-full md:w-2/5 mb-8 md:mb-0">
          <Type />
          <ToastContainer />
        </div>

        <div className="w-full md:w-3/5 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="relative">
            <div className="text-3xl font-semibold text-center mb-8">
              {isSignup ? "Create Account" : "Welcome Back"}
            </div>

            {error && (
              <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <div className="relative flex h-12 mb-6 border border-gray-300 rounded-2xl overflow-hidden">
              <label
                className={`flex-1 text-center leading-[48px] cursor-pointer ${
                  !isSignup ? "text-white" : "text-black"
                }`}
                onClick={() => {
                  setIsSignup(false);
                  setError("");
                }}
              >
                Login
              </label>
              <label
                className={`flex-1 text-center leading-[48px] cursor-pointer ${
                  isSignup ? "text-white" : "text-black"
                }`}
                onClick={() => {
                  setIsSignup(true);
                  setError("");
                }}
              >
                Signup
              </label>
              <div
                className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] rounded-2xl transition-all duration-300 ease-in-out ${
                  isSignup ? "left-1/2" : "left-0"
                }`}
              />
            </div>

            {/* Forms */}
            <div className="overflow-hidden">
              <div
                className="transition-all duration-300 ease-in-out"
                style={{
                  transform: `translateX(${isSignup ? "-50%" : "0"})`,
                  width: "200%",
                  display: "flex",
                }}
              >
                <div className="w-1/2 pr-4">
                  <form onSubmit={handleLogin}>
                    <div className="mb-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className="w-full h-12 px-4 text-lg border border-gray-300 rounded-2xl focus:border-[#1a75ff] outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="w-full h-12 px-4 text-lg border border-gray-300 rounded-2xl focus:border-[#1a75ff] outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="text-right mb-6">
                      <a href="#" className="text-[#1a75ff] hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 relative rounded-2xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 w-[300%] bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] transition-all duration-300 ease-in-out group-hover:translate-x-[-33.33%]" />
                      <span className="relative z-10 text-white text-lg font-medium">
                        {loading ? (
                          <ClipLoader color="#fff" size={20} />
                        ) : (
                          "Login"
                        )}
                      </span>
                    </button>
                  </form>
                </div>

                {/* Signup Form */}
                <div className="w-1/2 pl-4">
                  <form onSubmit={handleSignup}>
                    <div className="mb-6">
                      <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        value={signupData.username}
                        onChange={handleSignupChange}
                        className="w-full h-12 px-4 text-lg border border-gray-300 rounded-2xl focus:border-[#1a75ff] outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        className="w-full h-12 px-4 text-lg border border-gray-300 rounded-2xl focus:border-[#1a75ff] outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        className="w-full h-12 px-4 text-lg border border-gray-300 rounded-2xl focus:border-[#1a75ff] outline-none transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 relative rounded-2xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 w-[300%] bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] transition-all duration-300 ease-in-out group-hover:translate-x-[-33.33%]" />
                      <span className="relative z-10 text-white text-lg font-medium">
                        {loading ? (
                          <ClipLoader color="#fff" size={20} />
                        ) : (
                          "Signup"
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
