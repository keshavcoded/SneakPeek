import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="notfound-bg min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white">
      <header className="absolute top-0 left-0 p-4 px-28 bg-black w-full">
        <Link to={"/"}>
          <img
            src="/logos.png"
            alt="logo-img"
            className="w-40 sm:w-60 h-10 sm:h-14"
          />
        </Link>
      </header>
      <main className="text-center error-page--content z-10">
        <h1 className="text-7xl font-semibold mb-4">You lost, bro?</h1>
        <p className="mb-6 text-xl">
          Looks like this page doesn&apos;t exist. But don&apos;t worry, we got
          you.
        </p>
        <Link
          to={"/"}
          className="bg-white text-black py-2 px-4 rounded font-semibold hover:bg-gray-200 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Go Back Home
        </Link>
        <p className="text-white text-lg mt-4">
          Life&apos;s too short to be on the wrong page!
        </p>
      </main>
    </div>
  );
};

export default NotFoundPage;
