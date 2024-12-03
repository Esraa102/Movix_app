import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { imageBaseURL } from "../constants";
const CastCard = ({ person }) => {
  return (
    <div className="min-h-[360px] items-center cursor-pointer   flex flex-col gap-3 w-[260px] relative">
      <div className="w-[240px] h-[240px] hover:opacity-60 transition">
        <LazyLoadImage
          src={
            person.profile_path
              ? imageBaseURL + person.profile_path
              : "/assets/avatar.png"
          }
          alt="profile-img"
          effect="blur"
          className="w-[240px] h-[240px]  rounded-full object-cover"
        />
      </div>
      <div className="text-center mt-2">
        <p className="font-semibold text-2xl">{person.name || "Unkown"}</p>

        <p className="text-sm text-[#aaa] font-medium">
          {person.character || ""}
        </p>

        <p className="text-sm text-[#aaa] font-medium">
          ( {person.known_for_department} )
        </p>
      </div>
    </div>
  );
};

export default CastCard;
