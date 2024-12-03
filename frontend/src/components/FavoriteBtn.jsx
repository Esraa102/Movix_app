import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import createToast from "../utils/createToast.js";
import Spinner from "./Spinner.jsx";
import useAuthStore from "../store/authUser.js";

export const AddFavBtn = ({ id, title, image, type, setIsAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { modifyFavoriteList } = useAuthStore();
  const addToFav = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/user/favorite/add`,
        {
          showId: id,
          showTitle: title,
          showPoster: image,
          mediaType: type,
        },
        { withCredentials: true }
      );
      setIsLoading(false);
      modifyFavoriteList(response.data.newFav);
      console.log(response);
      setIsAdded(true);
      createToast(response.data.message, "success");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-fit">
      {!isLoading ? (
        <button type="button" onClick={() => addToFav()}>
          <Heart
            strokeWidth={2.5}
            size={28}
            className={`scale-90 hover:scale-110 fill-white stroke-white  hover:stroke-[#f00] hover:fill-[#f00] transition-all`}
          />
        </button>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export const DeleteFavBtn = ({ id, setIsAdded, setFavList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { modifyFavoriteList } = useAuthStore();
  const deleteFromFav = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${baseUrl}/user/favorite/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      modifyFavoriteList(response.data.newFav);
      if (setIsAdded) {
        setIsAdded(false);
      }
      if (setFavList) {
        setFavList(response.data.newFav);
      }
      createToast(response.data.message, "success");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-fit">
      {!isLoading ? (
        <button type="button" onClick={() => deleteFromFav()}>
          <Heart
            strokeWidth={2.5}
            size={28}
            className={`fill-[#f00] stroke-[#f00]`}
          />
        </button>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
