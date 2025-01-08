import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const {searchParams} = new URL(document.location);
  const urlEmail = searchParams.get("email");
  const [email,setEmail] = useState(urlEmail || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUpTrigger = (e) => {
    e.preventDefault();
    console.log(email,username,password);
  }

  return (
    <div className="hero-bg h-screen w-full">
      <header className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/logos.png" alt="logo" className="w-60 h-14" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/80 rounded-lg shadow-md">
          <h1 className="text-center text-2xl font-bold mb-4 text-white">
            Create An Account
          </h1>
          <form className="space-y-4" onSubmit={signUpTrigger}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-white"
                placeholder="you@email.com"
                id="email"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="username"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-white"
                placeholder="Username"
                id="username"
                value={username} onChange={e => setUsername(e.target.value)}
              ></input>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
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

            <button className="w-full bg-SneakpeekGreen py-2 text-white font-semibold rounded-md hover:bg-green-800 ">Sign Up</button>
          </form>
          <div className="text-center text-gray-400">
            Already a user?{" "}
            <Link to={"/signin"} className="text-SneakpeekGreen hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
