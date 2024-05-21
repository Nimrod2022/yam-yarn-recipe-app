import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="text-white  flex justify-between pt-8 md:pt-14">
        <div className="text-xl md:text-2xl font-bold">
          <NavLink to="/">Plated</NavLink>{" "}
        </div>
        <div className="flex md:gap-16 gap-8 md:text-xl  font-semibold">
          <NavLink to="/cuisines" className="hover:text-[#55E5A4]">Cusines</NavLink>
          <NavLink to="/contact" className="hover:text-[#55E5A4]">Contact</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
