import { User } from "../models/user.model.js";
import { fetchFromAPI } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  try {
    const { query } = req.params;
    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    const currPerson = data.results[0];
    const duplicateEntry = await User.exists({
      _id: req.user._id,
      "searchHistory.id": currPerson.id,
    });

    if (duplicateEntry) {
      return res.status(200).json({ success: true, content: data.results });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in person search : search controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function searchMovies(req, res) {
  try {
    const { query } = req.params;

    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    const currMovie = data.results[0];
    const duplicateEntry = await User.exists({
      _id: req.user._id,
      "searchHistory.id": currMovie.id,
    });

    if (duplicateEntry) {
      return res.status(200).json({ success: true, content: data.results });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in movie search: search controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function searchTV(req, res) {
  try {
    const { query } = req.params;
    const data = await fetchFromAPI(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    const currTV = data.results[0];
    const duplicateEntry = await User.exists({
      _id: req.user._id,
      "searchHistory.id": currTV.id,
    });

    if (duplicateEntry) {
      return res.status(200).json({ success: true, content: data.results });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(
      "Error while seraching movie : search controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    return res
      .status(200)
      .json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log(
      "Error while getting serach history : search controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, messgae: "Internal server error" });
  }
}

export async function deleteSearchHistory(req, res) {
  try {
    let { id } = req.params;
    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Search history item removed" });
  } catch (error) {
    console.log(
      "Error while deleting searchHistory : search controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
