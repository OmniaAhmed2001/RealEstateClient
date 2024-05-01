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
import Footer from "./Components/Footer";
import Favorites from "./Pages/FavoritePage/Favorites";
import CreateListing from "./Pages/Create-Listing/Create-Listing";
import UserListing from "./Pages/User-Listing/UserListing";
import AllLists from "./Pages/AllLists/AllLists";
import Update_Listing from "./Pages/UpdateListing/UpdateListing";
import Dashboard from "./Pages/Dashboard/Dashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ListingDetails from "./Components/ListingDetails";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "A2lYcpMi.5XbIzphQvMaYKPXFTf7ATbDaTcItSyau24DygRZdN89B-nP",
  currency: "USD",
  intent: "capture",
};

export default function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<PrivateRoute />}>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-listing" element={<UserListing />}>
              <Route path="" element={<CreateListing />} />
              <Route path="allLists" element={<AllLists />} />
            </Route>
            <Route
              path="/update-listing/:id"
              element={<Update_Listing />}
            ></Route>
          </Route>
          <Route path="/listing/:listingId" element={<ListingDetails />} />

          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}
