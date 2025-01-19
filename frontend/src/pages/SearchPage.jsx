import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContent } from "../store/useContent";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchState, setSearchstate] = useState("movie");
  const { setContentType } = useContent();
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  const changeTypes = (tab) => {
    setSearchstate(tab);
    if (tab === "movie") {
      setContentType("movie");
      setResults([]);
    } else if (tab === "tv") {
      setContentType("tv");
      setResults([]);
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
        <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={
              "Search for " +
              (searchState === "movie"
                ? "Movies"
                : searchState === "tv"
                ? "TV shows"
                : "Actors")
            }
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-SneakpeekGreen hover:bg-green-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
