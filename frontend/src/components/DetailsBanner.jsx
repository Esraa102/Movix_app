import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dayjs from "dayjs";
import { imageBaseURL } from "../constants";
import { CirclePlay } from "lucide-react";
import { toHoursAndMinutes } from "../utils/convertToHoursAndMins";
import useContentStore from "../store/content";

const DetailsBanner = ({ content, setIsLoading, isLoading, trailers }) => {
  console.log(content);
  const { setVideoDetails, setShowVideo } = useContentStore();
  return (
    <div className={`w-full items-center flex relative`}>
      {isLoading && (
        <div className="relative h-screen w-full">
          <div className="absolute p-4 py-[100px] md:px-8 top-0 left-0 w-full h-full bg-gray-700 flex items-center gap-8 shimmer ">
            <div className="w-full md:w-[25%] h-[500px] flex gap-16 bg-[#2b2d2f]   rounded-xl"></div>
            <div className="flex flex-1 flex-col gap-8">
              <p className="h-[50px] rounded-lg bg-[#2b2d2f]  w-1/4" />
              <p className="h-[50px] rounded-lg bg-[#2b2d2f]  w-1/2" />
              <p className="h-[200px] rounded-lg bg-[#2b2d2f]  w-[75%] " />
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="relative w-full h-full z-[2]">
          <div className="black-bg absolute top-0 left-0 -z-[1] w-full h-full" />
          <img
            src={imageBaseURL + content.backdrop_path}
            onLoad={() => setIsLoading(false)}
            className="absolute w-full h-full object-cover -z-10"
          />

          <div className="p-4 py-[100px]  flex gap-16 items-center flex-col md:flex-row h-fit md:px-10 ">
            <a
              href={content.homepage}
              target="_blank"
              className="w-full md:w-[25%] block"
            >
              <img
                src={
                  imageBaseURL + content.poster_path || "/assets/no-poster.png"
                }
                onLoad={() => setIsLoading(false)}
                className="w-full  h-[500px] object-cover rounded-xl"
              />
            </a>
            <div className="flex w-full md:w-[65%]  flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3 items-center">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {content.title || content.name}
                  </h1>
                  {content.adult && (
                    <p className="mt-4 text-lg font-medium px-2 py-[2px] bg-[#f00] rounded-lg">
                      +18
                    </p>
                  )}
                </div>
                <p className="font-medium text-lg text-[#535353] italic">
                  {content.tagline}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {content.genres.map((item) => (
                    <p
                      className="py-1 font-medium px-2 bg-pink text-sm rounded-lg"
                      key={item.id}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-10 items-center">
                <CircularProgressbar
                  className="w-[100px] h-[100px]"
                  value={Number(content.vote_average.toFixed(1))}
                  maxValue={10}
                  text={
                    Number(content.vote_average.toFixed(1)) > 0
                      ? Number(content.vote_average.toFixed(1))
                      : "0.0"
                  }
                  background={true}
                  strokeWidth={8}
                  backgroundPadding={2}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor:
                      Number(content.vote_average.toFixed(1)) > 7
                        ? "#5ca405"
                        : Number(content.vote_average.toFixed(1)) > 5
                        ? "#f89e00"
                        : "#f00",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    trailColor: "rgba(0,0,0,0.7)",
                    textSize: "35px",
                    pathTransitionDuration: 0.5,
                  })}
                />
                <button
                  type="button"
                  onClick={() => {
                    setVideoDetails(trailers[0]);
                    setShowVideo(true);
                  }}
                  className="flex gap-3 text-2xl items-center hover:text-pink transition"
                >
                  <CirclePlay size={100} strokeWidth={1.2} />
                  <span>Watch Trailer</span>
                </button>
              </div>
              <div>
                <p className="text-3xl font-bold mb-4">Overview</p>
                <p className="w-full md:w-[80%] text-justify text-lg ">
                  {content.overview}
                </p>
              </div>
              <div className="pb-3  border-b-2 border-b-[#232323] flex flex-wrap md:items-center gap-8 flex-1">
                <div>
                  <span className="text-lg font-medium">Status: </span>
                  <span className="text-[#535353] font-medium">
                    {content.status}
                  </span>
                </div>
                <div>
                  <span className="text-lg font-medium">Release Date: </span>

                  <span className="text-[#535353] font-medium">
                    {dayjs(content.release_date).format("MMM, DD, YYYY") ||
                      dayjs(content.first_air_date).format("MMM, DD, YYYY")}
                  </span>
                </div>
                <div>
                  <span className="text-lg font-medium">Runtime: </span>
                  <span className="text-[#535353] font-medium">
                    {content.runtime
                      ? toHoursAndMinutes(content.runtime)
                      : "0h 0m"}
                  </span>
                </div>
              </div>
              <div className="pb-3  border-b-2 border-b-[#232323] flex-1">
                <div>
                  <span className="text-lg font-medium">Writer: </span>
                  {content.created_by ? (
                    <>
                      {content.created_by.map((item, index) => (
                        <span
                          key={item.id}
                          className="text-[#535353] font-medium pr-1"
                        >
                          {item.name}
                          {index + 1 < content.created_by.length && ","}
                        </span>
                      ))}
                    </>
                  ) : (
                    <span className="text-[#535353] font-medium pr-1">
                      Unknown
                    </span>
                  )}
                </div>
              </div>
              <div className="pb-3  border-b-2 border-b-[#232323] flex-1">
                <div>
                  <span className="text-lg font-medium">Director: </span>
                  <span className="text-[#535353] font-medium">
                    {content.director ? content.director : "Unkown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
