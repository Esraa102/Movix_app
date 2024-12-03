import { CircleX } from "lucide-react";
import ReactPlayer from "react-player";
import useContentStore from "../store/content";
const VidoePopUp = ({ video }) => {
  const { setShowVideo } = useContentStore();
  return (
    <div className="w-full z-50 flex items-center justify-center h-screen bg-black/90 absolute top-0 left-0">
      <div className="w-[90%]  md:w-[60%] lg:w-[45%] max-h-[450px] relative bg-black rounded-md">
        <div className=" aspect-video overflow-hidden border-2  border-[#323232]  rounded-lg ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.key}`}
            controls={true}
            playing={true}
            className="rounded-lg max-w-full max-h-full "
          />
        </div>
        <button
          type="button"
          onClick={() => setShowVideo(false)}
          className="absolute bg-black -right-2 -top-4"
        >
          <CircleX color="#f00" strokeWidth={3} size={28} />
        </button>
      </div>
    </div>
  );
};

export default VidoePopUp;
