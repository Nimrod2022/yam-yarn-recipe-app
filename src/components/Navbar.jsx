import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
        <div className="">
        <nav className="text-black md:text-[12px]  flex border-2 rounded-2xl md:mt-[30px]  justify-between md:px-[41.5px]">
          <div className="py-[14px]">
            <NavLink to="/">
              <img src="/assets/logo.svg" alt="logo" />
            </NavLink>
          </div>
          <div className=" text-[#7A7A7A] md:py-[30px] flex md:gap-16 gap-8 text-sm font-semibold">
            <NavLink to="/" className="hover:text-[#F29C33]">
              HOME
            </NavLink>

            <NavLink to="/cuisines" className="hover:text-[#F29C33] ">
              CUISINES
            </NavLink>
            <NavLink to="/contact" className="hover:text-[#F29C33]">
              CONTACT
            </NavLink>
          </div>

          <div className="py-[19px]">
            <button className="bg-[#262522] text-center text-white  md:py-[12px] md:w-[108px] md:h-[38px] rounded-lg">
              EXPLORE
            </button>
          </div>
        </nav>
        </div>
    </header>
  );
}

export default Navbar;
