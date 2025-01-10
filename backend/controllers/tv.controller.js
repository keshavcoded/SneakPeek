import { fetchFromAPI } from "../services/tmdb.service.js";

export async function getTrendingTV(req, res) {
  try {
    const data = await fetchFromAPI(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomShow =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.status(200).json({ success: true, content: randomShow });
  } catch (error) {
    console.log(
      "Error while fetching trending tv show: TV controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getTrailersTV(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    return res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(
      "Error while fetching TV show trailers: TV controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getDetailsTV(req, res) {
  try {
    const { id } = req.params;

    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    return res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(
      "Error while fetching tv details: tv contoller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarTV(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    return res.status(200).json({ success: true, similarContent: data.results });
  } catch (error) {
    console.log(
      "Error while fetching smilar tv : tv controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getTvbyCategory(req, res) {
  try {
    const { category } = req.params;
    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log("Error while fetching category content;; tv controller");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
