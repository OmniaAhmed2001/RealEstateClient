/** @format */

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";

// import { useState } from "react";
// import { Rating } from "react-simple-star-rating";
// Review.prototype({
//     id.prototype:number;
// })
const reducer = (state, action) => {
  console.log(state, action);
  return state - action.payload;
};
export default function Review() {
  const [rate, setRate] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [comment, setComment] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const [count, dispatch] = useReducer(reducer, 0);
  const [error, setError] = useState(false);
  const { token } = useSelector((state) => {
    return state.user;
  });
  const [review, setReview] = useState({
    finalComment: "",
    finalRate: 0,
  });
  const handleRate = (i) => {
    setRate(() => i + 1);
  };
  const handleOnHover = (i) => {
    setTempRating(() => i + 1);
  };
  const handleOnLeave = () => {
    setTempRating(0);
  };
  const handleAddReview = async () => {
    dispatch({ payload: -1 });
    try {
      if (!rate || !comment) {
        return setError("Complete Your Review Before Submit");
      }
      setReview({ finalComment: comment, finalRate: rate });

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/review/${1005}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          credentials: "include",
          body: JSON.stringify(review),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
    setReviewed(true);
  };

  return (
    <div className="flex flex-col ms-4 bg-slate-100 lg:w-[35%] md:w-[75%] w-[90%] sm:mx-auto lg:mx-3 md:mx-3 p-8 rounded-2xl shadow-xl my-8">
      <h1 className="font-bold text-3xl ms-3 mb-4 hover:underline text-[#252525]">
        {reviewed ? "Users Reviews" : "Review"}
      </h1>
      {!reviewed ? (
        <div className="flex flex-col gap-3">
          <div className="ms-2 font-semibold flex items-center">
            <FaRegCommentDots className=" mr-2" style={{color:"#3C6EFF"}} />
            <p className="text-[#252525]"> Write Your Comment</p>
          </div>
          <textarea
            className="w-full rounded-xl p-4 border border-[#FDF5E8] hover:border-[#cdb183] reviewTextArea"
            placeholder="Comment"
            style={{ resize: "none" }}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex items-center gap-5 w-fit ps-2 rounded-full bg-[#FDF5E8] border-2 border-[#FFCB74]">
            <div role="button" className="flex gap-1 p-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i}>
                  {rate > i || tempRating > i? (
                    <FaStar onClick={()=>handleRate(i)} onMouseLeave={handleOnLeave} style={{ fill: "#ffcd3c", fontSize: "25px" }}/>
                  ) : (
                    <CiStar
                    onClick={()=>handleRate(i)} 
                    onMouseEnter={()=>handleOnHover(i)} 
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
              {tempRating || rate || ""}
            </span>
          </div>
          <button
            type="button"
            className="h-9 flex items-center justify-center w-36 text-white font-bold disabled:opacity-80 rounded-lg hover:shadow-md  bg-[#F1843E]"
            onClick={handleAddReview}
          >
            Add Review
          </button>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="font-bold text-xl">Comment : </h1>
            <p>" {review.finalComment} "</p>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-2">Rate : </h1>

            <div className="flex gap-1">
              {/* {Array.from({ length: 5 }, (_, i) => (
                <FontAwesomeIcon
                  icon="fa-light fa-star"
                  key={i}
                  style={
                    rate >= i + 1 ? { color: "#fcc419" } : { color: "#252525" }
                  }
                  />
              ))} */}
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i}>
                  {rate > i || tempRating > i? (
                    <FaStar  style={{ fill: "#ffcd3c", fontSize: "25px" }}/>
                  ) : (
                    <CiStar
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
          </div>
        </div>
      )}
    </div>
  );
}
