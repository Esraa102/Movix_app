import useAuthStore from "../store/authUser";
import Spinner from "./Spinner";

const DeleteAccount = () => {
  const { isDeleting, deleteAccount } = useAuthStore();
  const handleDeleteAccount = () => {
    deleteAccount();
  };
  return (
    <button
      type="button"
      onClick={handleDeleteAccount}
      className="text-lg font-semibold px-6 hover:opacity-70 transition py-1 bg-red-800 rounded-full"
    >
      {isDeleting ? <Spinner /> : "Delete Account"}
    </button>
  );
};

export default DeleteAccount;
