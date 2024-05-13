/** @format */

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { useParams } from "react-router-dom";

// import { useState } from "react";
// import { Rating } from "react-simple-star-rating";
// Review.prototype({
//     id.prototype:number;
// })
// const reducer = (state, action) => {
//   console.log(state, action);
//   return state - action.payload;
// };
export default function Review({ reviews, setListing }) {
  const [rating, setrating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [comment, setComment] = useState(null);
  // const [reviewed, setReviewed] = useState(false);
  // const [count, dispatch] = useReducer(reducer, 0);
  const [error, setError] = useState(false);
  const { listingId } = useParams();
  const { currentUser, token } = useSelector((state) => state.user);

  // const [review, setReview] = useState({
  //   finalComment: "",
  //   finalrating: 0,
  // });
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
    // dispatch({ payload: -1 });
    console.log("entereing addreview");
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
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return
      }
      console.log("reviewwwww", data);
      setListing(data);
      setrating(0);
      setComment("");
      setError(false)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col bg-slate-100 lg:w-[60 %] md:w-[75%] w-[90%] mx-auto  p-8 rounded-2xl shadow-xl my-8">
      <h1 className="font-bold text-3xl ms-3 mb-4 hover:underline text-[#252525]">
         Review
      </h1>

      <div className="flex flex-col gap-3">
        <div className="ms-2 font-semibold flex items-center">
          <FaRegCommentDots className=" mr-2" style={{ color: "#3C6EFF" }} />
          <p className="text-[#252525]"> Write Your Comment</p>
        </div>
        <textarea
          className="w-full rounded-xl p-4 border border-[#FDF5E8] hover:border-[#cdb183] reviewTextArea"
          placeholder="Comment"
          style={{ resize: "none" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-5 w-fit ps-2 rounded-full bg-[#FDF5E8] border-2 border-[#FFCB74]">
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
            className="bg-[#FFCB74] text-lg text-[#3C6EFF] text-center font-bold border-[#ffcd3c] border-2 flex items-center justify-center"
          >
            {tempRating || rating || ""}
          </span>
        </div>
        <button
          type="button"
          className="h-9 flex items-center justify-center w-36 text-white font-bold disabled:opacity-80 rounded-lg hover:shadow-md  bg-[#F1843E]"
          onClick={handleAddReview}
        >
          {reviews?.find((r) => r.id === currentUser._id)
            ? "Edit Review"
            : "Add Review"}
        </button>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    </div>
  );
}
