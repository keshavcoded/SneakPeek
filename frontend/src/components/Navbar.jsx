import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuth } from "../store/useAuth"
import { useContent } from "../store/useContent";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState();
  const {user,signout} = useAuth();
  const {setContentType} = useContent();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/logos.png"
            alt="logo"
            className="w-40 sm:w-60 h-10 sm:h-14"
          ></img>
        </Link>
        {/* desktops */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to={"/"} className="hover:text-SneakpeekGreen" onClick={() => setContentType("movie")}>
            Movies
          </Link>
          <Link to={"/"} className="hover:text-SneakpeekGreen" onClick={() => setContentType("tv")}>
            TV shows
          </Link>
          <Link to={"/history"} className="hover:text-SneakpeekGreen">
            Search history
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-7 cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-125" />
        </Link>
        <img src={user.image} alt="profile-pic" className="h-8 rounded cursor-pointer"></img>
        <LogOut className="size-7 cursor-pointer" onClick={signout}/>
        <div className="sm:hidden">
            <Menu className="size-7 cursor-pointer" onClick={toggleMobileMenu}/>
        </div>
      </div>

      {/* mobile */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:text-SneakpeekGreen p-2"
            onClick={() => {toggleMobileMenu(); setContentType("movie")}}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:text-SneakpeekGreen p-2"
            onClick={() => {toggleMobileMenu(); setContentType("tv")}}
          >
            Tv shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:text-SneakpeekGreen p-2"
            onClick={toggleMobileMenu}
          >
            Search history
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
