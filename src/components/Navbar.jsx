import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="text-white  flex justify-between pt-8 md:pt-14">
        <div className="text-xl md:text-2xl font-bold">
          <Link>Plated</Link>{" "}
        </div>
        <div className="flex md:gap-16 gap-8 md:text-xl  font-semibold">
          <Link className="hover:text-[#55E5A4]">Cusines</Link>
          <Link className="hover:text-[#55E5A4]">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
