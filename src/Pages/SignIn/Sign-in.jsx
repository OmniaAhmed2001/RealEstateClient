import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import OAuth from "../../Components/OAuth";

export default function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error, token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="lg:max-w-5xl sm:max-w-lg mt-28 mb-36 mx-auto bg-fdf5e8 flex flex-col lg:flex-row items-center rounded-2xl">
      <div className="lg:w-1/2">
        <img
          src="/assets/realestatepicture 2.png"
          className="max-w-full h-auto lg:max-h-full hidden lg:block"
        />
      </div>
      <div className="w-full lg:w-1/2 px-7 py-7 space-y-8">
        <h1 className="text-3xl text-start font-semibold my-7">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center space-y-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-4 py-2 rounded-lg w-full text-7c7872"
            // style={{ color: "#7c7872", fontWeight: "lighter" }}
            id="email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border px-4 py-2 rounded-lg w-full text-7c7872"
            id="password"
            required
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-ffc45d text-white py-2 px-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex flex-col items-center justify-center gap-1 mt-5 lg:flex-row">
          <p>Don&apos;t have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-black font-medium hover:underline">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
