import Home from "./pages/Home.js";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Navbar from "../src/components/Navbar.js";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem("token", codeResponse.access_token);
      setToken(localStorage.getItem("token"));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("userid", res.data.email);
          localStorage.setItem("username", res.data.name);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  const logOut = () => {
    googleLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <div>
      <Navbar handleLogout={logOut} />
      <h2>Google Login</h2>
      <br />
      <br />
      {localStorage.getItem("userid") ? (
        <div>
          <Home />
          {console.log(localStorage.getItem("userid"))}
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}

export default App;
