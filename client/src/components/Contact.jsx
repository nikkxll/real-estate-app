import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [errorLandlord, seterrorLandlord] = useState(false);
  const [message, setMessage] = useState(
    `Hi!\nI am very interested in your listing and would like to learn more about the property you are offering.`
  );

  useEffect(() => {
    const fetchUser = async () => {
      seterrorLandlord(false);
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        if (data.success === false) {
          seterrorLandlord("Error iccured, please try again");
          return;
        }

        setLandlord(data);
      } catch (error) {
        seterrorLandlord("Error iccured, please try again");
      }
    };

    fetchUser();
  }, [listing.userRef]);

  return (
    <>
      {landlord ? (
        <>
          <div className="flex flex-col mx-auto p-6 pt-0">
            <p className="m-4">
              Contact{" "}
              <span className="font-semibold lowercase">
                {landlord.username}
              </span>{" "}
              for{" "}
              <span className="font-semibold lowercase">{listing.name}:</span>
            </p>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              id="message"
              className="border p-3 rounded-xl"
              placeholder="Text"
              rows="3"
              value={message}
            ></textarea>
            <Link
              to={`mailto:${landlord.email}?subject=${listing.name}&body=${message}`}
              className="bg-slate-700 p-3 mt-5 text-white
            rounded-xl uppercase hover:opacity-90
            disabled:opacity-70 lg:w-[440px] md:w-[330px] mx-auto flex justify-center"
            >
              Send message
            </Link>
          </div>
        </>
      ) : (
        <p className="text-red-500 font-semibold p-3 ml-7">{errorLandlord}</p>
      )}
    </>
  );
}
