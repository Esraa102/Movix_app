import { AuthScreen, HomeScreen } from "..";
import useAuthStore from "../../store/authUser";

const HomePage = () => {
  const { user } = useAuthStore();

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
