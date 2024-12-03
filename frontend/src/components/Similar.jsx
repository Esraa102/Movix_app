import { ContentSlider } from ".";

const Similar = ({ media, content, isLoading }) => {
  return (
    <div className="px-4 md:px-8   pt-10 mb-20">
      <h3 className="text-3xl font-semibold mb-10">
        Similar {media === "movie" ? "Movies" : "TV Shows"}
      </h3>

      <ContentSlider content={content} isLoading={isLoading} type={"details"} />
    </div>
  );
};

export default Similar;
