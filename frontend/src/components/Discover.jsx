import Select from "react-select";
import ContentCard from "./ContentCard";
import { SkeletonCards } from "./Skeletons";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import InfiniteScroll from "react-infinite-scroll-component";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Discover = ({
  type,
  genres,
  isLoading,
  data,
  setData,
  totalPages,
  setTotalPages,
  pageNum,
  setPageNum,
  getInitialData,
}) => {
  const [sortBy, setSortBy] = useState(null);
  const [getGenre, setGetGenre] = useState(null);
  const [loadMoreContent, setLoadMoreContent] = useState(false);

  const getNextData = async () => {
    setLoadMoreContent(true);
    try {
      const response = await axios.post(
        `${baseUrl}/${type}/discover?page=${pageNum}`,
        filters
      );
      setData((prev) => [...prev, ...response.data.content]);
      setTotalPages(response.data.total);

      setLoadMoreContent(false);
    } catch (error) {
      console.log("Error in getNextData" + error);
      setLoadMoreContent(false);
    }
    setPageNum((prev) => prev + 1);
  };

  const onChange = (selectedItems, action) => {
    if (action.name === "sortedBy") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGetGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((genre) => genre.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
        console.log(genreId);
      } else {
        delete filters.with_genres;
      }
    }
    getInitialData(filters);
    setPageNum(1);
  };
  useState(() => {
    filters = {};
    setSortBy(null);
    setGetGenre(null);
  }, []);
  return (
    <div className="px-4 min-h-screen md:px-8 py-10">
      <div className="flex mb-10 gap-6 justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold">
          Discover {type == "movie" ? "Movies" : "TV Shows"}
        </h2>
        <div className="flex flex-wrap gap-8">
          <Select
            isMulti
            name="genres"
            value={getGenre}
            isClearable={true}
            onChange={onChange}
            options={genres}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            placeholder="Select Categories"
            classNamePrefix="react-select"
            styles={{
              control: () => ({
                borderColor: "#f89e00",
                borderRadius: "40px",
                borderWidth: "2px",
                backgroundColor: "#000",
                minWidth: "260px",
                cursor: "pointer",
                color: "#fff",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
              }),
            }}
          />
          <Select
            name="sortedBy"
            onChange={onChange}
            options={sortbyData}
            value={sortBy}
            isClearable={true}
            placeholder="Sort by"
            classNamePrefix="react-select"
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            styles={{
              control: () => ({
                borderColor: "#da2f68",
                borderRadius: "40px",
                borderWidth: "2px",
                backgroundColor: "#000",
                minWidth: "260px",
                cursor: "pointer",
                color: "#fff",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
              }),
            }}
          />
        </div>
      </div>
      {!isLoading && data && (
        <>
          {data.length > 0 ? (
            <InfiniteScroll
              dataLength={data.length || []}
              className="flex gap-8 justify-center flex-wrap"
              hasMore={pageNum <= totalPages}
              next={getNextData}
              loader={
                loadMoreContent && (
                  <div className="flex gap-8 justify-center flex-wrap">
                    <SkeletonCards />
                    <SkeletonCards />
                    <SkeletonCards />
                    <SkeletonCards />
                  </div>
                )
              }
            >
              {data.map((item, index) => (
                <ContentCard
                  key={`${item.id}-${index}`}
                  content={item}
                  type={type}
                />
              ))}
            </InfiniteScroll>
          ) : (
            <div className="text-xl text-[#aaa] font-semibold text-center pt-14">
              Sorry, Results not found!
            </div>
          )}
        </>
      )}
      {isLoading && (
        <div className="flex gap-8 justify-center flex-wrap">
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
        </div>
      )}
    </div>
  );
};

export default Discover;
