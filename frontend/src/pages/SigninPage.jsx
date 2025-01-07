import { useState } from "react";
import { Link } from "react-router-dom";

const SigninPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInTrigger = (e) => {
    e.preventDefault();
    console.log(email,password);
  }

  return (
    <div className="hero-bg h-screen w-full">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/logos.png" alt="logo" className="w-60 h-14" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="bg-black/80 w-full max-w-md p-8 rounded-lg shadow-md">
          <h1 className="text-white text-center font-bold text-2xl mb-4">
            Sign In
          </h1>
          <form className="space-y-4" onSubmit={signInTrigger}>
            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-300 font-medium block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-white"
                placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm text-gray-300 font-medium block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-white"
                placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)}
              ></input>
            </div>
            <button className="w-full bg-SneakpeekGreen rounded-md font-semibold text-white py-2 hover:bg-green-800">Sign In</button>
          </form>
          <div className="text-gray-400 text-center mt-6">
            Don&apos;t have an Account?{" "}
            <Link to={"/signup"} className="text-SneakpeekGreen hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
