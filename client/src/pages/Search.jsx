import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row mt-[20px] sm:mt-[90px]">
      <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col">
          <div className="flex items-center justify-center">
            <label className="whitespace-nowrap font-semibold text-slate-700">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border m-3 p-3 rounded-xl w-full"
            />
          </div>
          <div className="flex mt-5">
            <label className="whitespace-nowrap mr-2 font-semibold text-slate-700">Type:</label>
            <div className="flex gap-3 flex-wrap sm:flex-row">
              <div className="flex gap-1">
                <input type="checkbox" />
                <p className="whitespace-nowrap">Rent&Sale</p>
              </div>
              <div className="flex gap-1">
                <input type="checkbox" />
                <p className="whitespace-nowrap">Rent</p>
              </div>
              <div className="flex gap-1">
                <input type="checkbox" />
                <p className="whitespace-nowrap">Sale</p>
              </div>
              <div className="flex gap-1">
                <input type="checkbox" />
                <p className="whitespace-nowrap">Offer</p>
              </div>
            </div>
          </div>
          <div className="flex mt-7">
            <label className="whitespace-nowrap mr-2 font-semibold text-slate-700">Amenities:</label>
            <div className="flex gap-3 flex-wrap sm:flex-row">
              <div className="flex gap-1">
                <input type="checkbox" />
                <p>Parking</p>
              </div>
              <div className="flex gap-1">
                <input type="checkbox" />
                <p>Furnished</p>
              </div>
              <div className="flex gap-1">
                <input type="checkbox" />
                <p>Pets Allowed</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-7">
            <label className="font-semibold text-slate-700">Sort:</label>
            <select id="sort-order" className="p-1 rounded-md border">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 p-3 text-white
        rounded-xl uppercase hover:opacity-90 mt-7
        disabled:opacity-70">Search</button>
        </form>
      </div>
      <div className="p-6 text-3xl font-semibold border-b text-slate-700">
        <h1>Listing results:</h1>
      </div>
    </div>
  );
}
