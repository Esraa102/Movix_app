import { useEffect, useState } from "react";
import {
  DeleteAccount,
  DeleteAllSearch,
  DeleteSearchItem,
  LogOut,
  Spinner,
} from "../components";
import dayjs from "dayjs";
import useAuthStore from "../store/authUser";
import { Link } from "react-router-dom";
import { baseUrl, imageBaseURL } from "../constants";
import axios from "axios";
import { DeleteFavBtn } from "../components/FavoriteBtn";
import { DeleteFromWatchBtn } from "../components/WatchListBtns";
import { BookPlus, FolderSearch2, TvMinimalPlay, UserCog } from "lucide-react";
const UserPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("general");
  const [history, setHistory] = useState(null);
  const [favList, setFavList] = useState(null);
  const [watchList, setWatchList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getSearchHistory = async () => {
      setIsLoading(true);
      try {
        const [search, fav, watch] = await Promise.all([
          axios.get(`${baseUrl}/search/history`, {
            withCredentials: true,
          }),
          axios.get(`${baseUrl}/user/favorite`, { withCredentials: true }),
          axios.get(`${baseUrl}/user/watchList`, { withCredentials: true }),
        ]);
        setHistory(search.data.history);
        setFavList(fav.data.favorite);
        setWatchList(watch.data.list);
        console.log(fav);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getSearchHistory();
  }, []);
  return (
    <section className="flex flex-col lg:flex-row">
      <div className="bg-[#121212] h-fit w-full z-10 flex py-2 lg:py-8 flex-row lg:justify-start justify-between lg:flex-col sticky top-0 lg:h-screen lg:w-1/4 p-4 md:px-8">
        <Link to={"/"} className="lg:block lg:mb-10 lg:mx-auto">
          <img
            src={"/assets/movix-logo.svg"}
            className="lg:w-[200px] w-[120px]"
            alt="movix-logo"
          />
        </Link>
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`lg:text-2xl transition lg:font-semibold lg:mb-4 lg:w-full lg:p-2 px-1 py-[1px] hover:bg-[#242323] rounded-md
            ${activeTab === "general" && "bg-[#EC7129] hover:bg-[#EC7129]"}`}
        >
          <span className="hidden lg:inline">General Info</span>
          <UserCog className="lg:hidden" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`lg:text-2xl transition font-semibold lg:mb-4 lg:w-full lg:p-2 p-1 hover:bg-[#242323] rounded-md
            ${activeTab === "history" && "bg-[#EC7129] hover:bg-[#EC7129]"}`}
        >
          <span className="hidden lg:inline">History</span>
          <BookPlus className="lg:hidden" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("fav")}
          className={`lg:text-2xl transition font-semibold lg:mb-4 lg:w-full lg:p-2 p-1 hover:bg-[#242323] rounded-md
            ${activeTab === "fav" && "bg-[#EC7129] hover:bg-[#EC7129]"}`}
        >
          <span className="hidden lg:inline">Favorite</span>
          <FolderSearch2 className="lg:hidden" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("watch")}
          className={`lg:text-2xl transition font-semibold lg:mb-4 lg:w-full lg:p-2 p-1 hover:bg-[#242323] rounded-md
            ${activeTab === "watch" && "bg-[#EC7129] hover:bg-[#EC7129]"}`}
        >
          <span className="hidden lg:inline">Watch Later</span>
          <TvMinimalPlay className="lg:hidden" />
        </button>
      </div>
      <div className="lg:w-[75%] w-full py-10 lg:py-8  min-h-screen p-4 md:px-8">
        {activeTab === "general" && (
          <div>
            <img
              className="mx-auto w-[300px] h-[300px] rounded-full"
              src={user.image || "/assets/avatar.png"}
              alt={`${user.username}-profile-img`}
            />
            <div className="text-4xl text-center mt-3 font-semibold capitalize">
              {user.username}
            </div>
            <div className="text-xl text-[#aaa] text-center mt-1 font-semibold">
              {user.email}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 lg:gap-20">
              <LogOut />
              <DeleteAccount />
            </div>
          </div>
        )}
        {activeTab === "history" && (
          <div>
            {!isLoading ? (
              <div>
                <div className="flex items-center mt-8 mb-20 justify-between gap-10 flex-wrap">
                  <h1 className="text-4xl graident-header font-semibold">
                    Your search history
                  </h1>
                  {history.length > 0 && (
                    <DeleteAllSearch setHistory={setHistory} />
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  {user && history.length > 0 ? (
                    <>
                      {user &&
                        history.map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="flex justify-between bg-[#121212] p-4  rounded-lg"
                          >
                            <div className="flex gap-4">
                              <Link
                                to={
                                  item.searchType !== "PERSON" &&
                                  `/watch/${item.searchType.toLowerCase()}/${
                                    item.id
                                  }`
                                }
                              >
                                <img
                                  src={
                                    item.image
                                      ? imageBaseURL + item.image
                                      : "/assets/no-poster.png"
                                  }
                                  alt="img"
                                  className="h-[200px] lg:w-[240px] w-full object-cover rounded-lg"
                                />
                              </Link>
                              <div>
                                <p className="text-2xl font-semibold">
                                  {item.title}
                                </p>
                                <p className="text-[#4d4d4d] font-medium">
                                  {dayjs(item.createdAt).format(
                                    "MMM, DD, YYYY  HH:mm A"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                              <p className="text-lg capitalize  font-medium w-fit px-6 py-1 rounded-full bg-green-700">
                                {item.searchType.toLowerCase()}
                              </p>
                              <DeleteSearchItem
                                id={item.id}
                                setData={setHistory}
                              />
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="text-lg font-medium text-center text-[#aaa]">
                      You have no history
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        )}
        {activeTab === "fav" && (
          <div>
            {!isLoading ? (
              <div>
                <div className="flex items-center mt-8 mb-20 justify-between gap-10 flex-wrap">
                  <h1 className="text-4xl graident-header font-semibold">
                    Your favorite media
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
                  {user && favList.length > 0 ? (
                    <>
                      {user &&
                        favList.map((item, index) => (
                          <div key={`${item.id}-${index}`} className="relative">
                            <div className="flex flex-col gap-4 ">
                              <Link to={`/watch/${item.type}/${item.id}`}>
                                <img
                                  src={
                                    item.image
                                      ? imageBaseURL + item.image
                                      : "/assets/no-poster.png"
                                  }
                                  alt="img"
                                  className="h-[350px] lg:w-[240px] w-full object-cover rounded-lg"
                                />
                              </Link>
                              <div>
                                <p className="text-xl px-2 font-semibold">
                                  {item.title}
                                </p>
                              </div>
                            </div>
                            <p className="top-2 absolute left-2 text-sm px-3 py-1 rounded-full bg-pink">
                              {item.type === "movie" ? "Movie" : "TV Show"}
                            </p>
                            <div className="top-2 absolute right-2">
                              <DeleteFavBtn
                                id={item.id}
                                setFavList={setFavList}
                              />
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="text-lg font-medium  text-center text-[#aaa]">
                      No Favorite Media Here...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        )}
        {activeTab === "watch" && (
          <div>
            {!isLoading ? (
              <div>
                <div className="flex items-center mt-8 mb-20 justify-between gap-10 flex-wrap">
                  <h1 className="text-4xl graident-header font-semibold">
                    Your favorite media
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
                  {user && watchList.length > 0 ? (
                    <>
                      {user &&
                        watchList.map((item, index) => (
                          <div
                            key={`${item.showId}-${index}`}
                            className="relative"
                          >
                            <div className="flex flex-col gap-4 ">
                              <Link
                                to={`/watch/${item.mediaType}/${item.showId}`}
                              >
                                <img
                                  src={
                                    item.showPoster
                                      ? imageBaseURL + item.showPoster
                                      : "/assets/no-poster.png"
                                  }
                                  alt="img"
                                  className="h-[350px] lg:w-[240px] w-full object-cover rounded-lg"
                                />
                              </Link>
                              <div>
                                <p className="text-xl px-2 font-semibold">
                                  {item.showTitle}
                                </p>
                              </div>
                            </div>
                            <p className="top-2 absolute left-2 text-sm px-3 py-1 rounded-full bg-pink">
                              {item.mediaType === "movie" ? "Movie" : "TV Show"}
                            </p>
                            <div className="top-2 absolute right-2">
                              <DeleteFromWatchBtn
                                id={item.showId}
                                setWatchList={setWatchList}
                              />
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="text-lg font-medium  text-center text-[#aaa]">
                      No saved items here...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPage;
