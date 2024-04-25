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
// import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/Create-Listing/Create-Listing";
import Listing from "./Pages/Listing/Listing";
import AllLists from "./Pages/AllLists/AllLists";

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
        {/* <Route element={<PrivateRoute/>}> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/listing" element={<Listing />}>
          <Route path="" element={<CreateListing />} />
          <Route path="allLists" element={<AllLists />} />
        </Route>
        {/* </Route> */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
