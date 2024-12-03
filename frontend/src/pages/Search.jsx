import { SearchIcon } from "lucide-react";
import { CastCard, ContentCard, Header } from "../components";
import { useEffect, useState } from "react";
import createToast from "../utils/createToast";
import axios from "axios";
import { baseUrl } from "../constants";
import { SkeletonCards, SkeletonCast } from "../components/Skeletons";
import InfiniteScroll from "react-infinite-scroll-component";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("movie");
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const getResults = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/search/${searchType}/${keyword}/1/new`,
        {
          withCredentials: true,
        }
      );
      setData(response.data.content);
      console.log(response.data.content);
      setTotalPages(response.data.total_pages);
      setTotalResults(response.data.total_results);
      setPageNum((prev) => prev + 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error in getResults()", error);
      if (error.status === 404) {
        setData([]);
        setPageNum(1);
        setTotalPages(0);
        setTotalResults(0);
      }
    }
  };
  const getMoreResults = async () => {
    setLoadMore(true);
    try {
      const response = await axios.get(
        `${baseUrl}/search/${searchType}/${keyword}/${pageNum}/notNew`,
        {
          withCredentials: true,
        }
      );
      setData((prev) => [...prev, ...response.data.content]);
      setLoadMore(false);
      console.log(pageNum);
    } catch (error) {
      setLoadMore(false);
      console.log("Error in GetMoreResults()", error);
    }
    setPageNum((prev) => prev + 1);
  };
  useEffect(() => {
    setPageNum(1);
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim().length == 0 || !keyword) {
      createToast("Search Field is required", "error");
      setKeyword("");
    } else {
      getResults();
    }
  };

  return (
    <section className="min-h-screen">
      <Header isHome={true} />
      <div className="h-[80vh]  px-4 md:px-8 pt-36 md:pt-0 flex justify-center  items-center flex-col gap-4">
        <h1 className="text-2xl  text-center graident-header md:text-4xl font-bold">
          Search Movies, TV shows, People.
        </h1>
        <div className="md:bg-[#1a1818] flex-wrap w-full md:w-[60%] my-6 px-2 flex flex-row gap-3 py-[5px] rounded-full">
          <button
            onClick={() => {
              setSearchType("movie");
              setData(null);
              setTotalPages(0);
              setTotalResults(0);
              setKeyword("");
            }}
            className={`text-lg md:text-xl  flex-1 font-medium px-8 py-1 md:py-2 rounded-md md:rounded-full ${
              searchType === "movie"
                ? "font-semibold  btn-gradient"
                : "text-[#aaa]"
            }`}
            type="button"
          >
            Movies
          </button>
          <button
            onClick={() => {
              setSearchType("tv");
              setData(null);
              setTotalPages(0);
              setTotalResults(0);
              setKeyword("");
            }}
            className={`text-lg text-nowrap md:text-xl flex-1 font-medium px-8 py-1 md:py-2 rounded-md md:rounded-full ${
              searchType === "tv"
                ? "font-semibold  btn-gradient"
                : "text-[#aaa]"
            }`}
            type="button"
          >
            TV Shows
          </button>
          <button
            onClick={() => {
              setSearchType("person");
              setData(null);
              setTotalPages(0);
              setTotalResults(0);
              setKeyword("");
            }}
            className={`text-lg md:text-xl flex-1 font-medium px-8 py-1 md:py-2 rounded-md md:rounded-full ${
              searchType === "person"
                ? "font-semibold  btn-gradient"
                : "text-[#aaa]"
            }`}
            type="button"
          >
            People
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full md:border-2 md:border-orange overflow-hidden md:w-1/2 gap-3 md:gap-0 md:rounded-full flex flex-col md:flex-row"
        >
          <input
            className="flex-1 border-2 border-orange md:border-none text-white text-lg  bg-[rgba(0,0,0,0.5)] rounded-md md:rounded-none p-3 outline-none focus:outline-none"
            type="search"
            name="keyword"
            id="search"
            required
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (e.target.value.trim().length == 0) {
                setData(null);
                setPageNum(1);
                setTotalPages(0);
                setTotalResults(0);
              }
            }}
            placeholder="search anything..."
          />
          <button
            type="submit"
            className="btn-gradient justify-center md:justify-start flex gap-1 items-center rounded-md md:rounded-none p-3 px-5 text-lg font-semibold hover:opacity-80 transition"
          >
            <SearchIcon strokeWidth={3} size={34} />
            <span className="block md:hidden text-xl">Search</span>
          </button>
        </form>
      </div>
      {!isLoading && data && (
        <>
          {data.length > 0 ? (
            <div className="px-4 md:px-8">
              <h1 className="mb-10 md:-mt-20 text-3xl font-semibold">
                <span className="text-orange">{totalResults}</span> results
                found about{" "}
                <span className="text-orange capitalize">
                  &quot;{keyword}&quot;
                </span>
              </h1>
              <InfiniteScroll
                dataLength={data.length || []}
                hasMore={pageNum <= totalPages}
                next={getMoreResults}
                loader={
                  loadMore && (
                    <div className="flex flex-wrap gap-8 px-4 md:px-8 justify-center">
                      <SkeletonCards />
                      <SkeletonCards />
                      <SkeletonCards />
                      <SkeletonCards />
                    </div>
                  )
                }
                className="flex gap-8 justify-center flex-wrap"
              >
                {(searchType === "tv" || searchType === "movie") &&
                  data.map((item, index) => (
                    <ContentCard
                      key={`${item.id}-${index}`}
                      content={item}
                      type={searchType}
                    />
                  ))}
                {searchType === "person" &&
                  data.map((item, index) => (
                    <CastCard key={`${item.id}-${index}`} person={item} />
                  ))}
              </InfiniteScroll>
            </div>
          ) : (
            <div className="text-center text-xl font-semibold text-[#3c3b3b]">
              Sorry we couldn&apos;t find any results for{" "}
              <span className="text-[#aaa]">{keyword}</span>
            </div>
          )}
        </>
      )}
      {isLoading && (searchType === "movie" || searchType === "tv") && (
        <div className="flex flex-wrap gap-8 px-4 md:px-8 justify-center">
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
        </div>
      )}
      {isLoading && searchType === "person" && (
        <div className="flex flex-wrap gap-8 px-4 md:px-8 justify-center">
          <SkeletonCast />
          <SkeletonCast />
          <SkeletonCast />
          <SkeletonCast />
        </div>
      )}
    </section>
  );
};

export default Search;
