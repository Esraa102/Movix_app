import { useEffect, useState } from "react";
import { Discover, Footer, Header, HeroSection } from "../components";
import { useGetTrending } from "../hooks/useGetTrending";
import useContentStore from "../store/content";
import axios from "axios";
import { baseUrl } from "../constants";

const Movies = () => {
  const { setContentType } = useContentStore();
  const { trendingContent } = useGetTrending();
  const [imgLoad, setImgLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [genres, setGenres] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const getInitialData = async (filters) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/movie/discover?page=1`,
        filters
      );
      setData(response.data.content);
      setTotalPages(response.data.total);
      setPageNum((prev) => prev + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getGenres = async () => {
    setIsLoading(true);
    try {
      const genresData = await axios.get(`${baseUrl}/movie/genre/list`);
      setGenres(genresData.data.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    setContentType("movie");
    getInitialData(null);
    getGenres();
  }, [setContentType]);

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
    <section className="min-h-screen h-fit relative">
      <Header isHome={true} />
      {imgLoad && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
      )}
      <HeroSection trendingContent={trendingContent} setImgLoad={setImgLoad} />
      <Discover
        type={"movie"}
        genres={genres}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={data}
        setData={setData}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        pageNum={pageNum}
        setPageNum={setPageNum}
        getInitialData={getInitialData}
      />
      <Footer />
    </section>
  );
};

export default Movies;
