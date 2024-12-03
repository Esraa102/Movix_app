import axios from "axios";
import createToast from "../utils/createToast";
import { baseUrl } from "../constants";
import { useState } from "react";
import Spinner from "./Spinner";

export const DeleteAllSearch = ({ setHistory }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteAll = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/search/history/delete`, {
        withCredentials: true,
      });
      createToast(response.data.message, "success");
      console.log(response);
      setHistory([]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={() => deleteAll()}
      className="text-lg hover:opacity-70 transition text-center font-medium px-6 py-1 rounded-full btn-gradient"
    >
      {isLoading ? <Spinner /> : "Delete All History"}
    </button>
  );
};

export const DeleteSearchItem = ({ id, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteItem = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/search/delete/${id}`, {
        withCredentials: true,
      });
      setData(response.data.newHistory);
      createToast(response.data.message, "success");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error in deleteItem()", error);
      createToast("Something went wrong,please try again", "error");
    }
  };

  return (
    <button
      type="button"
      onClick={() => deleteItem()}
      className="text-lg hover:opacity-70 transition text-center font-medium px-6 py-1 rounded-md bg-red-700"
    >
      {isLoading ? <Spinner /> : "Delete From Search"}
    </button>
  );
};
