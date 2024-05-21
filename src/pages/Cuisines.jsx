import React from "react";
import Vegetarian from "../components/Vegetarian";
import Popular from "../components/Popular";

function Cuisines() {
  return (
    <>
     <div className="px-28 bg-[url('/assets/cusines-bg.png')] h-screen bg-center md:bg-cover flex-col gap-10 roboto">
      <Popular/>

     <Vegetarian />

     </div>
    </>
  );
}

export default Cuisines;
