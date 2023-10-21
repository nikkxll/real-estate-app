import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingsBlock from "../components/ListingsBlock";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    furnished: false,
    parking: false,
    petsAllowed: false,
    type: "all",
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({
        ...sidebarData,
        type: e.target.id,
      });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "petsAllowed" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];
      setSidebarData({
        ...sidebarData,
        sort,
        order,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("petsAllowed", sidebarData.petsAllowed);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    const typeUrl = urlParams.get("type");
    const parkingUrl = urlParams.get("parking");
    const furnishedUrl = urlParams.get("furnished");
    const petsAllowedUrl = urlParams.get("petsAllowed");
    const offerUrl = urlParams.get("offer");
    const sortUrl = urlParams.get("sort");
    const orderUrl = urlParams.get("order");

    if (
      searchTermUrl ||
      typeUrl ||
      parkingUrl ||
      petsAllowedUrl ||
      furnishedUrl ||
      offerUrl ||
      sortUrl ||
      orderUrl
    ) {
      setSidebarData({
        searchTerm: searchTermUrl || "",
        type: typeUrl || "all",
        parking: parkingUrl === "true" ? true : false,
        furnished: furnishedUrl === "true" ? true : false,
        petsAllowed: petsAllowedUrl === "true" ? true : false,
        offer: offerUrl === "true" ? true : false,
        sort: sortUrl || "created_at",
        order: orderUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setError(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/search?${searchQuery}`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }

        setLoading(false);
        setListings(data);
        console.log(listings);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row mt-[20px] sm:mt-[90px]">
      <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-center justify-center">
            <label className="whitespace-nowrap font-semibold text-slate-700">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border m-3 p-3 rounded-xl w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex mt-5">
            <label className="whitespace-nowrap mr-2 font-semibold text-slate-700">
              Type:
            </label>
            <div className="flex gap-3 flex-wrap sm:flex-row">
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="all"
                  checked={sidebarData.type === "all"}
                  onChange={handleChange}
                />
                <p className="whitespace-nowrap">Rent&Sale</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="rent"
                  checked={sidebarData.type === "rent"}
                  onChange={handleChange}
                />
                <p className="whitespace-nowrap">Rent</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="sale"
                  checked={sidebarData.type === "sale"}
                  onChange={handleChange}
                />
                <p className="whitespace-nowrap">Sale</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="offer"
                  checked={sidebarData.offer === true}
                  onChange={handleChange}
                />
                <p className="whitespace-nowrap">Offer</p>
              </div>
            </div>
          </div>
          <div className="flex mt-7">
            <label className="whitespace-nowrap mr-2 font-semibold text-slate-700">
              Amenities:
            </label>
            <div className="flex gap-3 flex-wrap sm:flex-row">
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="parking"
                  checked={sidebarData.parking === true}
                  onChange={handleChange}
                />
                <p>Parking</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="furnished"
                  checked={sidebarData.furnished === true}
                  onChange={handleChange}
                />
                <p>Furnished</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="petsAllowed"
                  checked={sidebarData.petsAllowed === true}
                  onChange={handleChange}
                />
                <p>Pets Allowed</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-7">
            <label className="font-semibold text-slate-700">Sort:</label>
            <select
              id="sort_order"
              className="p-1 rounded-md border"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button
            disabled={loading}
            className="bg-slate-700 p-3 text-white
        rounded-xl uppercase hover:opacity-90 mt-7
        disabled:opacity-70"
          >
            Search
          </button>
        </form>
        <p className="text-red-500 mt-5 font-semibold">
          {error ? "Error occured, please try again" : ""}
        </p>
      </div>
      <div className="flex-1">
        <h1 className="p-6 text-3xl flex justify-center font-semibold border-b text-slate-700">Listing results:</h1>
        <div className="p-7 flex flex-wrap gap-6 justify-center">
          {loading ? (
            <p className="text-xl mt-4 text-slate-700">Loading...</p>
          ) : (
            !loading &&
            listings.length === 0 && (
              <p className="text-xl mt-4 text-slate-700">
                No listings found matching your criteria!
              </p>
            )
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingsBlock key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
}
