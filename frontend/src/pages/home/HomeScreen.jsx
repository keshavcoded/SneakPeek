import { useAuth } from "../../store/useAuth";

const HomeScreen = () => {

    const {signout} = useAuth();
    return <div className="">HomeScreen
    
    <button onClick={signout}>Logout</button>
    </div>
}

export default HomeScreen;