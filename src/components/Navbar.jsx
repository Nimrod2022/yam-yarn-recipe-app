import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={!isHomePage ? "sticky top-0 z-10 " : ""}>
      <div className="md:px-[120px] px-3 bg-[#D9D9D9] pt-5 md:pt-[30px]">
        <nav className="text-black md:text-[12px] flex border-2 border-[#aeaead]  rounded-2xl justify-between md:px-[41.5px]">
          <div className="md:py-[14px] md:px-auto px-3">
            <NavLink to="/">
              <img
                src="/assets/logo.svg"
                alt="logo"
                className="md:size-auto size-16"
              />
            </NavLink>
          </div>
          <div className="text-[#7A7A7A] md:py-[30px] md:flex md:gap-16 gap-8 text-sm font-semibold  hidden">
            <NavLink to="/" className="hover:text-[#F29C33] text-[#F29C33]">
              HOME
            </NavLink>

            <NavLink to="/cuisines" className="hover:text-[#F29C33] ">
              CUISINES
            </NavLink>
            <NavLink to="/contact" className="hover:text-[#F29C33]">
              CONTACT
            </NavLink>
          </div>

          <div className="py-[19px] hidden md:flex items-center">
            {!isHomePage ? (
              <Search />
            ) : (
              <NavLink to="/cuisines/">
                <button className="bg-[#262522] text-center text-white md:py-[12px] md:w-[108px] md:h-[38px] rounded-lg">
                  EXPLORE
                </button>
              </NavLink>
            )}
          </div>

          <div className="sm:hidden px-2 pt-2 block z-10">
            {isOpen ? (
              <div className="rounded-full px-3 py-3 bg-[#D0CBC2]">
                <AiOutlineClose className="text-2xl " onClick={toggleNav} />
              </div>
            ) : (
              <div className="rounded-full px-3 py-3 bg-[#D0CBC2]">
                {" "}
                <GiHamburgerMenu
                  className="text-2xl"
                  onClick={toggleNav}
                />{" "}
              </div>
            )}
          </div>
          {/*Mobile menu /> */}
          <div
            className={
              isOpen
                ? "sm:hidden absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center text-center  w-full h-screen bg-[#000]/85 text-[#F29C33] duration-300 ease-in-out"
                : "sm:hidden absolute top-0 right-0 left-[-100%] bottom-0 flex justify-center items-center text-center w-full h-screen  bg-[#000]/85 text-[#F29C33] duration-300 ease-in-out"
            }
          >
            <ul className="text-lg" onClick={toggleNav}>
              <Link
                to="/"
                spy={true}
                smooth={true}
                duration={1000}
                onClick={toggleNav}
              >
                <li className="p-4">Home</li>
              </Link>
              <Link
                to="/cuisines"
                spy={true}
                smooth={true}
                duration={1000}
                onClick={toggleNav}
              >
                <li className="p-4">Cuisines</li>
              </Link>

              <Link
                to="/contact"
                spy={true}
                smooth={true}
                duration={1000}
                onClick={toggleNav}
              >
                <li className="p-4  text-[#F29C33]">Contact</li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
