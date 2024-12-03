const Footer = () => {
  return (
    <footer>
      {/* separator */}
      <div className="h-[2px] w-full bg-[#232323]" aria-hidden="true" />
      <div className="py-6 px-4 md:px-8 flex gap-4 justify-between items-center flex-wrap">
        <span className="text-[#aaa]">
          All Rights Reserved{" "}
          <span className="font-semibold text-orange">2024</span> &copy;
        </span>
        <span>
          Created by me😄{"   "}
          <a
            href="#"
            className="underline font-semibold hover:text-orange transition"
          >
            Source Code
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
