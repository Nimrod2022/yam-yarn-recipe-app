import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { GiNoodles, GiChopsticks } from "react-icons/gi";

function Categories() {
  return (
    <div className="flex gap-5 justify-center">
      <NavLink
        to={"/cuisines/American"}
        className="flex rounded-full bg-blue-400 items-center gap-2"
      >
        <FaHamburger className="size-6" />
        <h3>American</h3>
      </NavLink>

      <NavLink to={"/cuisines/Italian"}>
        <FaPizzaSlice />
        <h3>Italian</h3>
      </NavLink>
      <NavLink to={"/cuisines/Thai"}>
        <GiNoodles />
        <h3>Thai</h3>
      </NavLink>

      <NavLink to={"/cuisines/Chinese"}>
        <GiChopsticks />
        <h3>Chinese</h3>
      </NavLink>
    </div>
  );
}

export default Categories;
