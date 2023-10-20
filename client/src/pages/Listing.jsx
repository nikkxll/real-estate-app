import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaCopy,
  FaDog,
  FaHome,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(false);
      try {
        const id = params.id;
        const res = await fetch(`/api/listing/get/${id}`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }

        setLoading(false);
        setListing(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchListing();
  }, []);

  return (
    <main className="mt-[60px] sm:mt-[90px]">
      {loading && <p className="text-center my-7 text-md">Loading...</p>}
      {error && (
        <p className="text-center text-red-700 my-7 text-md">
          Something went wrong, please try again
        </p>
      )}
      <div className="flex flex-col max-w-4xl gap-2 p-6 sm:ml-14">
        <p className="text-3xl font-semibold">
          {listing.name} - ${" "}
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && " / month"}
        </p>
        <p className="flex items-center gap-1 text-slate-700 text-sm">
          <FaMapMarkerAlt className="text-green-700" />
          {listing.address}
        </p>
      </div>
      {listing && !loading && !error && (
        <>
          <Swiper
            navigation
            loop={true}
            speed={1500}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
          >
            {listing.imagesURL.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "90% 100%",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      <div className="fixed top-[22%] right-[5%] sm:top-[15%] sm:right-[3%] z-10 border rounded-full w-8 h-8 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaCopy
          className="text-slate-700"
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
        <p className="fixed top-[28%] right-[1%] sm:top-[21%] sm:right-[1%] z-10 rounded-md bg-slate-200 text-slate-700 p-2">
          Link copied!
        </p>
      )}
      {listing && (
        <>
          <div className="flex justify-center gap-4 mt-6">
            <p className="bg-red-700 w-full max-w-[100px] sm:max-w-[200px] text-white text-center p-1 rounded-md">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            {listing.offer && (
              <p className="bg-yellow-600 w-full max-w-[150px] sm:max-w-[200px] text-white text-center p-1 rounded-md">
                ${+listing.regularPrice - +listing.discountPrice} discount
              </p>
            )}
          </div>
          <ul className="font-semibold text-sm flex flex-wrap justify-center gap-4 mt-6 sm:gap-6">
            <li className="flex items-center gap-1 whitespace-nowrap">
              <FaHome className="text-green-700" />
              <p className="text-green-700 font-semibold">
                {listing.area} m<sup>2</sup>
              </p>
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              <FaBed className="text-green-700" />
              <p className="text-green-700 font-semibold">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} bedrooms`
                  : `${listing.bedrooms} bedroom`}
              </p>
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              <FaBath className="text-green-700" />
              <p className="text-green-700 font-semibold">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms`
                  : `${listing.bathrooms} bathroom`}
              </p>
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              {listing.parking ? (
                <>
                  <FaParking className="text-green-700" />
                  <p className="text-green-700 font-semibold">Parking</p>
                </>
              ) : (
                <>
                  <FaParking className="text-red-700" />
                  <p className="text-red-700 font-semibold">No parking</p>
                </>
              )}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              {listing.furnished ? (
                <>
                  <FaChair className="text-green-700" />
                  <p className="text-green-700 font-semibold">Furnished</p>
                </>
              ) : (
                <>
                  <FaChair className="text-red-700" />
                  <p className="text-red-700 font-semibold">Not furnished</p>
                </>
              )}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              {listing.petsAllowed ? (
                <>
                  <FaDog className="text-green-700" />
                  <p className="text-green-700 font-semibold">Pets allowed</p>
                </>
              ) : (
                <>
                  <FaDog className="text-red-700" />
                  <p className="text-red-700 font-semibold">Pets not allowed</p>
                </>
              )}
            </li>
          </ul>
          <div className="flex flex-col justify-center items-center mx-auto p-6 pb-0">
            <p className="font-semibold text-2xl sm:mt-2">Description:</p>
            <p className="m-4 text-md text-slate-700">{listing.description}</p>
          </div>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button
              onClick={() => setContact(true)}
              className="bg-slate-700 p-3 mb-6 text-white
        rounded-xl uppercase hover:opacity-90
        disabled:opacity-70 lg:w-[440px] md:w-[330px] mx-auto flex justify-center"
            >
              Contact landlord
            </button>
          )}
          {contact && <Contact listing={listing} />}
        </>
      )}
    </main>
  );
}
