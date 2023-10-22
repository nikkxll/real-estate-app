import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingsBlock from "../components/ListingsBlock";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/search?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/search?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/search?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-3 sm:gap-6 p-28 sm:pb-20 pb-10 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Follow your <span className="text-slate-500">dreams</span>
          <br />
        </h1>
        <h1 className="text-slate-700 font-bold text-2xl lg:text-5xl">we will do the rest</h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          NikkelEstate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>
      <Swiper
        navigation
        loop={true}
        speed={1500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imagesURL[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-5 sm:my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 font-bold hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <Swiper
              navigation
              loop={true}
              speed={1500}
              spaceBetween={15}
              slidesPerView={2}
            >
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <ListingsBlock listing={listing} key={listing._id} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 font-bold hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <Swiper
              navigation
              loop={true}
              speed={1500}
              spaceBetween={15}
              slidesPerView={2}
            >
              {rentListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <ListingsBlock listing={listing} key={listing._id} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 font-bold hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <Swiper
              navigation
              loop={true}
              speed={1500}
              spaceBetween={15}
              slidesPerView={2}
            >
              {saleListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <ListingsBlock listing={listing} key={listing._id} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
