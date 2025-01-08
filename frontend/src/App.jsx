import {  Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signin" element= {<SigninPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
    </Routes>
  );
}

export default App;
