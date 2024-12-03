import useContentStore from "../store/content";
import { CirclePlay } from "lucide-react";
import dayjs from "dayjs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const VideoCard = ({ video }) => {
  const { setVideoDetails, setShowVideo } = useContentStore();
  return (
    <div className="relative">
      <div
        onClick={() => {
          setVideoDetails(video);
          setShowVideo(true);
        }}
        className="flex flex-col gap-3 w-[260px] md:w-[400px]"
      >
        <div className="w-[260px] hover:scale-105 transition md:w-[400px] relative">
          <LazyLoadImage
            src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
            alt="video-img"
            className="h-[200px] w-full object-cover rounded-xl"
            effect="blur"
          />
          <button
            type="button"
            className="text-2xl  hover:text-pink transition absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <CirclePlay size={100} strokeWidth={1.2} />
          </button>
        </div>
        <p className="text-xl font-bold">{video.name}</p>

        <p className="text-sm text-[#aaa] -mt-3">
          {dayjs(video.published_at).format("MMM, DD, YYYY")}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
