import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContent } from "../store/useContent";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player";

const MoviePage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const { contentType } = useContent();
  const [similarContent, setSimilarContent] = useState([]);
  const [contentDetails, setContentDetails] = useState({});
  const [loading, setLoading] = useState(true);

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

  console.log(trailers, similarContent, contentDetails);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="mx-auto container px-4 py-8 h-full">
        <div className="aspect-video w-full h-[calc(100vh-200px)] p-2 sm:px-10 md:px-32">
          <iframe
            src={`https://embed.su/embed/movie/${id}`}
            height="100%"
            width="100%"
            className="mx-auto overflow-hidden rounded-lg"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
