import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContent } from "../store/useContent";

const SearchPage = () => {
  const [searchState, setSearchstate] = useState("movie");
  const { setContentType } = useContent();

  const changeTypes = (tab) => {
    setSearchstate(tab);
    if (tab === "movie") {
      setContentType("movie");
    } else if (tab === "tv") {
      setContentType("tv");
    }
  };
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              searchState === "movie" ? "bg-SneakpeekGreen" : "bg-gray-700"
            } hover:bg-green-700`}
            onClick={() => changeTypes("movie")}
          >
            Movies
          </button>
          <button
            className={`px-4 py-2 rounded ${
              searchState === "tv" ? "bg-SneakpeekGreen" : "bg-gray-700"
            } hover:bg-green-700`}
            onClick={() => changeTypes("tv")}
          >
            TV Shows
          </button>
          <button
            className={`px-4 py-2 rounded ${
              searchState === "person" ? "bg-SneakpeekGreen" : "bg-gray-700"
            } hover:bg-green-700`}
            onClick={() => changeTypes("person")}
          >
            Actors
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
