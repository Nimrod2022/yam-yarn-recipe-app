import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex flex-col justify-between text-center text-white md:px-[120px] px-3 md:pt-0 pt-5 bg-[#D9D9D9]">
      {/* <Navbar /> */}
      <div className="flex flex-col gap-12 justify-center bg-[url('/assets/home-bg.svg')] md:mt-[40px] h-full md:h-[70%] rounded-2xl md:px-[120px] px-4 bg-center md:bg-cover bg-no-repeat inter text-2xl">
        <div className="md:w-[883px] w-full mx-auto">
          <p className="text-white md:pt-0 pt-10 text-2xl md:text-7xl font-bold text-center">
            DISCOVER DELICIOUS <br /> RECIPES
          </p>
          <p className="text-[18px] md:w-[50%] w-full mx-auto pt-[20px] pb-[40px] md:pb-[60px] text-center">
            Explore endless culinary possibilities tailored to your taste, and
            transform everyday ingredients into extraordinary dishes that
            delight and inspire.
          </p>
          <NavLink to="/cuisines/">
            <button className="bg-[#F29C33]  flex items-center justify-center mx-auto rounded-lg text-black text-[18px] w-[130px] h-[40px] md:w-[192px] md:h-[54px]">
              Get started
            </button>
          </NavLink>
        </div>
      </div>
      <footer className="py-4 ">
        <p className="text-[#7A7A7A] text-xs text-center">
          Copyright © 2024 Yum Yarn
        </p>
      </footer>
    </div>
  );
}

export default Home;
