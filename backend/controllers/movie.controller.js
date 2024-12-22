import { fetchFromAPI } from "../services/tmdb.service.js";

export async function getTrendingmovie(req, res) {
  try {
    const data = await fetchFromAPI(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.log("Error in movie controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
