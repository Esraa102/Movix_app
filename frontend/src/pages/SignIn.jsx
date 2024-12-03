import { AuthForm } from "../components";
import phone from "../../public/assets/laptop.png";
import video from "../../public/assets/video-4.mp4";

const SignIn = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:py-0 py-10 px-4 md:px-8 min-h-[90vh] items-center gap-10 justify-between">
      <div className="w-[90%] md:w-1/2">
        <div className="mb-6 text-center">
          <h1 className="text-2xl mb-2 font-bold">Sign In</h1>
          <p className="text-md text-[#aaa]">Welcome Back To Movix!🤩😊</p>
        </div>
        <AuthForm type={"signin"} />
      </div>
      <div className="relative  flex-1 mt-4 overflow-hidden">
        <img src={phone} className="w-full" alt="device-img" />
        <video
          className="absolute rounded-sm h-[43%] top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]"
          autoPlay
          muted
          loop
        >
          <source src={video} type="video/mp4" />
          <source src={video} type="video/webm" />
        </video>
      </div>
    </section>
  );
};

export default SignIn;
