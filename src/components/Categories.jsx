import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { GiNoodles, GiChopsticks } from "react-icons/gi";

function Categories() {
  return (
    <div className="flex gap-7 pt-5 justify-center">
      <NavLink to="/cuisines/"> <img src="/assets/all.svg" alt="all" /> </NavLink>
      <NavLink
        to="/cuisines/American"
        className="rounded-full bg-blue-400 items-center"
      >
        <img src="/assets/american.svg" alt="american" />
      </NavLink>
      <NavLink to="/cuisines/Italian">
        <img src="/assets/italian.svg" alt="italian" />
      </NavLink>
      {/* <NavLink to="/cuisines/Thai">
        <GiNoodles />
        <h3>Thai</h3>
      </NavLink> */}
      <NavLink to="/cuisines/Chinese">
        <img src="/assets/chinese.svg" alt="chinese" />
      </NavLink>
    </div>
  );
}

export default Categories;
