import ContentSlider from "./ContentSlider";

const TopCast = ({ cast, isLoading }) => {
  return (
    <div className="px-4 md:px-8 py-10">
      <h3 className="text-3xl font-semibold mb-10">Top Cast</h3>
      <ContentSlider content={cast} isLoading={isLoading} type={"people"} />
    </div>
  );
};

export default TopCast;
