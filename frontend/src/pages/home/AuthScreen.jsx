import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormsubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <div className="home-bg relative">
      {/* header */}

      <header className="flex-col min-[350px]:flex-row max-w-7xl mx-auto flex items-center justify-between p-4 pb-10">
        <Link to={"/"}>
          <img
            src="/logos.png"
            alt="sneakpeek-logo"
            className="w-40 sm:w-60 h-10 sm:h-14"
          />
        </Link>
        <Link
          to={"/signin"}
          className="text-white bg-SneakpeekGreen py-1 px-3 rounded font-medium hover:bg-green-700"
        >
          Sign In
        </Link>
      </header>

      {/* hero-section */}

      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          <span className="text-SneakpeekGreen">Peek</span> into unlimited
          movies and TV show contents
        </h1>
        <p className="text-sm md:text-xl mb-4">
          Sign up and watch for free and enjoy.
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormsubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button className="bg-SneakpeekGreen rounded font-semibold text-md lg:text-lg px-2 lg:px-6 py-1 md:py-2 flex justify-center items-center hover:bg-green-700">
            Get started <ChevronRight className="size-6 md:size-8" />
          </button>
        </form>
      </div>
      {/* seprator */}
      <div className="h-2 w-full section-bg mt-16" aria-hidden="ture"></div>
      {/* next section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-7xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch anytime, anywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV show content on your phone, tablet
              and laptop
            </p>
          </div>
          {/* right */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-list2.PNG"
              alt="img-devices"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[62%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/device-video (1).m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
