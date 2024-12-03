import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import { imageBaseURL } from "../constants";

const HeroSection = ({ trendingContent, setImgLoad }) => {
  return (
    <div className="h-screen relative z-[1]">
      <div className="black-bg absolute top-0 left-0 -z-[1] w-full h-full" />
      <img
        src={imageBaseURL + trendingContent.backdrop_path}
        onLoad={() => setImgLoad(false)}
        className="absolute w-full h-full object-cover -z-10"
      />
      <div className="flex  h-full items-center justify-center md:justify-start    px-4 py-2 md:px-8  w-full">
        <div className="bg-black/55 lg:w-[45%] md:w-[65%]  h-fit p-4 md:p-6 rounded-lg w-fit  flex-col justify-center items-center md:items-start">
          <h1 className="text-3xl mb-4   graident-header md:text-4xl font-bold">
            {trendingContent.title || trendingContent.name}
          </h1>
          <p className="mb-2 text-orange font-bold">
            {trendingContent.first_air_date?.slice(0, 4) ||
              trendingContent.release_date?.slice(0, 4)}{" "}
            {trendingContent.adult ? "| 18+" : "| PG-13"}
          </p>
          <p className="my-6 line-clamp-3 text-[#aaa] text-justify text-[17px]">
            {trendingContent.overview}
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              className="flex gap-2 text-lg main-btn btn-gradient py-1 px-6"
              to={`/watch/${trendingContent.media_type}/${trendingContent.id}`}
            >
              <Play />
              Play Now
            </Link>
            <Link
              className="flex gap-2 bg-gray-500/70 text-lg main-btn  py-1 px-6"
              to={`/watch/${trendingContent.media_type}/${trendingContent.id}`}
            >
              <Info />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
