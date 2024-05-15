import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
   <div className="bg-[#FDD100] flex flex-col items-center justify-center h-screen">
        <div className="h-4/5">
        <img
            src="public/assets/error.jpg"
            alt="Error"
            className="max-w-full max-h-full"
        />
        </div>
        <div>
            <Link to="/">
                <button className="mt-4 px-4 py-2 bg-white text-black rounded-md shadow-md hover:bg-gray-200">
                Go Back to Home
                </button>
            </Link>
        </div>
        
    </div>
  );
};

export default ErrorPage;
