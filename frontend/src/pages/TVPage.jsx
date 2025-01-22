import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import releaseDateConvert from "../utils/dateConvert";
import { BASE_URL, SMALL_BASE_URL } from "../utils/constants";
import Skeleton from "../components/Skeleton";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

const TVPage = () => {
  const { id } = useParams();
  const [similarContent, setSimilarContent] = useState([]);
  const [contentDetails, setContentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const scrollRef = useRef(null);
  const episodeScrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [showEpisodeArrows, setShowEpisodeArrows] = useState(false);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/tv/${id}/details`);
        setContentDetails(response.data.details);
        if (response.data.details.seasons?.length > 0) {
          setSelectedSeason(response.data.details.seasons[0].season_number);
        }
      } catch (e) {
        if (e.message.includes("404")) {
          setContentDetails(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(`/api/v1/tv/${id}/similar`);
        setSimilarContent(response.data.similarContent);
      } catch (e) {
        if (e.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [id]);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleEpisodeSelect = (seasonNum, episodeNum) => {
    setSelectedSeason(seasonNum);
    setSelectedEpisode(episodeNum);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="mx-auto container px-4 py-8 h-full">
        <div className="aspect-video w-full h-[calc(100vh-200px)] p-2 sm:px-10 md:px-32">
          <iframe
            src={`https://embed.su/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`}
            height="100%"
            width="100%"
            className="mx-auto overflow-hidden rounded-lg"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="max-w-6xl mx-auto mt-8">
          <div className="flex items-center gap-4 mb-4">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              {contentDetails.seasons?.map((season) => (
                <option
                  key={season.season_number}
                  value={season.season_number}
                >
                  Season {season.season_number}
                </option>
              ))}
            </select>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setShowEpisodeArrows(true)}
            onMouseLeave={() => setShowEpisodeArrows(false)}
          >
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 p-4"
              ref={episodeScrollRef}
            >
              {contentDetails.seasons?.find(
                (s) => s.season_number === selectedSeason
              )?.episode_count > 0 &&
                Array.from(
                  {
                    length: contentDetails.seasons.find(
                      (s) => s.season_number === selectedSeason
                    ).episode_count,
                  },
                  (_, i) => i + 1
                ).map((episodeNum) => (
                  <div
                    key={episodeNum}
                    onClick={() =>
                      handleEpisodeSelect(selectedSeason, episodeNum)
                    }
                    className={`flex-none w-48 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ${
                      selectedEpisode === episodeNum
                        ? "ring-2 ring-SneakpeekGreen"
                        : ""
                    }`}
                  >
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={SMALL_BASE_URL + contentDetails?.backdrop_path}
                        alt={`Episode ${episodeNum}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                        <p className="text-sm">Episode {episodeNum}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {showEpisodeArrows && (
              <>
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-10 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                  onClick={() => scrollLeft(episodeScrollRef)}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-10 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                  onClick={() => scrollRight(episodeScrollRef)}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto mt-8">
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
            <div className="flex mt-8">
              <Link
                to={`/info/${contentDetails?.id}`}
                className="bg-gray-500/50 hover:bg-gray-500 text-white py-2 px-4 flex items-center rounded transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <Info className="size-6 mr-2" /> More Info
              </Link>
            </div>
          </div>
          <img
            src={BASE_URL + contentDetails.poster_path}
            alt="poster-image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similarContent.length > 0 && (
          <div
            className="mt-12 max-w-6xl mx-auto relative"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
          >
            <h3 className="text-3xl font-bold mb-4">
              Similar Movies and TV Shows
            </h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4"
              ref={scrollRef}
            >
              {similarContent.map((content) => (
                <Link
                  key={content.id}
                  to={`/watchmovie/${content.id}`}
                  className="w-52 flex-none group"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={SMALL_BASE_URL + content.poster_path}
                      alt="poster-img"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110 w-full h-auto"
                    />
                  </div>
                  <h4 className="mt-2 text-lg font-semibold">
                    {content.title || content.name}
                  </h4>
                </Link>
              ))}
              {showArrows && (
                <>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 left-5 md:left-30 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                    onClick={() => scrollLeft(scrollRef)}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-5 md:right-30 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                    onClick={() => scrollRight(scrollRef)}
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVPage;
