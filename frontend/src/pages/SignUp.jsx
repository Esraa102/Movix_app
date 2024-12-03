import { AuthForm } from "../components";
import device from "../../public/assets/tv.png";
import video from "../../public/assets/video-devices.m4v";

const SignUp = () => {
  return (
    <section className="flex flex-col lg:flex-row px-4 lg:py-0 py-10 md:px-8 min-h-[90vh]  justify-center md:justify-between gap-10 items-center">
      <div className="w-[90%]  md:w-1/2">
        <div className="mb-6 text-center">
          <h1 className="text-2xl mb-2 font-bold">Create A New Account</h1>
          <p className="text-md text-[#aaa]">Welcome To Movix,Enjoy!👋😁</p>
        </div>
        <AuthForm type={"signup"} />
      </div>
      <div className="relative flex-1  z-[1]">
        <img src={device} className="" alt="device-img" />
        <video
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] -z-[1]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/m4v" />
          <source src={video} type="video/mp4" />
          <source src={video} type="video/webm" />
        </video>
      </div>
    </section>
  );
};

export default SignUp;
