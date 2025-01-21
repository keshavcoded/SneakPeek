import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_BASE_URL } from "../utils/constants";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const dateFormat = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day} ${year}`;
};

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const response = await axios.get(`/api/v1/search/history`);
      setSearchHistory(response.data.content);
    };
    getHistory();
  }, []);

  const deleteHistory = async (his) => {
    try {
      await axios.delete(`/api/v1/search/history/${his.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== his.id));
    } catch (err) {
      toast.error("An error occured");
      console.log("Error while deleting history", err);
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((his) => {
            return (
              <div
                key={his.id}
                className="bg-gray-900 p-4 rounded flex items-start"
              >
                <img
                  src={SMALL_BASE_URL + his.image}
                  alt="history-img"
                  className="size-16 rouned-full object-cover mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-white text-lg">{his.title}</span>
                  <span className="text-gray-400 text-sm">
                    {dateFormat(his.createdAt)}
                  </span>
                </div>
                <span
                  className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                    his.searchType === "movie"
                      ? "bg-green-600"
                      : his.searchType === "tv"
                      ? "bg-yellow-600"
                      : "bg-blue-600"
                  }`}
                >
                  {his.searchType === "movie"
                    ? "Movie"
                    : his.searchType === "tv"
                    ? "TV show"
                    : "Actor"}
                </span>
                <Trash2
                  className="size-5 ml-4 cursor-pointer hover:text-red-700 transition-transform duration-300 ease-in-out hover:scale-110"
                  onClick={() => deleteHistory(his)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
