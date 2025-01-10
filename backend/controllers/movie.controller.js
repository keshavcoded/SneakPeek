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
    console.log(
      "Error while fetching trending : movie controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieTrailers(req, res) {
  try {
    const { id } = req.params;

    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    return res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log("Error in trailer fetch : movie controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieDetails(req, res) {
  try {
    const { id } = req.params;

    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    return res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(
      "Error while fetching: details : movie controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarMovies(req, res) {
  try {
    const { id } = req.params;

    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );

    return res
      .status(200)
      .json({ success: true, similarContent: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(400).send(null);
    }
    console.log(
      "Error while fetching: similar content : movie controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "internal Server Error" });
  }
}

export async function getMoviebyCategory(req, res) {
  try {
    const { category } = req.params;

    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(
      "Error while fetching category: movie controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}
