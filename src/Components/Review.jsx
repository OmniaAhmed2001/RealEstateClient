/** @format */

import { useState } from "react";
import { useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function Review({ reviews, setListing }) {
  const [rating, setrating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(false);
  const { listingId } = useParams();
  const { currentUser, token } = useSelector((state) => state.user);


  const handlerating = (i) => {
    setrating(() => i + 1);
  };
  const handleOnHover = (i) => {
    setTempRating(() => i + 1);
  };
  const handleOnLeave = () => {
    setTempRating(0);
  };
  const handleAddReview = async () => {
    setError(false)
    // console.log("entereing addreview");
    try {
      if (!rating || !comment) {
        return setError("Complete Your Review Before Submit");
      }

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/review/${listingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          credentials: "include",
          body: JSON.stringify({
            id: currentUser._id,
            email: currentUser.email,
            name: currentUser.username,
            comment,
            rating,
            avatar: currentUser.avatar
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return
      }
      // console.log("reviewwwww", data);
      setListing(data);
      setrating(0);
      setComment("");
      setError(false)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col lg:w-[60 %] md:w-[100%] w-[100%] mx-auto p-4 rounded-2xl my-8 bg-[#FEFBF6] shadow-xl">
  
      <h1 className="text-2xl font-semibold ms-3 mb-4  text-[#252525]">
         Leave a Review
      </h1>
  
      <div className="flex items-center justify-center gap-5 w-fit ps-2 rounded-full bg-[#FDF5E8] border-2 border-[#FFCB74]" style={{margin: '0 auto'}}> 
        <div role="button" className="flex gap-1 p-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i}>
              {rating > i || tempRating > i ? (
                <FaStar
                  onClick={() => handlerating(i)}
                  onMouseLeave={handleOnLeave}
                  style={{ fill: "#ffcd3c", fontSize: "25px" }}
                />
              ) : (
                <CiStar
                  onClick={() => handlerating(i)}
                  onMouseEnter={() => handleOnHover(i)}
                  onMouseLeave={handleOnLeave}
                  style={{
                    color: "#ffcd3c",
                    fontSize: "25px",
                    strokeWidth: "1px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <span
          style={{ borderRadius: "50%", width: "42px", height: "42px" }}
          className="bg-[#FFCB74] text-lg text-white text-center font-bold border-[#ffcd3c] border-2 flex items-center justify-center"
        >
          {tempRating || rating || ""}
        </span>
      </div>
  
      <div className="flex flex-col mt-4">
        <div style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
          
          <textarea
            className="rounded-xl p-4 border hover:border-ffcb74 reviewTextArea"
            placeholder="Write Your Comment..."
            style={{ paddingLeft: '20px', resize: 'none', width: '93%' }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            
          />
        </div>
  
         <div className="flex justify-center items-center">
            <button
              type="button"
              className="h-9 mt-3.5 flex items-center justify-center text-white disabled:opacity-80 rounded-lg hover:shadow-md  bg-ffb534 uppercase hover:opacity-90 p-3"
              onClick={handleAddReview}
              style={{width:"93%"}}
            >
              {reviews?.find((r) => r.id === currentUser._id)
                ? "Edit Review"
                : "Submit Review"}
            </button>
         </div>
          <p className="text-red-500 text-sm">{error}</p>
      </div>
    </div>
  );
  
}

