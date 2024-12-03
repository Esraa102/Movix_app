import { useState } from "react";
import axios from "axios";
import { useGetTrendingContnet } from "../hooks/useGetTrending";
import useContentStore from "../store/content";
import { ContentSlider } from ".";
import { baseUrl } from "../constants";

const TrendingSlider = () => {
  const { setContentTime, time, contentType } = useContentStore();
  const { setTrendingContent, trendingContent, isLoading } =
    useGetTrendingContnet();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getMoreContent = async (page) => {
    setIsLoadingMore(true);
    try {
      const response = await axios.get(
        `${baseUrl}/movie/trending/${contentType}/${time}/${page}`
      );

      setTrendingContent((prev) => [...prev, ...response.data.trending]);
      setIsLoadingMore(false);
    } catch (error) {
      setIsLoadingMore(false);
      console.log("Error form getMoreContent()", error);
    }
    console.log(trendingContent, page);
  };
  return (
    <div className="p-4 md:px-8">
      <div className="flex mb-8 flex-wrap items-center gap-6 justify-between">
        <h3 className="text-2xl font-semibold ">Trending</h3>
        <div className="bg-white px-2 flex flex-row gap-3 py-1 rounded-full">
          <button
            onClick={() => {
              setContentTime("day");
            }}
            className={`text-xl font-medium px-8 py-1 rounded-full ${
              time === "day" ? "font-semibold  btn-gradient" : "text-black"
            }`}
            type="button"
          >
            Day
          </button>
          <button
            onClick={() => {
              setContentTime("week");
            }}
            className={`text-xl font-medium px-8 py-1 rounded-full ${
              time === "week" ? "font-semibold  btn-gradient" : "text-black"
            }`}
            type="button"
          >
            Week
          </button>
        </div>
      </div>
      <ContentSlider
        content={trendingContent}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        getMoreContent={getMoreContent}
        type={"cards"}
      />
    </div>
  );
};

export default TrendingSlider;
