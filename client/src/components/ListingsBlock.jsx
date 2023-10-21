import { Link } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaDog,
  FaHome,
} from "react-icons/fa";

export default function ListingsBlock({ listing }) {
  const cleanedDescription = listing.description.replace(/"/g, "");

  return (
    <div className="bg-white hover:shadow-2xl transition-hover duration-300 overflow-hidden rounded-xl">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imagesURL[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[250px] w-full object-cover hover:scale-105 hover:shadow-2xl transition-scale duration-300"
        />
        <div className="p-3">
          <p className="text-xl font-semibold text-slate-700 truncate">{listing.name}</p>
          <p className="flex items-center mt-2 gap-1 text-black text-sm">
            <FaMapMarkerAlt className="text-green-700" />
            {listing.address}
          </p>
          <div className="line-clamp-2 max-w-md">
            <p className="mt-3 text-black text-sm">
              {cleanedDescription}
            </p>
          </div>
          <p className="text-xl mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <ul className="font-semibold text-sm flex flex-row mt-3 sm:gap-4">
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
                <FaParking className="text-green-700" />
              ) : (
                <FaParking className="text-red-700" />
              )}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              {listing.furnished ? (
                <FaChair className="text-green-700" />
              ) : (
                <FaChair className="text-red-700" />
              )}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              {listing.petsAllowed ? (
                <FaDog className="text-green-700" />
              ) : (
                <FaDog className="text-red-700" />
              )}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
}
