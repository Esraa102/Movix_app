import { Link, useParams } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { imageBaseURL } from "../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import dayjs from "dayjs";
import { AddFavBtn, DeleteFavBtn } from "./FavoriteBtn";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authUser";
import { AddToWatchBtn, DeleteFromWatchBtn } from "./WatchListBtns";

const ContentCard = ({ content, type }) => {
  const { media_type } = useParams();
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedToWatch, setIsAddedToWatch] = useState(false);
  const { user } = useAuthStore();
  useEffect(() => {
    if (user?.favorite) {
      const isExist = user?.favorite.filter(
        (e) => e.id === Number(content?.id)
      );
      if (isExist.length > 0) {
        setIsAdded(true);
      } else setIsAdded(false);
    }
    if (user?.watchList) {
      const isExist = user?.watchList.filter((e) => {
        return e.showId === Number(content?.id);
      });
      if (isExist.length > 0) {
        setIsAddedToWatch(true);
      } else setIsAddedToWatch(false);
    }
  }, [content?.id, user?.favorite, user?.watchList]);
  return (
    <div>
      <div className="min-h-[360px] cursor-pointer flex-1  flex flex-col gap-8 w-[260px] relative">
        <div className="flex z-[1] w-full p-3 items-center justify-between absolute top-0 left-0">
          {!isAdded ? (
            <AddFavBtn
              id={content.id}
              type={content?.media_type || media_type || type}
              title={content.title || content.name}
              image={content.poster_path}
              setIsAdded={setIsAdded}
            />
          ) : (
            <DeleteFavBtn id={content.id} setIsAdded={setIsAdded} />
          )}
          {!isAddedToWatch ? (
            <AddToWatchBtn
              id={content.id}
              type={content?.media_type || media_type || type}
              title={content.title || content.name}
              image={content.poster_path}
              setIsAddedToWatch={setIsAddedToWatch}
            />
          ) : (
            <DeleteFromWatchBtn
              id={content.id}
              setIsAddedToWatch={setIsAddedToWatch}
            />
          )}
        </div>
        <div className="relative h-[360px] w-full">
          <Link
            to={`/watch/${content?.media_type || media_type || type}/${
              content.id
            }`}
          >
            <LazyLoadImage
              src={
                content.poster_path
                  ? imageBaseURL + content.poster_path
                  : "/assets/no-poster.png"
              }
              className="object-cover h-full w-full rounded-lg"
              alt="content-img"
              effect="blur"
            />
          </Link>

          <CircularProgressbar
            className="w-[60px] left-[6px] -bottom-5 absolute h-[60px]"
            value={content.vote_average.toFixed(1)}
            maxValue={10}
            text={content.vote_average.toFixed(1)}
            background={true}
            strokeWidth={7}
            backgroundPadding={5}
            styles={buildStyles({
              textColor: "#000",
              pathColor:
                Number(content.vote_average.toFixed(1)) > 7
                  ? "#5ca405"
                  : Number(content.vote_average.toFixed(1)) > 5
                  ? "#f89e00"
                  : "#f00",
              backgroundColor: "#ffff",
              trailColor: "#ffff",
              textSize: "24px",
              pathTransitionDuration: 0.5,
            })}
          />
          {content.adult && (
            <p className="px-2 py-[2px] absolute bottom-2 font-semibold right-2 rounded-lg bg-[#f00]">
              18+
            </p>
          )}
        </div>
        <div>
          <p className="mt-1 font-semibold line-clamp-1 text-2xl">
            {content.title || content.name}
          </p>
          <p className="text-[15px] mt-1 text-gray-400">
            {dayjs(content.release_date).format("MMM, DD, YYYY") ||
              dayjs(content.first_air_date).format("MMM, DD, YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
