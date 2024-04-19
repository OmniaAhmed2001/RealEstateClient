// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import SignIn from "./Pages/SignIn/Sign-in";
import SignOut from "./Pages/SignOut/Sign-out";
import SignUp from "./Pages/SignUp/Sign-up";
import Profile from "./Pages/ProfilePage/Profile";
import About from "./Pages/AboutPage/About";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
