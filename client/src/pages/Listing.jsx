import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

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
        setError(false);
        setListing(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);
  return (
    <main className="mt-[72px]">
      {loading && <p className="text-center my-7 text-md">Loading...</p>}
      {error && (
        <p className="text-center text-red-700 my-7 text-md">
          Something went wrong, please try again
        </p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imagesURL.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{ 
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover', 
                }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
}
