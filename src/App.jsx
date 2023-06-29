import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CreateTask from "./pages/CreateTask";
import Navbar from "./components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Context, server_url } from "./main";

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated, setLoading } =
    useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server_url}/user/me`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.data);
        // navigate("/");
      })

      .catch((e) => {
        setUser({});
        setLoading(false);
        setIsAuthenticated(false);
        console.log(window.location.pathname);
        if (window.location.pathname !== "/register") {
          navigate("/login");
        }
        // naviagte("/login");
        // toast.error(e.response.data.error);
      });
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/createTask" element={<CreateTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
