import { useEffect, useState } from "react";
import useContentStore from "../store/content";
import createToast from "../utils/createToast";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGetPopular = () => {
  const { contentType } = useContentStore();
  const [popularContent, setPopularContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getPopluar = async () => {
      setIsLoading(true);
      try {
        const resposne = await axios.get(
          `${baseUrl}/movie/popular/${contentType}/1`
        );
        setPopularContent(resposne.data.popular);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        createToast("Something went wrong", "error");
        console.log(error);
      }
    };
    getPopluar();
  }, [contentType]);
  return { popularContent, setPopularContent, isLoading };
};
