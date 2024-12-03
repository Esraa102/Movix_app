import useAuthStore from "../store/authUser";
import { Spinner } from ".";

const LogOut = () => {
  const { logout, isLoading } = useAuthStore();
  const handleLogOut = () => {
    logout();
  };
  return (
    <button className="main-btn px-4 my-0 btn-gradient" onClick={handleLogOut}>
      {isLoading ? <Spinner /> : "Log Out"}
    </button>
  );
};

export default LogOut;
