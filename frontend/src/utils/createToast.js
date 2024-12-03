import toast from "react-hot-toast";
import { toastStyle } from "../constants/index.jsx";

const createToast = (message, type) => {
  return type === "error"
    ? toast.error(message, toastStyle)
    : toast.success(message, toastStyle);
};

export default createToast;
