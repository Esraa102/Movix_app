import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthStore from "../store/authUser";
import { navLinks } from "../constants";
import { Menu, SquareX } from "lucide-react";
import Logo from "../../public/assets/movix-logo.svg";
import { LogOut } from ".";

const Header = ({ isHome }) => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  window.onscroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <header
      className={`flex p-4 ${
        scroll > 0 ? "backdrop-blur-md" : ""
      }  md:px-8  justify-between items-center fixed w-full top-0 left-0 z-10`}
    >
      <Link to={"/"}>
        <img src={Logo} alt="movix-logo" width={150} />
      </Link>

      {isHome ? (
        <>
          <ul className="md:flex hidden items-center gap-8   text-lg font-semibold">
            {navLinks.map((link) => (
              <li key={link.name} className="hover:text-orange transition">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-orange font-bold text-xl" : ""
                  }
                  to={link.link}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="md:flex hidden items-center gap-4">
            <LogOut />
            <Link to={`/user/${user.username}`}>
              <img src={user.image} className="w-[50px]" />
            </Link>
          </div>
        </>
      ) : (
        <div>
          <p className="hover:text-orange transition">
            <Link to={"/sign-up"}>Sign Up</Link>
          </p>
          <p className="hover:text-pink transition">
            <Link to={"/sign-in"}>Log In</Link>
          </p>
        </div>
      )}

      <div className="flex  md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <SquareX size={28} strokeWidth={3} />
          ) : (
            <Menu size={28} color="#ea6106" strokeWidth={3} />
          )}
        </button>
        {isOpen && (
          <ul className="isolation-isolate md:hidden fixed top-[80px] right-4 p-4 w-[60%] backdrop-blur-md bg-black/75 z-30  rounded-lg  flex flex-col  gap-4 text-lg font-semibold">
            {isHome ? (
              <>
                {navLinks.map((link, index) => (
                  <li key={link.name} className="hover:text-orange transition">
                    <NavLink
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-orange font-bold text-xl" : ""
                        } flex gap-2`
                      }
                      to={link.link}
                    >
                      {link.name} {index === 2 && "Search"}
                    </NavLink>
                  </li>
                ))}
                <LogOut />
                <Link
                  className="flex gap-4 items-center"
                  to={`/user/${user.username}`}
                >
                  <img src={user.image} className="w-[60px]" />
                  <div>
                    <p className="capitalize">{user.username}</p>
                    <p className="text-sm text-[#aaaa]">{user.email}</p>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <li className="hover:text-orange transition">
                  <Link to={"/sign-up"}>Sign Up</Link>
                </li>
                <li className="hover:text-pink transition">
                  <Link to={"/sign-in"}>Log In</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
