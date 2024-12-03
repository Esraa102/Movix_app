import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center relative z-[1]">
      <img
        src="/assets/404.jpeg"
        alt="not-found"
        className="absolute w-full h-full object-cover opacity-25 -z-10"
      />
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl font-bold">Are You Lost?</h1>
        <p className="text-lg font-semibold text-[#aaa]">
          Sorry we couldn&apos;t find this page.The home page has a lot to
          explore
        </p>
        <Link
          to={"/"}
          className="main-btn rounded-full graident-bg btn-gradient px-6 py-2"
        >
          Movix Home Page
        </Link>
        <p>
          Error Code:{" "}
          <span className="font-medium text-lg text-red-700">
            404 Not Found
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
