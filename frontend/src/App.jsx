import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import MoviePage from "./pages/MoviePage";
import InfoPage from "./pages/InfoPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/404";
import TVPage from "./pages/TVPage";

function App() {
  const { user, authUserCheck, isCheckingAuth } = useAuth();
  console.log("Auth user", user);

  useEffect(() => {
    authUserCheck();
  }, [authUserCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader2 className="animate-spin text-SneakpeekGreen h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signin"
          element={!user ? <SigninPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/info/:id"
          element={user ? <InfoPage /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/watchmovie/:id"
          element={user ? <MoviePage /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/watchtv/:id"
          element={user ? <TVPage /> : <Navigate to={"/signin"} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Toaster
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />
    </>
  );
}

export default App;
