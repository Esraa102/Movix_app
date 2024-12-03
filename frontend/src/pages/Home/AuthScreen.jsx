import { useState } from "react";
import { Footer, Header } from "../../components";
import { StepForward } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/sign-up?email=" + email);
  };
  return (
    <section className="min-h-screen">
      {/* Header */}
      <Header isHome={false} />
      {/* Hero section */}
      <div className="h-screen relative z-[1]">
        <div className="intro-img  w-full h-full absolute top-0 left-0 -z-[1]" />
        <div className="flex px-4 py-2 md:px-8 text-center flex-col justify-center items-center w-full h-full">
          <h1 className="text-2xl mb-3 graident-header md:text-4xl font-bold">
            Unlimited Movies, TV Shows And{" "}
            <span className="text-orange">More</span>
          </h1>
          <p className="mb-2 text-[16px]">Watch anywhere. Cancel anytime.</p>
          <p className="mb-6">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form
            onSubmit={handleFormSubmit}
            className="w-full lg:border-2 lg:border-orange overflow-hidden md:w-1/2 gap-3 md:gap-0 md:rounded-full flex flex-col md:flex-row"
          >
            <input
              className="flex-1 text-white  bg-[rgba(0,0,0,0.5)] rounded-md md:rounded-none p-3 outline-none focus:outline-none"
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jhoedoe@gmail.com"
            />
            <button className="btn-gradient justify-center lg:justify-start flex gap-1 items-center rounded-md md:rounded-none p-3 px-5 text-lg font-semibold hover:opacity-80 transition">
              <span>Get Started</span>
              <StepForward />
            </button>
          </form>
        </div>
      </div>
      {/* Sperator Component */}
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />
      {/* 1st section */}
      <div className="px-4 flex flex-col md:flex-row gap-8 items-center justify-center  md:px-8 py-20 text-white">
        <div className="w-full md:w-[40%]">
          <h2 className="text-2xl  md:text-3xl font-bold mb-4 graident-header">
            Enjoy on your TV
          </h2>
          <p className="text-gray-400 text-lg">
            Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </div>
        <div className="relative">
          <img
            src="../../../public/assets/tv.png"
            alt="Tv image"
            className="mt-4 z-[2] relative"
          />
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] z-[1]"
            playsInline
            autoPlay={true}
            muted
            loop
          >
            <source
              src="../../../public/assets/video-devices.m4v"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      {/* Sperator component */}
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />
      {/* 2nd section */}
      <div className="px-4 flex flex-col md:flex-row gap-8 items-center justify-center md:px-8 py-20 text-white">
        <div className="relative w-full md:w-[45%]">
          <img
            src="../../../public/assets/stranger-things.jpg"
            alt="Tv image"
            className="rounded-lg"
          />
          <div className="download-div">
            <div className="flex flex-col gap-0">
              <span className="text-md lg:text-lg font-bold">
                Stranger Things
              </span>
              <span className="text-sm text-blue-500">Downloading...</span>
            </div>
            <img
              src="../../../public/assets/download-icon.gif"
              alt=""
              className="h-12"
            />
          </div>
        </div>

        <div className="md:w-[40%] w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 graident-header">
            Download your shows to watch offline
          </h2>
          <p className="text-gray-400 text-lg">
            Save your favorites easily and always have something to watch.
          </p>
        </div>
      </div>
      {/* separator */}
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />
      {/* 3rd section */}
      <div className="px-4 flex flex-col md:flex-row gap-10 items-center justify-evenly md:px-8 py-20 text-white">
        <div className="relative z-[1]">
          <img
            src="../../../public/assets/phone.png"
            alt="Phone image"
            className="h-[500px] "
          />
          <video
            playsInline
            autoPlay={true}
            muted
            loop
            className="absolute h-[400px] left-3 top-1/2 -translate-y-1/2 rounded-lg -z-[1]"
          >
            <source src="../../../public/assets/video-2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="md:w-[35%] w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 graident-header">
            Watch everywhere.
          </h2>
          <p className="text-gray-400 text-lg">
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
      </div>
      {/* separator */}
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />
      {/* 4th section */}
      <div className="px-4 flex flex-col md:flex-row gap-8 items-center justify-center md:px-8 py-20 text-white">
        <div className="w-full md:w-[40%] text-center md:text-left">
          <h2 className="text-2xl  md:text-3xl font-bold mb-4 graident-header">
            Create profiles for kids
          </h2>
          <p className="text-gray-400 text-lg">
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </p>
        </div>
        <img
          className="w-full md:w-1/2 rounded-lg"
          src="../../../public/assets/inside-out.png"
          alt="img"
        />
      </div>
      <Footer />
    </section>
  );
};

export default AuthScreen;
