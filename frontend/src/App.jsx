import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import MoviePage from "./pages/MoviePage";

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
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/watchmovie/:id"
          element={user ? <MoviePage /> : <Navigate to={"/signin"} />}
        />
      </Routes>
      <Toaster
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />
    </>
  );
}

export default App;
