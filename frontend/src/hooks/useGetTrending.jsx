import { useEffect, useState } from "react";
import useContentStore from "../store/content";
import axios from "axios";
import { baseUrl } from "../constants";
import createToast from "../utils/createToast";

export const useGetTrending = () => {
  const { contentType } = useContentStore();
  const [trendingContent, setTrendingContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getTrending = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/movie/trending/${contentType}/day/1`
        );
        setTrendingContent(response.data.content);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        createToast("Something went wrong", "error");
        console.log(error);
      }
    };
    getTrending();
  }, [contentType]);

  return { trendingContent, isLoading };
};

export const useGetTrendingContnet = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { time } = useContentStore();
  useEffect(() => {
    const getTrending = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/movie/trending/all/${time}/1`
        );
        setTrendingContent(response.data.trending);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        createToast("Something went wrong", "error");
        console.log(error);
      }
    };
    getTrending();
  }, [time]);
  return { trendingContent, isLoading, setTrendingContent };
};
