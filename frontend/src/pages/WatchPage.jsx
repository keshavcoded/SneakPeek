import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContent } from "../store/useContent";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { BASE_URL } from "../utils/constants";

const releaseDateConvert = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const { contentType } = useContent();
  const [similarContent, setSimilarContent] = useState([]);
  const [contentDetails, setContentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTrailerIdx, setcurrentTrailerIdx] = useState(0);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/trailers`
        );
        setTrailers(response.data.trailers);
      } catch (e) {
        if (e.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [id, contentType]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similar`
        );
        setSimilarContent(response.data.similarContent);
      } catch (e) {
        if (e.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`
        );
        setContentDetails(response.data.details);
      } catch (e) {
        if (e.message.includes("404")) {
          setContentDetails(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const goPrev = () => {
    if (currentTrailerIdx > 0) {
      setcurrentTrailerIdx(currentTrailerIdx - 1);
    }
  };

  const goNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setcurrentTrailerIdx(currentTrailerIdx + 1);
    }
  };
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="mx-auto container px-4 py-8 h-full">
        {trailers?.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover-bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-60" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={goPrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover-bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={goNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}
        </div>
        {/* movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {contentDetails?.title || contentDetails?.name}
            </h2>
            <p className="mt-2 text-lg">
              {releaseDateConvert(
                contentDetails?.release_date || contentDetails?.first_air_date
              )}{" "}
              |{" "}
              {contentDetails?.adult ? (
                <span className="text-red-700">A</span>
              ) : (
                <span className="text-green-700">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{contentDetails?.overview}</p>
          </div>
          <img
            src={BASE_URL + contentDetails.poster_path}
            alt="poster-image"
            className="max-h-[600px] rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
