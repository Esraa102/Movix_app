import { useRef, useState } from "react";
import ContentCard from "./ContentCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Spinner from "./Spinner";
import { SkeletonCards, SkeletonCast, SkeletonVideos } from "./Skeletons";
import { CastCard, VideoCard } from ".";

const ContentSlider = ({
  content,
  getMoreContent,
  isLoadingMore,
  isLoading,
  type,
  mediaType,
}) => {
  const [page, setPage] = useState(2);
  const sliderRef = useRef();
  const slideLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  const slideRight = () => {
    const scrollLeft = Math.ceil(sliderRef.current.scrollLeft + 400);
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    console.log(scrollLeft, maxScrollLeft);
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
    if (type === "cards" && scrollLeft >= maxScrollLeft) {
      setPage(page + 1);
      getMoreContent(page);
    }
  };

  return (
    <div>
      {!isLoading && (content?.length === 0 || !content) && (
        <div className="text-center font-semibold text-lg text-[#232323]">
          No Content For This Media
        </div>
      )}
      {content?.length > 0 && (
        <div className="w-full relative px-6 mx-auto">
          {!isLoading && (
            <div
              ref={sliderRef}
              className={`flex ${
                type === "cards" ? "space-x-4" : "space-x-6"
              } scrollbar-hide overflow-x-scroll`}
            >
              {(type === "cards" || type === "details") &&
                content.map((item, index) => (
                  <ContentCard
                    key={`${item.id}-$${index}`}
                    content={item}
                    type={mediaType}
                  />
                ))}
              {type === "people" &&
                content.map((item) => (
                  <CastCard key={item.credit_id} person={item} />
                ))}
              {type === "videos" &&
                content.map((item) => <VideoCard key={item.id} video={item} />)}
            </div>
          )}
          <div>
            <button
              onClick={slideLeft}
              className="absolute bg-black/80  top-[155px] left-0  z-[1] h-[40px] w-[40px] rounded-full flex items-center justify-center"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={slideRight}
              className="absolute bg-black/80  top-[155px] right-0  z-[1] h-[40px] w-[40px] rounded-full flex items-center justify-center"
            >
              {isLoadingMore ? <Spinner /> : <ArrowRight />}
            </button>
            <div />
            {isLoading && (type === "cards" || type === "details") && (
              <div className="flex space-x-4 scrollbar-hide overflow-x-scroll">
                <SkeletonCards />
                <SkeletonCards />
                <SkeletonCards />
                <SkeletonCards />
                <SkeletonCards />
              </div>
            )}
            {isLoading && type === "people" && (
              <div className="flex space-x-6 scrollbar-hide overflow-x-scroll">
                <SkeletonCast />
                <SkeletonCast />
                <SkeletonCast />
                <SkeletonCast />
                <SkeletonCast />
              </div>
            )}
            {isLoading && type === "videos" && (
              <div className="flex space-x-4 scrollbar-hide overflow-x-scroll">
                <SkeletonVideos />
                <SkeletonVideos />
                <SkeletonVideos />
                <SkeletonVideos />
                <SkeletonVideos />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSlider;
