// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import DashboardMain from "./Pages/Dashboard/Dashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ListingDetails from "./Components/ListingDetails";
import AllListings from "./Pages/AllListingsPage/AllListings";
import ScrollToTop from "./Components/ScrollToTop";
import Error from "./Components/Error";

export default function App() {
  // Check if the current route matches the "Not Found" page

  return (
    <BrowserRouter>
      {<Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-listing" element={<UserListing />}>
            <Route path="allLists" element={<AllLists />} />
            <Route element={<CreateListing />} />
          </Route>
          <Route
            path="/update-listing/:id"
            element={<Update_Listing />}
          ></Route>
        </Route>
        <Route path="/update-listing/:id" element={<Update_Listing />} />
        <Route path="/listing" element={<AllListings />} />
        <Route path="/listing/:listingId" element={<ListingDetails />} />
        <Route path="/about" element={<About />} />

        <Route path="/not-found" element={<Error />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      {<Footer />}

    </BrowserRouter>
  );
}
