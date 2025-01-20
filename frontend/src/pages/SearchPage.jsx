import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContent } from "../store/useContent";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SearchPage = () => {
  const [searchState, setSearchstate] = useState("movie");
  const { contentType, setContentType } = useContent();
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
    } else if (tab === "person") {
      setResults([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/v1/search/${searchState}/${searchValue}`
      );
      setResults(response.data.content);
    } catch (err) {
      if (err.response.status === 404) {
        toast.error("No results found, please check the category");
      } else {
        toast.error("An error occured");
      }
    }
  };

  console.log(results);
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
        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;
            return (
              <div key={result.id} className="bg-black p-4 rounded">
                {searchState === "person" ? (
                  <Link
                    to={"/actor/" + result.name}
                    className="flex flex-col items-center group"
                  >
                    <img
                      src={BASE_URL + result.profile_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                ) : (
                  <Link
                    to={
                      contentType === "movie"
                        ? `/watchmovie/` + result.id
                        : `/info/` + result.id
                    }
                    className="flex flex-col items-center group"
                  >
                    <img
                      src={BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
