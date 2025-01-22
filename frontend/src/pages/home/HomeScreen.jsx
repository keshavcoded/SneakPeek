import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrending from "../../hooks/useGetTrending";
import {
  BASE_URL,
  MOVIE_CATEGORIES,
  TV_CATEGORIES,
} from "../../utils/constants";
import { useContent } from "../../store/useContent";
import ContentBar from "../../components/ContentBar";
import { useState } from "react";

const HomeScreen = () => {
  const { trendingContent } = useGetTrending();
  const { contentType } = useContent();
  const [imageLoading, setImageLoading] = useState(true);

  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 animation" />
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-screen text-white">
        <Navbar />

        {imageLoading && (<div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 animation"/>)}

        <img
          src={BASE_URL + trendingContent?.backdrop_path}
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => setImageLoading(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "A" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link
              to={contentType === "movie"? `/watchmovie/${trendingContent?.id}`: `/info/${trendingContent?.id}`}
              className="bg-white text-black font-bold py-2 px-4 rounded mr-4 flex items-center hover:bg-white/80 transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>
            <Link
              to={`/info/${trendingContent?.id}`}
              className="bg-gray-500/50 hover:bg-gray-500 text-white py-2 px-4 flex items-center rounded transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Info className="size-6 mr-2" /> More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => <ContentBar key={category} category={category} />)
          : TV_CATEGORIES.map((category) => <ContentBar key={category} category={category} />)}
      </div>
    </div>
  );
};

export default HomeScreen;
