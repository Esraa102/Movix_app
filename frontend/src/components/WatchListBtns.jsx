import axios from "axios";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { baseUrl } from "../constants";
import useAuthStore from "../store/authUser";
import Spinner from "./Spinner";
import createToast from "../utils/createToast";

export const AddToWatchBtn = ({
  id,
  type,
  title,
  image,
  setIsAddedToWatch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { modifyWatchList } = useAuthStore();
  const addToWatchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/user/watchlist/add`,
        {
          showId: id,
          showTitle: title,
          showPoster: image,
          mediaType: type,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIsLoading(false);
      modifyWatchList(response.data.newList);
      setIsAddedToWatch(true);
      createToast(response.data.message, "success");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-fit">
      {!isLoading ? (
        <button type="button" onClick={() => addToWatchList()}>
          <Bookmark
            size={26}
            className="fill-white scale-95 hover:scale-110 transition hover:fill-[#0f0] hover:stroke-[#0f0]"
          />
        </button>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export const DeleteFromWatchBtn = ({ id, setIsAddedToWatch, setWatchList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { modifyWatchList } = useAuthStore();
  const deleteFromWatch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${baseUrl}/user/watchlist/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      modifyWatchList(response.data.newList);
      if (setIsAddedToWatch) {
        setIsAddedToWatch(false);
      }
      if (setWatchList) {
        setWatchList(response.data.newList);
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
        <button type="button" onClick={() => deleteFromWatch()}>
          <Bookmark size={28} className=" fill-[#0f0] stroke-[#0f0]" />
        </button>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
