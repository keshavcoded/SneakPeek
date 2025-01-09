import { useAuth } from "../../store/useAuth";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {

  const {user} = useAuth();
  return <div className="">{user? <HomeScreen/>: <AuthScreen/>}</div>;
};

export default HomePage;
