"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
// import Logo from "./logo.png";

import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const res = await axios.post("/api/login", { email, pass });
      if (res.status === 200) {
        alert("Login Successful ✅");
        router.push("/customer");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        alert("User not found! Please create an account first.");
      } else if (err.response?.status === 401) {
        alert("Incorrect password ❌");
      } else {
        alert("Something went wrong!");
      }
    } finally {
      setLoading(false); // stop loader
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const res = await axios.post("/api/users", { email, pass });
      if (res.status === 200) {
        alert("Account created successfully! Now you can login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Signup failed or user already exists.");
      console.error(err);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (<>

    {loading && (
      <div className="loader-backdrop">
        <div className="loader"></div>
      </div>
    )}


    <div className="split-screen">
      <div className="left-panel">
        <img src="./logo.png" alt="Logo" className="logo" />
        <h1 className="promo-text">
          <span className="highlight">Calculate</span> your Bills easily with Us.
        </h1>
      </div>

      <div className="right-panel">
        {isLogin ? (
          <>
            <h2>Welcome to BillDesk</h2>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p className="switch">
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Create account</span>
            </p>
          </>
        ) : (
          <>
            <h2>Create a New Account</h2>
            <form onSubmit={handleSignup} className="login-form">
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
            <p className="switch">
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login here</span>
            </p>
          </>
        )}
      </div>
    </div>
  </>
  );
}
