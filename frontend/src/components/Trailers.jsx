import ContentSlider from "./ContentSlider";

const Trailers = ({ videos, isLoading }) => {
  return (
    <div className="px-4 md:px-8   pt-10 mb-20">
      <h3 className="text-3xl font-semibold mb-10">Official Videos</h3>
      <ContentSlider content={videos} isLoading={isLoading} type={"videos"} />
    </div>
  );
};

export default Trailers;
