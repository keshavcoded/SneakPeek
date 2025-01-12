import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContent } from "../store/useContent";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft } from "lucide-react";

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

  console.log("trailers", trailers);
  console.log("similar", similarContent);
  console.log("details", contentDetails);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="mx-auto container px-4 py-8 h-full">
        {trailers?.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover-bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "hidden" : ""
              }`}
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
