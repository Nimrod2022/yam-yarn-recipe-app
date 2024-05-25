
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="md:h-screen flex flex-col justify-between text-center text-white md:px-[120px] bg-[#D9D9D9]">
      {/* <Navbar /> */}
      <div className="flex flex-col gap-12 justify-center md:bg-[url('/assets/home-bg.svg')] md:mt-[40px] h-[70%] rounded-2xl px-[120px] bg-cover bg-no-repeat inter text-2xl">
        <div className="md:w-[883px] mx-auto text-center">
          <p className="text-white md:text-7xl font-bold">
            DISCOVER DELICIOUS <br /> RECIPES
          </p>
          <p className="text-[18px] w-[50%] mx-auto pt-[20px] pb-[60px]">
            Explore endless culinary possibilities tailored to your taste, and
            transform everyday ingredients into extraordinary dishes that
            delight and inspire.
          </p>
         <NavLink to="/cuisines/">
         <button className="bg-[#F29C33] flex items-center justify-center mx-auto rounded-lg text-black text-[18px] w-[192px] h-[54px]">
            Get started
          </button>
         </NavLink>
        </div>
      </div>
      <footer className="py-4 ">
        <p className="text-[#7A7A7A] text-xs">Copyright © 2024 Yum Yarn</p>
      </footer>
    </div>
  );
}

export default Home;
