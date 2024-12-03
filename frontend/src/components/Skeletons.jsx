export const SkeletonCards = () => {
  return (
    <div className="h-[400px] flex flex-col gap-3 min-w-[260px] max-w-[260px]">
      <div className="bg-gray-700  rounded-lg flex-1 shimmer "></div>
      <div className="bg-gray-700 rounded-md shimmer h-[30px] w-[85%]"></div>
      <div className="bg-gray-700 rounded-md shimmer h-[25px] w-[30%]"></div>
    </div>
  );
};

export const SkeletonCast = () => {
  return (
    <div className="h-[400px] flex flex-col items-center gap-2 min-w-[260px] max-w-[260px]">
      <div className="bg-gray-700  rounded-full w-[240px] h-[240px] shimmer "></div>
      <div className="bg-gray-700 rounded-md shimmer h-[25px] w-[85%]"></div>
      <div className="bg-gray-700 rounded-md shimmer h-[15px] w-[30%]"></div>
      <div className="bg-gray-700 rounded-md shimmer h-[10px] w-[20%]"></div>
    </div>
  );
};

export const SkeletonVideos = () => {
  return (
    <div className="flex h-[300px] flex-col gap-3 w-[240px] md:w-[400px]">
      <div className="bg-gray-700 h-[200px] w-[240px] md:w-[400px] rounded-lg flex-1 shimmer "></div>
      <div className="bg-gray-700 rounded-md shimmer h-[30px] w-[85%]"></div>
      <div className="bg-gray-700 rounded-md shimmer h-[25px] w-[30%]"></div>
    </div>
  );
};
