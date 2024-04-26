// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="lg:max-w-5xl sm:max-w-lg mt-28 mb-28 mx-auto bg-fdf5e8 flex flex-col lg:flex-row items-center rounded-2xl">
      <div className="lg:w-1/2">
        <img
          src="../../../public/assets/realestatepicture 3.png"
          className="max-w-full h-auto lg:max-h-full hidden lg:block"
          // style={{ width: "35em", height: "28em" }}
        />
      </div>
      <div className="w-full lg:w-1/2 px-7 py-7 space-y-8">
        <h1 className="text-3xl text-start font-semibold my-7">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center space-y-2"
        >
          <input
            type="text"
            placeholder="Enter your username"
            className="border px-4 py-2 rounded-lg w-full text-7c7872"
            id="username"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-4 py-2 rounded-lg w-full text-7c7872"
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex flex-col items-center justify-center gap-1 mt-5 lg:flex-row">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-black font-medium hover:underline">
              Sign In
            </span>
          </Link>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
