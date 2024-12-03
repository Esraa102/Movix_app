import { useGetPopular } from "../hooks/useGetPopular";
import useContentStore from "../store/content";
import { ContentSlider } from "../components";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";

const PopularSlider = () => {
  const { contentType, setContentType } = useContentStore();
  const { popularContent, setPopularContent, isLoading } = useGetPopular();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const getMoreContent = async (page) => {
    setIsLoadingMore(true);
    try {
      const response = await axios.get(
        `${baseUrl}/movie/popular/${contentType}/${page}`
      );

      setPopularContent((prev) => [...prev, ...response.data.popular]);
      setIsLoadingMore(false);
    } catch (error) {
      setIsLoadingMore(false);
      console.log("Error form getMoreContent()", error);
    }
    console.log(popularContent, page);
  };

  return (
    <div className="p-4 md:px-8">
      <div className="flex mb-8 flex-wrap items-center gap-6 justify-between">
        <h3 className="text-2xl font-semibold ">What&apos;s Popular</h3>
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
        content={popularContent}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        getMoreContent={getMoreContent}
        type={"cards"}
        mediaType={contentType}
      />
    </div>
  );
};

export default PopularSlider;
