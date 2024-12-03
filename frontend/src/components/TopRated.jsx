import { useEffect, useState } from "react";
import createToast from "../utils/createToast";
import axios from "axios";
import { baseUrl } from "../constants";
import { ContentSlider } from "../components";
const TopRated = () => {
  const [contentType, setContentType] = useState("movie");
  const [topRatedContent, setTopRatedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const getMoreContent = async (page) => {
    setIsLoadingMore(true);
    try {
      const response = await axios.get(
        `${baseUrl}/movie/top_rated/${contentType}/${page}`
      );

      setTopRatedContent((prev) => [...prev, ...response.data.top_rated]);
      setIsLoadingMore(false);
    } catch (error) {
      setIsLoadingMore(false);
      console.log("Error form getMoreContent()", error);
    }
    console.log(topRatedContent, page);
  };
  useEffect(() => {
    const getTopRated = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/movie/top_rated/${contentType}/1`
        );
        setTopRatedContent(response.data.top_rated);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error in getTopRated", error);
        createToast("Something Went Wrong", "error");
      }
    };
    getTopRated();
  }, [contentType]);
  return (
    <div className="p-4 md:px-8">
      <div className="flex mb-8 flex-wrap items-center gap-6 justify-between">
        <h3 className="text-2xl font-semibold ">Top Rated</h3>
        <div className="bg-white px-2 flex flex-row gap-3 py-1 rounded-full">
          <button
            onClick={() => {
              setContentType("movie");
            }}
            className={`text-xl font-medium px-8 py-1 rounded-full ${
              contentType === "movie"
                ? "font-semibold  btn-gradient"
                : "text-black"
            }`}
            type="button"
          >
            Movies
          </button>
          <button
            onClick={() => {
              setContentType("tv");
            }}
            className={`text-xl font-medium px-8 py-1 rounded-full ${
              contentType === "tv"
                ? "font-semibold  btn-gradient"
                : "text-black"
            }`}
            type="button"
          >
            TV Shows
          </button>
        </div>
      </div>
      <ContentSlider
        content={topRatedContent}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        getMoreContent={getMoreContent}
        type={"cards"}
        mediaType={contentType}
      />
    </div>
  );
};

export default TopRated;
