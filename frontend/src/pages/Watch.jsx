import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DetailsBanner,
  Footer,
  Header,
  NotFound,
  Recommendations,
  Similar,
  TopCast,
  Trailers,
  VidoePopUp,
} from "../components";
import createToast from "../utils/createToast";
import axios from "axios";
import { baseUrl } from "../constants";
import useContentStore from "../store/content.js";

const Watch = () => {
  const { id, media_type } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [show404, setShow404] = useState(false);
  const [trailers, setTrailers] = useState(null);
  const [cast, setCast] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const { videoDetails, showVideo } = useContentStore();
  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const url = `${baseUrl}/${media_type}/${id}`;
        const [response, videos, credits, similarContent, recommend] =
          await Promise.all([
            axios.get(`${url}/details`),
            axios.get(`${url}/trailers`),
            axios.get(`${url}/people`),
            axios.get(`${url}/similar`),
            axios.get(`${url}/recommendations`),
          ]);
        setContent(response.data.content);
        setTrailers(videos.data.results);
        setCast(credits.data.content);
        setSimilar(similarContent.data.content);
        console.log(similarContent.data.content);
        setRecommendations(recommend.data.content);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (error.status === 404) {
          setShow404(true);
        } else {
          createToast("Something Went Wrong", "error");
        }
      }
    };
    getDetails();
  }, [id, media_type]);
  console.log(cast);
  if (show404) {
    return <NotFound />;
  }
  return (
    <section
      className={
        showVideo
          ? "overflow-y-hidden h-screen relative"
          : "min-h-screen overflow-y-scroll"
      }
    >
      <Header isHome={true} />
      <DetailsBanner
        trailers={trailers}
        content={content}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <TopCast cast={cast} isLoading={isLoading} />
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />

      <Trailers videos={trailers} isLoading={isLoading} />
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />

      <Similar media={media_type} content={similar} isLoading={isLoading} />
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />

      <Recommendations content={recommendations} isLoading={isLoading} />

      <Footer />
      {!isLoading && videoDetails && showVideo && (
        <VidoePopUp video={videoDetails} />
      )}
    </section>
  );
};

export default Watch;
