import { useEffect, useState } from "react";
import { useGetTrending } from "../../hooks/useGetTrending";
import useContentStore from "../../store/content";
import {
  Footer,
  Header,
  HeroSection,
  PopularSlider,
  TopRated,
  TrendingSlider,
} from "../../components";

const HomeScreen = () => {
  const { setContentTime } = useContentStore();
  const { trendingContent } = useGetTrending();
  const [imgLoad, setImgLoad] = useState(true);
  useEffect(() => {
    setContentTime("day");
  }, [setContentTime]);
  if (!trendingContent)
    return (
      <div className="h-screen text-white relative">
        <Header isHome={true} />
        <div
          className="absolute top-0 left-0 w-full 
        h-full bg-black/50 flex items-center justify-center z-[1] shimmer"
        />
      </div>
    );
  return (
    <section className="min-h-screen relative">
      <Header isHome={true} />
      {/* Intro */}
      {imgLoad && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
      )}
      {/*Hero Section */}
      <HeroSection trendingContent={trendingContent} setImgLoad={setImgLoad} />
      {/* Sliders */}
      {/* Trending Slider */}
      <div className="flex flex-col gap-10 py-20">
        <TrendingSlider />
      </div>
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />
      {/* Popular Slider */}
      <div className="flex flex-col gap-10 py-20">
        <PopularSlider />
      </div>
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />
      {/* Top Rated Slider */}
      <div className="flex flex-col gap-10 py-20">
        <TopRated />
      </div>
      {/* Footer */}
      <Footer />
    </section>
  );
};

export default HomeScreen;
