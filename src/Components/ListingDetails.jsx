import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaStar,
} from "react-icons/fa";
import Contact from "./Contact";
import Review from "./Review";

const removeParamsFromUrl = () => {
  const urlWithoutParams = window.location.pathname;
  window.history.replaceState({}, document.title, urlWithoutParams);
};

const ListingDetails = () => {
  SwiperCore.use([Navigation]);
  const { currentUser, token } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [pay, setPay] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/listing/get/${params.listingId}`
        );
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);

        setLoading(false);
        setError(false);
        if (data.userRef === currentUser?._id) {
          setPay(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    const updateListing = async () => {
      try {
        setLoading(true);
        console.log("params", params.listingId);
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/listing/updatePayment/${
            params.listingId
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              session_ID: success,
              user_id: currentUser._id,
            }),

            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Response was not ok!");
        }
        const data = await res.json();
        setListing(data);
        setLoading(false);
        setError(false);
        setPay(false);
        removeParamsFromUrl();
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    if (success) {
      console.log("success", success);
      updateListing();
    } else {
      fetchListing();
    }
  }, []);

  const createOrder = async () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/create-checkout-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...listing }),
        }
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      console.log(data);
      window.location.href = data?.session;
      // const data = await res.json();
      console.log(res);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {/* ToDo add listing.condition to the database for Sold or Rented */}
                {listing.condition === "rented"
                  ? "Rented"
                  : listing.condition === "sold"
                  ? "Sold"
                  : listing.type === "rent"
                  ? "For Rent"
                  : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 p-3 hover:shadow-md"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
            {!listing.condition && pay && (
              <button
                className="bg-green-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                onClick={createOrder}
              >
                Checkout
              </button>
            )}
            {listing.previousBuyers.find((e) => e === currentUser?._id) && (
              <Review reviews={listing.reviews} setListing={setListing} />
            )}

           {listing.reviews.length != 0 &&
              <div>
                <p className="text-3xl font-semibold mb-4">Reviews</p>
                <div className="mb-4">
                  {listing.reviews.map((review, i) => (
                    <div key={i} className="flex items-center gap-2 mb-4">
                      <img
                        src={review.avatar}
                        className="w-14 h-14 rounded-full mr-2"
                        alt="Reviewer Avatar"
                      />
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          <p className="text-lg font-semibold">{review.name}</p>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, i) => i).map((star, index) => (
                              <FaStar
                                key={index}
                                className={
                                  index + 1 <= review.rating
                                    ? `text-yellow-500`
                                    : `text-gray-300`
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {listing.reviews.length > 1 && <div className="border-t border-gray-300"></div>}
                
              </div>
           }
          </div>
        </div>
      )}
    </main>
  );
};

export default ListingDetails;
